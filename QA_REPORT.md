# QA Report

## Automated content validation

Validated with `node qa.js`:

- Modules: **6**
- Lessons: **58**
- Practice questions: **600**
- Formula cards: **28**
- Glossary entries: **261**
- Section self-checks: **174**
- Guided practice problems: **174**
- Broken question → lesson links: **0**
- Duplicate question IDs: **0**
- Questions without exactly four options: **0**
- Questions without four option-level explanations: **0**
- Questions without a full answer explanation: **0**
- Questions without a theory-review target: **0**
- Lessons without deep enhancements: **0**

## JavaScript syntax validation

The following files pass `node --check`:

- `app.js`
- `data.js`
- `deep-econometrics.js`
- `annotations.js`
- `qa.js`

## Question-bank composition

- Lecture / test-bank aligned: **116**
- Exam-style variants: **192**
- Generated source-aligned drills: **292**
- Total: **600**

Generated and exam-style questions are original practice variants; they are not represented as verbatim past-exam questions.

## Feature checks

- Hash routing and GitHub Pages deployment workflow retained.
- Search, Learn, Practice, Question Bank, Mistake Notebook, Notes & Highlights, Flashcards, Formula Sheet, Calculators, Exam Mode, Progress, Glossary, Saved, Sources, Settings and Empirical Lab routes are present.
- Practice feedback uses `optionExplanations` when available and displays the exact linked theory lesson.
- Exam review displays option-level reasoning and the exact linked theory lesson after submission.
- Local-storage namespace changed to `em_` to avoid collisions with the Finance Mastery app.
- Econometrics-specific calculator panel opens on Simple OLS slope by default.
- All local `index.html` JS/CSS/icon references resolve.

## Academic precision checks added

- “Fail to reject H₀” wording instead of treating non-rejection as proof.
- Frequentist confidence-interval wording clarified.
- VIF thresholds marked as rules of thumb.
- Durbin–Watson limitations and Breusch–Godfrey alternative noted.
- Heteroskedasticity consequence separated into coefficient unbiasedness (under exogeneity) vs invalid conventional standard errors.
- Exact semilog dummy percentage effect included.
- Causal claims separated from conditional association.
