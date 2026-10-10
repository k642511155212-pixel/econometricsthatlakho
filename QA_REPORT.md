# QA Report — Econometrics Mastery v4.0

Validation date: **2026-09-14**

## Verified counts

| Check | Result |
| --- | ---: |
| Modules | 10 |
| Lessons | 104 |
| Practice questions | 980 |
| Glossary / Term Bank entries | 409 |
| Short-answer prompts | 312 |
| Econometric write-up prompts | 104 |
| Self-check prompts | 312 |
| Guided problems | 312 |
| Formula cards | 28 |
| Structured fractions (`mfrac`) | 29 |
| Structured sums with limits (`munderover`) | 6 |
| Structured sub/superscripts | 86 |
| Directly embedded project images | 9: hero, favicon, Donate and 6 mascots |

## Automated checks

Run both suites from the project root:

```bash
node qa.js
node qa-v4.js
```

Both suites finish with `errors: []`.

`qa.js` validates the original curriculum and data integrity: IDs, answer indices, option explanations, theory links, test-bank provenance, source audits, formula metadata and enhancement bundles.

`qa-v4.js` additionally validates:

- every new route renderer;
- every module has enough terms, MCQs, short answers and write-ups for a module-scoped mixed exam;
- the mixed paper contains 10 MCQs, 5 terms, 3 short answers and 1 write-up;
- all 28 formula names produce non-empty, balanced native MathML;
- fractions, summations and scripts remain semantic structures rather than flat strings;
- MathJax/CDN references are absent;
- hero, favicon, Donate and mascot images are directly embedded;
- legacy `assets/` image paths and runtime image-file references are absent;
- every script loaded by `index.html` exists;
- v4 CSS contains the formula, Module Hub, trainer, Review Hub, mixed-exam and Donate layout systems.

## Responsive safeguards

- Every formula is wrapped in a dedicated `.math-scroll` region with `overflow-x: auto`.
- Formula cards and all new grids collapse at 1000 px, 760 px and 430 px breakpoints.
- Mixed-exam controls remain sticky and compact on small screens.
- Images use embedded `data:` URLs and cannot fail because of repository-relative image paths.

## Browser compatibility

The release targets current Chrome/Edge, Firefox and Safari versions with native MathML support. No network connection is required after the repository files load.
