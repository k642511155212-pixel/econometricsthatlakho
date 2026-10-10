# ECONOMETRICS × RUỒI LÙN — V5 (source-verified edition)

A mobile-ready, static website for FTU CS2 Econometrics, updated from the user's existing Econometrics Mastery project. This is a **patch and redesign**, not a replacement of its theory, formulas, glossary, calculators, or local study progress.

## Changes requested and delivered

1. **Ruồi Lùn interface:** The familiar ESP3-inspired soft-cream canvas, forest-green dashboard sidebar, editorial titles and fly mascot; reworked navigation, cards, MCQ practice and mobile behavior. The responsive layout was checked at 1440px and 390px, with no horizontal overflow on the tested routes.
2. **Original-source question bank only:** Removed all **600 generated MCQs** from `data.js`, not just hidden in filters. Also eliminated **174 generated guided problems** and **174 inline generated self-checks** from `deep-econometrics.js`, and deactivated synthetic write-up and short-answer routes.
3. **Masterbook integration:** Parsed **459 source-tagged MCQs** from the uploaded 246-page Masterbook V7. Sixteen ambiguous/defective source items are isolated in an expandable **Source transparency** section and never used for automatic scoring. The remaining 443 imported entries are deduplicated by normalized question wording along with 380 original test-bank entries that were already in the project. The final result is **694 unique gradable source questions**, including **431 nonduplicate items from the Masterbook** and **263 additional nonduplicate original Test Bank items**.
4. **Traceability:** Each Masterbook question stores its source tag and underlying original PDF reference and links directly to its page in the bundled source PDF.
5. **Exam:** 30 random, source-based MCQs and a 45-minute countdown; answers are revealed in the post-exam review. Ordinary Practice reveals the explanation immediately when an option is chosen.
6. **Native math:** Existing browser-native **MathML** remains intact. Fractions, integrals, exponents and subscripts stay structured and independently horizontally scrollable on small screens; no MathJax/CDN requirement.

**Academic caution:** A source-provided answer key can be erroneous. Sixteen source questions were excluded from auto-grading. A few incorrect source keys with defensible corrections are explicitly annotated; other source answers are preserved as source-based, not represented as individually re-derived mathematical proofs. Source-specific answers and detailed reasoning still deserve human review, especially questions relying on diagrams or tables in the original documents.

## Key files

- `index.html`: Navigation, layout and local embedded branding.
- `ruoi-lun-theme.css`: The final Ruồi Lùn desktop/mobile design layer.
- `styles.css`: Existing detailed module, quiz, tools and MathML styles.
- `app.js`: App routing, practice/exam actions and review behavior.
- `data.js`, `source-extensions.js`: Original course modules, deep theory and base learning resources (generated MCQs removed).
- `deep-econometrics.js`, `extended-theory.js`: Existing enhanced theory (synthetic guided questions removed).
- `testbank-data.js`: Original 380 imported test-bank entries, loaded as a source prior to deduplication.
- `source-verified-bank.js`: Only approved-source practice questions, source IDs, page references, source issue registry and provenance-aware deduplication.
- `embedded-assets.js`, `annotations.js`: Image embedding and note/highlight system.
- `references/KTL_Final_Masterbook_V7_Heteroskedasticity_Testing.pdf`: Uploaded source reference linked from the question cards.
- `SOURCE_ALIGNMENT.md`: Source reconciliation and issue policy.
- `qa.js`: Integrity checks for questions, source provenance and theory links.

## Run

This is plain HTML/CSS/JavaScript. It requires no build step, framework, API key, subscription or backend.

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Create a GitHub repository with the **contents of this ZIP** at repository root. Do not upload the enclosing ZIP as a single file.
2. Push to `main`.
3. In **Settings → Pages**, select **GitHub Actions** as the build-and-deployment source.
4. The workflow in `.github/workflows/deploy-pages.yml` deploys automatically.

## Testing

```bash
node qa.js
node qa-v4.js
```

Both should report zero errors. The testing report and limits are recorded in `QA_REPORT.md`. LocalStorage keeps the user's progress. This static website does **not** synchronize progress across devices.
