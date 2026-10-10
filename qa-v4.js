"use strict";
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,errors=[],checks={};
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};

const dataContext={window:{}};vm.createContext(dataContext);
for(const file of ['data.js','source-extensions.js','deep-econometrics.js','extended-theory.js','testbank-data.js'])vm.runInContext(read(file),dataContext,{filename:file});
const D=dataContext.window.EM_DATA;
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const metadata=new Map();
for(const module of D.modules)for(const lesson of module.lessons){
  const enhancement=D.lessonEnhancements?.[`${module.id}/${lesson.id}`];
  for(const pair of [...(lesson.terms||[]),...(enhancement?.termsExtra||[])]){
    const key=norm(pair[0]).trim(),row=metadata.get(key)||{modules:new Set()};row.modules.add(module.id);metadata.set(key,row);
  }
}
const terms=Object.keys(D.glossary).sort((a,b)=>a.localeCompare(b)).map((term,index)=>({id:`T${String(index+1).padStart(3,'0')}`,term,modules:[...(metadata.get(norm(term).trim())?.modules||[])]}));
const shorts=[];
for(const module of D.modules)for(const lesson of module.lessons){
  const enhancement=D.lessonEnhancements?.[`${module.id}/${lesson.id}`];
  (enhancement?.deepDive||[]).forEach((section,index)=>{if(section.check)shorts.push({id:`SA-${module.id}-${lesson.id}-${index+1}`,module:module.id});});
}
checks.modulePools=D.modules.map(module=>({module:module.id,terms:terms.filter(x=>x.modules.includes(module.id)).length,mcq:D.questions.filter(x=>x.module===module.id).length,shorts:shorts.filter(x=>x.module===module.id).length,writeups:module.lessons.length}));
for(const pool of checks.modulePools){assert(pool.terms>=5,`${pool.module}: fewer than 5 linked terms`);assert(pool.mcq>=10,`${pool.module}: fewer than 10 MCQs`);assert(pool.shorts>=3,`${pool.module}: fewer than 3 short answers`);assert(pool.writeups>=1,`${pool.module}: no write-up`);}

const appSource=read('app.js');
function extractFunction(source,name){
  const start=source.indexOf(`function ${name}(`);assert(start>=0,`missing ${name}`);if(start<0)return '';
  const brace=source.indexOf('{',start);let depth=0;
  for(let i=brace;i<source.length;i++){if(source[i]==='{')depth++;else if(source[i]==='}'&&!--depth)return source.slice(start,i+1);}
  return '';
}
const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const nativeFormula=eval(`(${extractFunction(appSource,'nativeFormula')})`);
const formulaMarkup=D.formulas.map(x=>({name:x[0],html:nativeFormula(x[0])}));
checks.formulas={count:formulaMarkup.length,fractions:0,sums:0,scripts:0};
function balanced(xml,name){const stack=[];for(const match of xml.matchAll(/<\/?([a-z]+)(?:\s[^>]*)?>/g)){const full=match[0],tag=match[1];if(full.startsWith('</')){if(stack.pop()!==tag)return false;}else if(!full.endsWith('/>'))stack.push(tag);}return stack.length===0;}
for(const formula of formulaMarkup){
  assert(formula.html.startsWith('<mrow>'),`${formula.name}: no structured MathML output`);
  assert(balanced(formula.html,formula.name),`${formula.name}: unbalanced MathML`);
  checks.formulas.fractions+=(formula.html.match(/<mfrac>/g)||[]).length;
  checks.formulas.sums+=(formula.html.match(/<munderover>/g)||[]).length;
  checks.formulas.scripts+=(formula.html.match(/<m(?:sub|sup)>/g)||[]).length;
}
assert(checks.formulas.count===28,'formula count changed');assert(checks.formulas.fractions>=15,'too few structured fractions');assert(checks.formulas.sums>=5,'too few structured sums');assert(checks.formulas.scripts>=35,'too few structured scripts');

