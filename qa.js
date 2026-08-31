const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const ctx={window:{}}; vm.createContext(ctx);
const load=['data.js','source-extensions.js','deep-econometrics.js','extended-theory.js','testbank-data.js'];
for(const file of load) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const D=ctx.window.EM_DATA;
const errors=[];
const lessons=new Map();
for(const m of D.modules){
  if(!m.id||!m.title||!Array.isArray(m.lessons)) errors.push(`Incomplete module ${m.id||'?'}`);
  for(const l of m.lessons){
    const k=`${m.id}/${l.id}`;
    if(lessons.has(k)) errors.push(`Duplicate lesson ${k}`);
    lessons.set(k,{m,l});
    if(!l.title||!l.keyPrinciple||!Array.isArray(l.explanation)||l.explanation.length<2) errors.push(`Incomplete lesson ${k}`);
    if(!Array.isArray(l.terms)||!l.terms.length) errors.push(`Missing bilingual terms ${k}`);
  }
}
if(D.modules.length!==10) errors.push(`Expected 10 modules, got ${D.modules.length}`);
if(lessons.size!==104) errors.push(`Expected 104 lessons, got ${lessons.size}`);
if(D.questions.length!==980) errors.push(`Expected 980 questions, got ${D.questions.length}`);
const tb=D.questions.filter(q=>q.sourceType==='test-bank');
if(tb.length!==380) errors.push(`Expected 380 test-bank questions, got ${tb.length}`);
const ids=new Set();
for(const q of D.questions){
  if(ids.has(q.id)) errors.push(`Duplicate question ${q.id}`); ids.add(q.id);
  if(!lessons.has(`${q.module}/${q.lesson}`)) errors.push(`Bad theory link for ${q.id}: ${q.module}/${q.lesson}`);
  if(!Array.isArray(q.options)||![2,4].includes(q.options.length)) errors.push(`Bad options for ${q.id}`);
  if(!Array.isArray(q.optionExplanations)||q.optionExplanations.length!==q.options.length) errors.push(`Missing option explanations for ${q.id}`);
  if(!(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length)) errors.push(`Bad answer index ${q.id}`);
  if(!q.explanation||!q.review) errors.push(`Missing explanation/review ${q.id}`);
  if(q.sourceType==='test-bank'){
    if(!(q.sourceChapter>=1&&q.sourceChapter<=19)) errors.push(`Bad test-bank chapter ${q.id}`);
    if(!q.bloom||!q.topic||!q.verbatimSource) errors.push(`Missing test-bank metadata ${q.id}`);
  }
}
for(let ch=1;ch<=19;ch++){
  const qs=tb.filter(q=>q.sourceChapter===ch);
  if(qs.length!==20) errors.push(`Test-bank Ch${ch}: expected 20, got ${qs.length}`);
  const nums=new Set(qs.map(q=>q.sourceQuestion));
  if(nums.size!==20) errors.push(`Test-bank Ch${ch}: duplicate/missing source question numbers`);
}
const letterIndex=x=>({a:0,b:1,c:2,d:3,true:0,false:1}[String(x||'').trim().toLowerCase()]);
const corrected=tb.filter(q=>Number.isInteger(letterIndex(q.sourceAnswer))&&letterIndex(q.sourceAnswer)!==q.answer);
if(corrected.length!==5) errors.push(`Expected 5 audited source-key corrections, got ${corrected.length}`);
if(D.testBank?.questions!==380||D.testBank?.chapters!==19||D.testBank?.auditedCorrections!==5) errors.push('Bad D.testBank metadata');
for(const [k] of lessons){
  const e=D.lessonEnhancements?.[k];
  if(!e) errors.push(`Missing enhancement ${k}`);
  else {
    if(e.deepDive?.length!==3) errors.push(`Need 3 deep dives ${k}`);
    if(e.guidedPractice?.length!==3) errors.push(`Need 3 guided problems ${k}`);
    if(!e.prioritySource) errors.push(`Missing priority source ${k}`);
  }
}
for(const f of D.formulas||[]){if(!D.formulaDetails?.[f[0]]) errors.push(`Missing formula detail ${f[0]}`);}
const sourceNames=(D.sources||[]).map(x=>x.name);
for(const required of ['Dummy Variable Regression Models (dummy_S.pdf)','Wooldridge — Introductory Econometrics Test Bank, 5th ed.']){
  if(!sourceNames.includes(required)) errors.push(`Missing source registry entry: ${required}`);
}
const expectedScripts=['data.js','source-extensions.js','deep-econometrics.js','extended-theory.js','testbank-data.js','annotations.js','app.js'];
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
let last=-1;
for(const f of expectedScripts){const i=html.indexOf(`src="${f}"`);if(i<0) errors.push(`index missing ${f}`);if(i<last)errors.push(`Wrong script order around ${f}`);last=i;}
const stats={
  version:D.version,
  modules:D.modules.length,
  lessons:lessons.size,
  questions:D.questions.length,
  originalPractice:D.questions.length-tb.length,
  testBankQuestions:tb.length,
  testBankChapters:new Set(tb.map(q=>q.sourceChapter)).size,
  auditedSourceKeyCorrections:corrected.length,
  formulas:D.formulas.length,
  glossary:Object.keys(D.glossary).length,
  sources:D.sources.length,
  selfChecks:lessons.size*3,
  guidedProblems:lessons.size*3,
  errors
};
console.log(JSON.stringify(stats,null,2));
process.exit(errors.length?1:0);
