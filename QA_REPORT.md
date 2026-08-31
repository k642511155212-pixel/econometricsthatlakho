# QA Report — Econometrics Mastery v2.0

Validation date: **2026-08-31**

Automated validation is run with:

```bash
node qa.js
```

## Final structural counts

| Check | Result |
| --- | ---: |
| Modules | 10 |
| Lessons | 104 |
| Original practice questions | 600 |
| Uploaded Wooldridge test-bank questions | 380 |
| **Total questions** | **980** |
| Test-bank chapters | 19 |
| Questions per test-bank chapter | 20 |
| Formula cards | 28 |
| Glossary entries | 409 |
| Self-check prompts | 312 |
| Guided problems | 312 |
| Source-key corrections | 5 |

## Automated integrity checks

PASS criteria:

- exactly 10 modules and 104 lessons;
- exactly 980 questions;
- exactly 380 test-bank questions;
- exactly 20 test-bank questions in each Chapter 1–19;
- no duplicate question IDs;
- every question maps to an existing module/lesson;
- every question has 2 or 4 answer options as appropriate;
- every answer index is valid;
- every option has an explanation;
- every question has a full explanation and review target;
- all test-bank items include chapter/Bloom/topic/provenance metadata;
- exactly five source answer keys differ after audit;
- all 104 lessons have an enhancement bundle with 3 deep dives and 3 guided problems;
- all formula cards have detailed formula metadata;
- added dummy/test-bank sources exist in the source registry;
- `index.html` loads data/extensions/theory/test-bank files in the correct order.

## Manual/source audit notes

The test bank contains several internal inconsistencies. The v2 build does not silently present a clearly incorrect key as correct. The original key remains available in metadata and an on-screen **Source audit** note explains any correction.

Two bank items are not answer-key corrections but carry caution notes:

- Chapter 1 sequencing: the source bank keys econometric-model specification, while the textbook narrative also stresses careful formulation of the question first.
- Chapter 1 causal example: the bank treats income → consumption as causal; the website preserves the bank answer but reminds the learner that observational causal claims require identification, not correlation alone.

## JavaScript syntax checks

The release process also runs `node --check` on every local JavaScript file.
