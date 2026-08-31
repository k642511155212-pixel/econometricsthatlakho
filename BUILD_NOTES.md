# Build Notes — Econometrics Mastery v2.0

Date: 2026-08-31

## Why v2 was rebuilt

A second source audit found three material gaps in the first GitHub-ready build:

1. `dummy_S.pdf` was uploaded after the first build and therefore was not fully represented.
2. The Chapter 5 autocorrelation lesson was too compressed relative to the supplied lecture slides.
3. The newly uploaded Wooldridge 5e test bank extends through Chapter 19, while the original site had only enough explicit theory to support the core course plus selected extensions.

## Changes made

- Added 46 lessons and four extended modules, bringing the curriculum from **58 → 104 lessons**.
- Added source-specific dummy-variable lessons and restored missing diagnostic detail.
- Added theory for asymptotics/LM, scaling/prediction, specification/data problems, time series, panels, IV/2SLS/simultaneous equations and limited-dependent-variable models.
- Parsed and integrated **380/380** supplied Wooldridge test-bank questions.
- Added source, chapter, question number, difficulty, Bloom level, topic/A-Head and source-key metadata to test-bank items.
- Added answer/option explanations and exact review links for every test-bank question.
- Added source-audit notices for questionable bank keys/wording and corrected five clear answer-key conflicts.
- Added Practice filters for Core, Test Bank, source, chapter, difficulty and Bloom level.
- Added separate Core Course vs Test-Bank exam entry points.
- Registered the added dummy lecture, Stock & Watson 3e and FTU project/research-method guide in the source list.
- Updated HTML script order so extensions load before the app starts.

## Compatibility

- Static HTML/CSS/JS only.
- No build system required.
- Existing localStorage keys remain compatible with the original build.
- Original 600 question IDs are unchanged; test-bank IDs use `TBxx-yy`.
