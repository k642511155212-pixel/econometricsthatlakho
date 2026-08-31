const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(root,'deep-econometrics.js'),'utf8'),ctx);
const D=ctx.window.EM_DATA;
const errors=[];
const lessons=new Map();
for(const m of D.modules){for(const l of m.lessons){const k=`${m.id}/${l.id}`;lessons.set(k,{m,l}); if(!l.title||!l.keyPrinciple||!l.explanation?.length)errors.push(`Incomplete lesson ${k}`);}}
if(D.questions.length!==600)errors.push(`Expected 600 questions, got ${D.questions.length}`);
const ids=new Set();
for(const q of D.questions){
 if(ids.has(q.id))errors.push(`Duplicate question ${q.id}`);ids.add(q.id);
 if(!lessons.has(`${q.module}/${q.lesson}`))errors.push(`Bad review lesson for ${q.id}`);
 if(q.options?.length!==4)errors.push(`Bad options for ${q.id}`);
 if(q.optionExplanations?.length!==4)errors.push(`Missing option explanations for ${q.id}`);
 if(!(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4))errors.push(`Bad answer index ${q.id}`);
 if(!q.explanation||!q.review)errors.push(`Missing explanation/review ${q.id}`);
}
for(const [k] of lessons){const e=D.lessonEnhancements[k]; if(!e)errors.push(`Missing enhancement ${k}`); else {if(e.deepDive?.length!==3)errors.push(`Need 3 deep dives ${k}`);if(e.guidedPractice?.length!==3)errors.push(`Need 3 guided problems ${k}`);if(!e.prioritySource)errors.push(`Missing priority source ${k}`);}}
for(const f of D.formulas){if(!D.formulaDetails[f[0]])errors.push(`Missing formula detail ${f[0]}`);}
console.log(JSON.stringify({modules:D.modules.length,lessons:lessons.size,questions:D.questions.length,formulas:D.formulas.length,glossary:Object.keys(D.glossary).length,selfChecks:lessons.size*3,guidedProblems:lessons.size*3,errors},null,2));
process.exit(errors.length?1:0);
