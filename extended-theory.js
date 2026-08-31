"use strict";
(function(){
  const D=window.EM_DATA; if(!D||!D.lessonEnhancements) throw new Error("Load deep-econometrics.js before extended-theory.js");
  const newKeys=[];
  for(const m of D.modules){
    for(const l of m.lessons){
      const key=`${m.id}/${l.id}`;
      if(D.lessonEnhancements[key]) continue;
      newKeys.push(key);
      const p=l.explanation||[];
      const terms=(l.terms||[]).map(t=>`${t[0]} (${t[1]})`).join('; ');
      D.lessonEnhancements[key]={
        prioritySource:l.source||m.source||'Supplied course sources',
        moreExplanation:[
          `Key vocabulary: ${terms}. The English wording is kept because it matches textbook, Stata/EViews and test-bank language; the Vietnamese term is placed next to it to make interpretation faster.`,
          `Separate the population model, the sample estimator and the inference step. In ${l.title}, a correct answer should state what object is being modeled, what sample statistic is used, and which assumption makes the interpretation valid.`,
          `A full-credit econometrics response should end in economic language: identify the outcome, the conditioning variables, the unit of change and the limitation or diagnostic that qualifies the conclusion.`
        ],
        termsExtra:[], formulaKeys:l.formulaKeys||[],
        deepDive:[
          {kicker:'Meaning',title:'What the source is saying',paragraphs:[p[0]||l.keyPrinciple,p[1]||l.objective],bullets:[l.keyPrinciple,`Population target: identify the conditional mean, variance, dynamic process or structural parameter involved in ${l.title}.`,`Vocabulary anchor: ${terms}.`],check:`Explain ${l.title} in your own words and identify the population object involved.`},
          {kicker:'Mechanism',title:'Why it works — and what breaks it',paragraphs:[p[2]||'Connect the algebra to the assumptions that make the estimator or test meaningful.',p[3]||'Ask whether omitted variables, dependence, variance changes, weak identification or functional-form error can alter the conclusion.'],bullets:[`Assumption check: which condition protects the estimator or test in ${l.title}?`,`Specification check: what omitted term, timing relation or data problem would make the rule fail?`,`Inference check: does the variance estimator match heteroskedasticity, serial correlation or clustering in the data?`],check:`Name one failure mode for ${l.title} and explain the mechanism rather than only naming the problem.`},
          {kicker:'Exam reasoning',title:'How to answer the test-bank version',paragraphs:[p[4]||l.examFocus,`For MCQ questions, eliminate options by matching definitions, signs, conditioning statements and decision rules to the maintained assumptions. Do not choose an option only because it contains a familiar keyword.`],bullets:[`Identify the model/data structure first.`,`Write the defining equation or condition before calculating.`,`Check the answer against ${l.examFocus}`,`Finish by linking the result to the exact lesson rather than memorizing the letter of the answer key.`],check:`Give a four-step exam template for a question on ${l.title}.`}
        ],
        examples:[{title:`${l.title}: source-aligned application`,scenario:l.workedExample,steps:['Identify the dependent variable, regressors and data structure.','State the relevant equation, restriction or diagnostic rule.','Apply the rule and interpret the sign, magnitude or test decision.','State the assumption or limitation that controls whether the conclusion is descriptive, inferential or causal.'],result:'A complete answer combines model setup, calculation/logic, interpretation and a validity check.',takeaway:'Do not stop at a coefficient, p-value or diagnostic statistic; explain what it means in the economic problem.'}],
        guidedPractice:[
          {level:'Easy',title:'Definition check',prompt:`Define the main English terms in ${l.title} and give the Vietnamese translation in parentheses. Then state the population quantity or condition each term refers to.`,hint:'Use the lesson key terms and key principle.',steps:['Name the term.','Give the Vietnamese translation.','State the formal econometric meaning.','Give one short economic example.'],answer:'The response should use the source definition, not a loose everyday meaning.',why:'Most test-bank distractors alter one word in a definition, so precise terminology matters.'},
          {level:'Intermediate',title:'Assumption check',prompt:`Suppose an empirical result appears to use ${l.title}. Which assumption or diagnostic would you verify before accepting the interpretation? Explain the consequence if it fails.`,hint:'Separate coefficient validity from standard-error validity.',steps:['State the desired interpretation.','Name the required assumption.','Explain the failure mechanism.','State the appropriate remedy or more cautious conclusion.'],answer:'The answer should connect the assumption directly to bias, consistency, efficiency or inference.',why:'Econometric conclusions are conditional on the model and covariance assumptions.'},
          {level:'Advanced',title:'Test-bank synthesis',prompt:`Create an exam-style question about ${l.title} with one tempting distractor. Solve it and explain why the distractor is wrong.`,hint:'Use the source’s typical confusion: definition vs consequence, coefficient vs probability, level vs log, or restricted vs unrestricted model.',steps:['Write the governing rule.','Construct the data/model setup.','Apply the rule.','Explain both the correct and tempting wrong option.'],answer:'A strong response makes the distractor wrong for a specific econometric reason, not just because it differs from the key.',why:'This mirrors the option-level reasoning required in the updated practice bank.'}
        ],
        sourceCorrections:[]
      };
    }
  }

  function add(mid,lid,entry){ const k=`${mid}/${lid}`; const e=D.lessonEnhancements[k]; if(!e)return; e.moreExplanation=(e.moreExplanation||[]).concat(entry.moreExplanation||[]); e.sourceCorrections=(e.sourceCorrections||[]).concat(entry.sourceCorrections||[]); }
  add('m1','data-structures',{moreExplanation:[
    'Pooled cross sections (mẫu chéo gộp) and panel data (dữ liệu bảng) are not synonyms. A panel follows the same units through time; independently pooled cross sections can contain different sampled units in each period.'
  ],sourceCorrections:[{title:'Data-structure precision',text:'The lecture slide groups panel/pooled data together as combinations of cross-section and time-series information. The website now separates true panel data from independently pooled cross sections because the identity of units through time changes the available estimators.'}]});
  add('m2','classical-assumptions-simple',{moreExplanation:[
    'For unbiasedness of the simple OLS slope, the critical conditional-mean condition is E(u|X)=0. Homoskedasticity Var(u|X)=σ² is not required for unbiasedness; it is part of the classical efficiency and conventional standard-error result.'
  ],sourceCorrections:[{title:'Unbiasedness vs homoskedasticity',text:'One supplied test-bank item keys homoskedasticity as the assumption establishing OLS unbiasedness. The course/textbook logic separates these: zero conditional mean protects unbiasedness; homoskedasticity supports the usual efficiency/variance formulas.'}]});
  add('m3','r2-adjusted',{moreExplanation:[
    'R² never falls when regressors are added to a model with the same dependent variable and intercept, but adjusted R² can fall because it penalizes added regressors through degrees of freedom.',
    'Do not compare R² values mechanically when the dependent variable itself changes, for example salary versus log(salary), because the total variation being explained is measured on different scales.'
  ],sourceCorrections:[]});
  add('m4','confidence-intervals',{moreExplanation:[
    'Use “fail to reject H₀” rather than “accept H₀.” A confidence interval that contains the null value is equivalent to failing to reject the corresponding two-sided test at the matching significance level under the same assumptions.'
  ],sourceCorrections:[]});
  add('m4','linear-restrictions',{moreExplanation:[
    'When using an R²-based restricted-versus-unrestricted F test, the restricted and unrestricted regressions must have the same dependent variable. If a restriction is imposed by transforming Y, compare RSS/SSR using the general formula rather than directly comparing R² values.'
  ],sourceCorrections:[]});
  add('m5','heteroskedasticity-detection',{moreExplanation:[
    'The uploaded Chapter 5 slides list graphical inspection, Park, Glejser, Goldfeld-Quandt, Breusch-Pagan-Godfrey and White tests. The tests differ in the variance pattern they target and in how many auxiliary-regression terms they use; a significant test can also signal functional-form misspecification.'
  ],sourceCorrections:[]});
  add('m5','autocorrelation-detection-remedies',{moreExplanation:[
    'The Durbin-Watson statistic is approximately d≈2(1-ρ̂) for first-order autocorrelation. Formal DW decisions use dL and dU and include zones of indecision; d≈2 is intuition, not a universal hypothesis-test rule.',
    'Breusch-Godfrey is more flexible than DW: it can test higher-order serial correlation and remains applicable in many models containing lagged dependent variables where DW is not valid.',
    'Before treating residual dependence as pure autocorrelation, check model misspecification. The uploaded lecture explicitly separates misspecification-induced residual patterns from pure autocorrelation and lists respecification, GLS/FGLS and Newey-West as different responses.'
  ],sourceCorrections:[]});
  add('m6','dummy-variables',{moreExplanation:[
    'The uploaded dummy-variable lecture extends beyond a single binary regressor: it covers the dummy-variable trap, base groups, multiple categories, interactions, group-comparison tests, seasonal dummies and piecewise linear regression. Dedicated lessons for those topics have now been added to this module.'
  ],sourceCorrections:[]});
  window.EM_SOURCE_AUDIT={newLessonKeys:newKeys,coreAuditDate:'2026-08-31',notes:'Core lecture sequence rechecked against Chapters 1-5 plus Dummy Variable Regression Models; extended theory added to support every uploaded test-bank chapter.'};
})();
