'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,ctx={window:{}};
vm.createContext(ctx);
const files=['data.js','source-extensions.js','deep-econometrics.js','extended-theory.js','testbank-data.js','source-verified-bank.js'];
const errors=[];
for(const f of files){try{vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});}catch(e){errors.push(`${f}: ${e.stack}`);}}
const D=ctx.window.EM_DATA;
const lessons=new Set(D.modules.flatMap(m=>m.lessons.map(l=>`${m.id}/${l.id}`)));
const ids=new Set(),stems=new Set();
for(const q of D.questions){
 if(ids.has(q.id))errors.push(`Duplicate ID ${q.id}`);ids.add(q.id);
 const stem=q.question.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();if(stems.has(stem))errors.push(`Duplicate stem ${q.id}`);stems.add(stem);
 if(!lessons.has(`${q.module}/${q.lesson}`))errors.push(`No theory link ${q.id}`);
 if(!['test-bank','past-paper','source-review'].includes(q.sourceType))errors.push(`Not from an allowed original source ${q.id}`);
 if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options?.length)errors.push(`Invalid answer ${q.id}`);
 if(!Array.isArray(q.options)||q.options.length<2||q.options.length>4||q.options.some(x=>!x.trim()))errors.push(`Options broken ${q.id}`);
 if(!q.explanation||!q.review)errors.push(`Missing answer explanation/review ${q.id}`);
}
const summary={modules:D.modules.length,lessons:lessons.size,questions:D.questions.length,masterbook:D.curatedBank?.masterbookIncluded,testbankOther:D.curatedBank?.otherVerifiedTestBank,flagged:D.sourceIssues?.length,originalCourseGeneratedRemoved:!!D.curatedBank&&D.questions.every(q=>!/^Q-[A-Z]/.test(q.id)),sourceTypes:Object.fromEntries([...new Set(D.questions.map(q=>q.sourceType))].map(t=>[t,D.questions.filter(q=>q.sourceType===t).length])),errors};
if(!summary.originalCourseGeneratedRemoved) errors.push('Synthetic questions remain');
if(D.questions.length!==694)errors.push('Unexpected number of unique cited originals');
if(D.sourceIssues.length!==16)errors.push('Missing source problems');
if(D.modules.length!==10||lessons.size!==104)errors.push('Course theory structure changed');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const f of [...files,'app.js'])if(!html.includes(`src="${f}"`))errors.push(`Missing script tag for ${f}`);
console.log(JSON.stringify(summary,null,2));process.exit(errors.length?1:0);
