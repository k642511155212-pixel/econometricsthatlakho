# Build Notes

- Architecture: static HTML + CSS + Vanilla JavaScript SPA.
- Deployment target: GitHub Pages.
- Storage: browser `localStorage` only; no server/database required.
- Math rendering: MathJax 3 via CDN. Plain text remains readable if MathJax is unavailable.
- Primary data namespace: `window.EM_DATA`.
- Annotation namespace: `window.EM_Annotations`.
- Local-storage prefix: `em_`.
- Practice bank: exactly 600 questions.
- Question IDs: `Q001`–`Q600`.
- Questions include `optionExplanations[4]` and a `review` path.
- Generated items are labeled by origin so the learner can distinguish lecture/test-bank-aligned concept checks, exam-style variants and generated source-aligned drills.
