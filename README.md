# Econometrics Mastery

A GitHub Pages-ready, static learning web app rebuilt from the supplied Finance Mastery interaction model for an **Econometrics** course.

## What is included

- **6 modules / 58 deep lessons** covering course foundations, simple regression, multiple regression, statistical inference, model diagnostics, and exam extensions.
- English-first theory with **Vietnamese translations for key terms** inline and in a bilingual glossary.
- **600 practice questions**. Every question contains:
  - one correct answer,
  - a full answer explanation,
  - an explanation for **every option** (why correct / why wrong),
  - a direct link to the exact theory lesson to review.
- **174 section self-checks** and **174 guided practice problems** (3 of each per lesson).
- Formula sheet with typeset MathJax equations and exam traps.
- Econometrics calculators: OLS, residuals, R² / adjusted R², t, CI, overall F, restricted F, VIF/tolerance, LM=nR², Durbin–Watson intuition, quadratic effects, exact semilog effects, correlation.
- Timed exam mode, question bank, mistake notebook, progress analytics, global search, saved items, flashcards, notes/highlights, local annotation, and settings.
- Empirical Lab with functional-form interpretation matrix and a course-aligned Stata workflow.
- No backend. Progress and annotations are stored in browser `localStorage`.

## Source policy

The learning structure follows the **supplied lecture slides first**:

1. `1. chapter1 .pdf` — Introduction to Econometrics
2. `2. chapter2.pdf` — Simple Linear Regression
3. `3. chapter3.pdf` — Multiple Regression
4. `4. chapter 4 Statistical Inference.pdf` — Statistical Inference
5. `5. chapter 5.pdf` — Diagnosing Model Problems
6. `Basic econometrics 5th edition.pdf` — Gujarati & Porter
7. `Introductory_Econometrics_3ed[1]-2.pdf` — Wooldridge
8. Supplied test-bank and final-exam materials from the uploaded course archives

Online references are secondary clarifiers, especially for software/diagnostic precision:

- Stata official `regress postestimation` documentation
- Penn State STAT 501 Regression Methods
- NIST/SEMATECH e-Handbook of Statistical Methods

The uploaded copyrighted textbooks/PDFs are **not redistributed inside this repository**. The site contains original explanatory study content aligned to those sources.

## Run locally

Because the app is static, any local web server works:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Push to the `main` branch.
4. In **Settings → Pages**, set the source to **GitHub Actions**.
5. The included `.github/workflows/deploy-pages.yml` deploys the site automatically.

## Main files

- `index.html` — app shell and navigation
- `styles.css` — complete responsive UI
- `data.js` — modules, lessons, formulas, glossary, sources, 600 questions
- `deep-econometrics.js` — deeper theory, self-checks, guided problems and source clarifications
- `app.js` — routing and all study tools
- `annotations.js` — highlights and notes
- `SOURCE_ALIGNMENT.md` — curriculum/source map
- `QA_REPORT.md` — validation results

## Important academic-use note

Generated practice items are source-aligned drills, not claims that they appeared verbatim in a past exam. Items labeled **Exam-style variant** imitate the reasoning patterns in the supplied assessment materials while changing numbers/context. Always treat the instructor's current syllabus and official announcements as authoritative.