const html=read('index.html'),css=read('styles.css'),embedded=read('embedded-assets.js');
assert(!/MathJax|cdn\.jsdelivr|cdnjs|unpkg/i.test(html),'external formula renderer remains');
assert(!/assets\//.test(html+appSource+css),'legacy assets path remains');
assert(!/(?:src|href)=["'](?!data:|https?:|#)[^"']+\.(?:png|jpe?g|gif|webp|svg)/i.test(html+appSource),'non-embedded image reference remains');
for(const script of [...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]))assert(fs.existsSync(path.join(root,script)),`missing script ${script}`);
for(const asset of ['hero','favicon','donate'])assert(new RegExp(`\"${asset}\":\"data:image/`).test(embedded),`embedded ${asset} image missing`);
assert((appSource.match(/data:image\/webp;base64/g)||[]).length>=5,'mascot images are not embedded');
for(const selector of ['.structured-math','.math-scroll','.module-hub-layout','.term-trainer-stage','.review-controls','.mixed-exam-intro','.donate-shell'])assert(css.includes(selector),`missing CSS ${selector}`);
for(const route of ["r==='hub'","r==='term-cards'","r==='term-trainer'","r==='short-answers'","r==='writeups'","r==='review'","r==='mixed-exam'","r==='donate'"])assert(appSource.includes(route),`missing route ${route}`);

const stubElement=()=>({style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},setAttribute(){},removeAttribute(){},showModal(){},close(){},dataset:{},innerHTML:'',textContent:'',value:'',checked:false,hidden:false,open:false});
const elements=new Map(),getElement=id=>{if(!elements.has(id))elements.set(id,stubElement());return elements.get(id)};
const local=new Map();
const runtime={
  window:{EM_DATA:D,EM_EMBEDDED_ASSETS:{donate:'data:image/png;base64,AA',hero:'data:image/svg+xml;base64,AA',favicon:'data:image/svg+xml;base64,AA'},addEventListener(){}},
  document:{documentElement:stubElement(),body:stubElement(),getElementById:getElement,querySelector(){return null},querySelectorAll(){return []},addEventListener(){}},
  localStorage:{getItem:key=>local.get(key)||null,setItem:(key,value)=>local.set(key,value),removeItem:key=>local.delete(key)},
  location:{hash:'#dashboard',reload(){}},history:{},navigator:{},console,confirm:()=>true,prompt:()=>null,
  setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:fn=>fn(),scrollTo(){},scrollY:0,
  EM_Annotations:{all:()=>[],get:()=>null,add(){},remove(){},clear(){},applyHighlights(){},findTextElement(){return null},selectedQuote(){return null}},
  Intl,Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Map,Set
};
runtime.window.window=runtime.window;runtime.window.document=runtime.document;runtime.window.localStorage=runtime.localStorage;runtime.window.scrollTo=()=>{};runtime.window.scrollY=0;
vm.createContext(runtime);
let instrumented=appSource.replace('return {init(){','return {__debug:{state,dashboard,glossary,moduleHub,termCards,termTrainer,shortAnswers,writeups,reviewHub,mixedExamSetup,mixedExamPaper,mixedExamResult,formulas,progress,donatePage,beginMixedExam},init(){').replace(/App\.init\(\);\s*$/,'window.__App=App;');
vm.runInContext(instrumented,runtime,{filename:'app.instrumented.js'});
const debug=runtime.window.__App.__debug;
const pages={dashboard:debug.dashboard(),glossary:debug.glossary(),hub:debug.moduleHub(['hub','m1','overview']),termCards:debug.termCards(),termTrainer:debug.termTrainer(),shortAnswers:debug.shortAnswers(),writeups:debug.writeups(),review:debug.reviewHub(),mixedSetup:debug.mixedExamSetup(),formulas:debug.formulas(),progress:debug.progress(),donate:debug.donatePage()};
debug.beginMixedExam('core');pages.mixedPaper=debug.mixedExamPaper();
checks.renderedPages={};
for(const [name,markup] of Object.entries(pages)){checks.renderedPages[name]=markup.length;assert(markup.length>300,`${name}: renderer returned too little markup`);assert(!/>undefined</.test(markup),`${name}: visible undefined value`);}
assert((pages.formulas.match(/<math /g)||[]).length===28,'Formula Sheet does not render 28 MathML equations');
assert((pages.mixedPaper.match(/<article class="mixed-question">/g)||[]).length===10,'mixed paper MCQ section incomplete');
assert((pages.mixedPaper.match(/data-mixed-term=/g)||[]).length===5,'mixed paper term section incomplete');
assert((pages.mixedPaper.match(/data-mixed-short=/g)||[]).length===3,'mixed paper short-answer section incomplete');

const report={version:'4.0.0',modules:D.modules.length,lessons:D.modules.reduce((n,m)=>n+m.lessons.length,0),questions:D.questions.length,terms:terms.length,shortAnswers:shorts.length,writeups:D.modules.reduce((n,m)=>n+m.lessons.length,0),formulas:checks.formulas,embeddedImages:{hero:true,favicon:true,donate:true,mascots:(appSource.match(/data:image\/webp;base64/g)||[]).length},checks,errors};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
