# V5 QA report · Econometrics × Ruồi Lùn

## 1. Data/provenance checks

- 10 modules and 104 existing lessons retained.
- 600 synthetic MCQs physically removed from `data.js`.
- 174 synthetic guided practice questions and 174 generated section checks removed from the deep-theory source.
- 694 nonduplicate, gradable source questions remain; 16 source issues are segregated from auto-grading.
- All active questions have supported `sourceType`, unique IDs and stems, valid answer indices/options and valid links to an existing lesson.
- Both `node qa.js` and `node qa-v4.js` produce `errors: []`.

## 2. Code and asset checks

- JavaScript checked with `node --check`.
- CSS parsed using `tinycss2` without syntax errors.
- Referenced HTML stylesheets/scripts and bundled Masterbook link exist.
- No CDN is necessary for formulas or image assets.
- Deployment workflow is at `.github/workflows/deploy-pages.yml`.

## 3. Browser behavior checks

A local, offline Playwright/Chromium harness injected the deployment HTML/CSS/JS as original bytes. Direct URL navigation was blocked by the runtime's browser policy; **the browser test is a synthetic offline page harness rather than a live GitHub Pages deployment test**.

- Desktop (1440px) and mobile (390px): dashboard, practice, bank, exam, review, menu, theory and formulas loaded with no JavaScript page errors.
- Scrolling: no horizontal viewport overflow on checked routes, including the corrected narrow-screen Question Bank.
- Practice: selecting an answer displays feedback, enables the Next Question button and records the result to the mocked LocalStorage used by the harness.
- Original-source exam: 30 randomized questions rendered; timer and navigation present.
- Question Bank: Test Bank filter returns sourced questions, with flagged original items in the separate transparency drawer.
- Theory and formula routes show native MathML; Formula Sheet yielded 28 MathML renderings during DOM inspection.

## 4. Limits

- No real GitHub-hosted browser smoke test has been run. Verify site after pushing to GitHub Pages.
- Original source answers outside the manual source-key corrections have not all received independent line-by-line mathematical auditing.
- LocalStorage behavior was tested with a compatible in-memory mock due the sandbox page's opaque origin; persistent cross-session storage needs a normal hosted browser origin.
- Extra advanced lecture modules remain intentionally; exam scope is documented separately.
