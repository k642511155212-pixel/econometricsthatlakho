# Econometrics Mastery v4.0

A GitHub Pages-ready, bilingual Econometrics learning website. This release keeps the original academic curriculum and its source hierarchy while adding the connected study workflow and playful visual language developed for ESP3 Mastery.

## Academic content retained

- 10 modules and 104 deep theory lessons.
- 980 explained multiple-choice questions: 600 course-aligned drills plus 380 integrated Wooldridge 5e test-bank questions.
- 312 section self-checks and 312 guided problems.
- 409 bilingual glossary entries.
- 28 core equations and 16 Econometrics calculators.
- Source-audit notes, option-level explanations, exact theory links, Empirical Lab, annotations, saved items, Mistake Notebook and SRS flashcards.

## New in v4

- **Module Hub:** roadmap, terms, practice paths, guided problems and review plan for every module.
- **Bilingual Term Bank:** English/Vietnamese search, module/type filters and mastery tracking.
- **Focused Term Flashcards:** one-card mode, module decks, shuffle and review/mastered states.
- **Free-text Terminology Trainer:** answer from a definition before seeing the optional word bank.
- **Short-answer Trainer:** 312 course-linked prompts with an 80-word target and hidden guided answers.
- **Econometric Write-up Bank:** 104 interpretation/diagnostic prompts with a 120–180 word target.
- **Review Hub:** no-timer worksheets for terms, MCQ, short answers and write-ups, selectable by module.
- **Mixed Exam:** 45-minute assessment with 10 MCQs, 5 terminology items, 3 short answers and 1 empirical write-up. Objective marks are automatic; written marks use transparent rubrics.
- Expanded dashboard, course map, study-space cards, Donate page, progress analytics and responsive layouts.

## Formula and image reliability

- Equations use **browser-native MathML**. Fractions, sums with limits, subscripts, superscripts and radicals remain structured mathematical elements instead of flattened text.
- Formula cards include definitions, use cases, warnings and a copyable notation fallback.
- Long formulas have their own horizontal scroll region on small screens, so the page itself does not overflow.
- The formula system has no MathJax/CDN/network dependency.
- Hero art, favicon, Donate QR and all six mascot variants are embedded directly as `data:` URLs. No runtime image path or external image host is required.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload **the contents of this folder** to the repository root.
3. Commit and push to the `main` branch.
4. In **Settings → Pages**, choose **GitHub Actions** as the source.
5. The included `.github/workflows/deploy-pages.yml` workflow publishes the static site.

No build step, backend, package installation or environment variable is required.

## Main files

- `index.html` — application shell and load order.
- `styles.css` — responsive UI and native-formula layout.
- `embedded-assets.js` — directly embedded hero, favicon and Donate image.
- `app.js` — routing, learning tools, native MathML renderer and local persistence.
- `data.js`, `source-extensions.js`, `deep-econometrics.js`, `extended-theory.js`, `testbank-data.js` — curriculum and question data.
- `annotations.js` — highlights and notes.
- `qa.js` — original curriculum/data integrity suite.
- `qa-v4.js` — v4 route, assessment, embedded-image and formula-structure suite.
- `QA_REPORT.md` — verified release counts and checks.
- `SOURCE_ALIGNMENT.md` — curriculum/source audit map.

## Local data

Progress, mastery, attempts, written drafts, annotations and active mixed-exam state are stored in the browser's `localStorage`. They never require a server.

## Academic-use note

Generated practice items are source-aligned drills, not claims that they appeared verbatim in an official exam. Test-bank items are labeled separately. The instructor's current syllabus and official announcements remain authoritative.
