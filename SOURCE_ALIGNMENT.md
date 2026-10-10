# V5 · Source alignment and integrity rules

## Approved questions

**Only** the user's provided Masterbook V7 and explicitly sourced exam/test-bank entries are admissible. Never mix unsourced, AI-generated practice questions into the scoreable bank.

- User's Masterbook: `KTL_Final_Masterbook_V7_Heteroskedasticity_Testing.pdf` (246 pages; source-tagged original MCQs).
- In the Masterbook, `WB-*` refers to a textbook test bank; `K-*` to a sourced exam-review document; `V-*` to a sourced practice paper; and `P-*` to an original past examination.
- Original Wooldridge Test Bank provided earlier: `testbank-data.js` contains 380 transcribed source questions. They are retained only insofar as they are distinct by normalized stem.

## Data reconciliation

| Stage | Questions |
|---|---:|
| Original AI-generated entries in old `data.js` | 600 removed |
| Masterbook V7 tagged MCQ records | 459 read |
| Masterbook source issues unfit for automatic scoring | 16 excluded from graded pool |
| Gradable imported Masterbook records | 443 before dedupe |
| Pre-existing original test-bank entries | 380 before dedupe |
| Total combined without dedupe | 823 |
| Normalized duplicate stems | 129 |
| **Final unique gradeable original-source questions** | **694** |
| From Masterbook after dedupe | 431 |
| Additional original test bank after dedupe | 263 |

The category totals may not match the original Masterbook's editorial statement "457 questions" because the PDF contains 459 machine-identifiable `MCQ · [ID]` headings. All 459 IDs were extracted and accounted for; source ambiguity and duplicates are reported instead of silently corrected.

## Source issues

Sixteen original Masterbook questions have missing, multiple, internally inconsistent or mathematically questionable answer data and are not auto-graded. They remain visible with their original source ID and Masterbook page under **Question Bank → Source transparency**. Some additional source-key corrections, where a defensible mathematical resolution is possible, are annotated using the `sourceAudit` property; original incorrect source keys are not represented as reliable.

For MCQ answers imported from original keys, the application distinguishes sourced answer information from complete independent proof. Its generic why-not-alternative assistance should not be mistaken for a proof that every distractor has been independently verified.

## Teaching scope

The uploaded Masterbook highlights: Chapters 1–4; dummy variables; multicollinearity; heteroskedasticity detection/formal testing; and autocorrelation by MCQ only. The website **retains** extra advanced modules from the original project for future study, but the core timed exam mode draws from modules 1–6. The all-source mode also includes sourced test-bank questions from advanced chapters.

## Native math and image policy

- Keep the original MathML and formula structure. Do not flatten mathematical expressions into one-line plaintext.
- Hero and mascot images are embedded in the HTML/JS as data URLs and require no external CDN or image host.
- The bundled Masterbook PDF is the sole documentation asset linked directly from cited MCQ records.
