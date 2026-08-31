# Econometrics Mastery v2.0

A GitHub Pages-ready static learning web app for the supplied FTU Econometrics materials. The v2 build was re-audited against the lecture slides, supplementary textbooks/course archive, the added dummy-variable lecture, and the uploaded Wooldridge test bank.

## What is included

- **10 modules / 104 theory lessons**.
  - **Core Course:** Foundations, Simple Regression, Multiple Regression, Statistical Inference, Diagnosing Model Problems, and course/exam extensions.
  - **Extended Econometrics:** Time Series; Pooled Cross Sections & Panel Data; Endogeneity/IV/Simultaneous Equations; Limited Dependent Variables.
- English-first theory with **Vietnamese translations for key terms** inline and in a bilingual glossary (**409 entries**).
- **980 practice questions total**:
  - 600 course/source-aligned drills from the original build;
  - **380 questions from the supplied Wooldridge 5e Test Bank, Chapters 1–19**.
- Every question contains:
  - a correct answer,
  - a full explanation,
  - an explanation for **every option** (why correct / why wrong),
  - an exact theory lesson to review.
- Test-bank metadata is preserved where available: **chapter, source question number, difficulty, Bloom level, A-Head/topic, source key and feedback provenance**.
- **Source-audit notes** are shown when a supplied test-bank key/wording conflicts with the underlying econometric concept. Five answer keys required correction; two additional items carry caution notes without changing the bank answer.
- **312 section self-checks** and **312 guided problems** (3 of each per lesson).
- Formula sheet with 28 formula cards and MathJax rendering.
- Econometrics calculators: OLS, residuals, R² / adjusted R², t, CI, overall F, restricted F, VIF/tolerance, LM=nR², Durbin–Watson intuition, quadratic effects, exact semilog effects, correlation.
- Timed exam mode, source-aware question bank, mistake notebook, progress analytics, global search, saved items, flashcards, notes/highlights, local annotation, and settings.
- Empirical Lab with regression-output reading, functional-form interpretation and a course-aligned Stata workflow.
- No backend. Progress and annotations are stored in browser `localStorage`.

## Source policy and scope

The site uses a **lecture-first** hierarchy for the actual course sequence:

1. `1. chapter1 .pdf` — Introduction to Econometrics
2. `2. chapter2.pdf` — Simple Linear Regression
3. `3. chapter3.pdf` — Multiple Regression
4. `4. chapter 4 Statistical Inference.pdf` — Statistical Inference
5. `5. chapter 5.pdf` — Diagnosing Model Problems
6. `dummy_S.pdf` — Dummy Variable Regression Models

The following supplied sources are used to deepen or extend the theory and practice:

- Gujarati & Porter — `Basic econometrics 5th edition.pdf`
- Wooldridge — `Introductory_Econometrics_3ed[1]-2.pdf`
- Stock & Watson — `Stock and Watson (3e).pdf` from the uploaded course archive
- FTU KTEE309 project/research-method guide from the uploaded archive
- `Copy of TEST BANK (1).pdf` — Wooldridge 5e test bank, 19 chapters × 20 questions
- supplied final-exam/revision materials in the uploaded archives

The **Core Course** filter keeps study focused on the instructor's Chapters 1–5 plus dummy/exam extensions. The extended modules exist so that all supplied test-bank questions can link to a real theory lesson instead of pointing to missing content.

The uploaded copyrighted PDFs are **not redistributed** inside this repository. The site stores source-aligned explanatory content and the user-supplied test-bank question data needed for the requested private study tool.

## Test-bank audit

The supplied bank contains 380 chapter questions. During integration, clear internal/source conflicts were checked rather than copied blindly. Examples include:

- nonexperimental data → **observational data**;
- OLS unbiasedness → **zero conditional mean**, not homoskedasticity;
- a source answer line that conflicts with its own feedback;
- weak-instrument vs multicollinearity logic in 2SLS;
- standard normal CDF → **probit**, not logit.

The original bank key remains visible in the item's metadata/audit note when a correction was necessary.

## Run locally

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

- `index.html` — app shell and script load order
- `styles.css` — responsive UI
- `data.js` — original 6-module curriculum, formulas, glossary, sources, 600 questions
- `source-extensions.js` — source-audit curriculum additions, 4 extended modules and bilingual glossary expansion
- `deep-econometrics.js` — deep theory for the original curriculum
- `extended-theory.js` — deep dives, guided problems and source clarifications for the added lessons
- `testbank-data.js` — 380 integrated test-bank questions with metadata and source-audit notes
- `app.js` — routing and all study tools
- `annotations.js` — highlights and notes
- `SOURCE_ALIGNMENT.md` — curriculum/source audit map
- `QA_REPORT.md` — automated validation report
- `qa.js` — structural QA script

## Academic-use note

Generated practice items are source-aligned drills, not claims that they appeared verbatim in an official exam. Test-bank items are labeled separately from generated/course drills. The instructor's current syllabus and official announcements remain authoritative.
