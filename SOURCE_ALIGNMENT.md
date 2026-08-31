# Source Alignment & Theory Audit — v2.0

Audit date: **2026-08-31**

The second pass found that the first website build did **not** cover every supplied source topic. The major missing areas were the newly added dummy-variable lecture, deeper Chapter 5 autocorrelation detail, and the theory required to support Wooldridge test-bank Chapters 5–19. These gaps are now represented by explicit lessons rather than being hidden inside generic summaries.

## 1. Core lecture alignment

| Supplied source | Source structure that must be represented | Website coverage after v2 |
| --- | --- | --- |
| Chapter 1 — Introduction | nature/purpose of econometrics; methodology; terminology; data types; measurement/data quality; statistics review; empirical project structure | `m1` + `m6/empirical-project` |
| Chapter 2 — Simple Linear Regression | regression/PRF; stochastic PRF; linearity in parameters; SRF/residual; OLS derivation; assumptions; unbiased/efficient properties; goodness of fit | `m2` |
| Chapter 3 — Multiple Regression | motivation/ceteris paribus; multiple PRF/SRF; partial effects; OLS; assumptions; estimator properties; fit; specification/omitted variables | `m3` |
| Chapter 4 — Statistical Inference | individual t; CI; one/two-tail testing; overall F; equality of coefficients; linear restrictions/RLS; stability/Chow; functional-form tests | `m4` |
| Chapter 5 — Diagnosing Model Problems | multicollinearity; heteroskedasticity; autocorrelation — nature, consequences, detection, remedies | `m5`, with deep audit notes in `extended-theory.js` |
| `dummy_S.pdf` | qualitative info; single dummy/base group; dummy trap; interactions; multiple categories; group-difference/Chow testing; seasonal dummies; piecewise linear regression | `m6/dummy-variables`, `m6/interactions`, `m6/dummy-multiple-categories`, `m6/seasonal-piecewise-dummies`, plus `m4/chow-test` |

### Chapter 5 details explicitly restored

The v2 source audit adds the lecture-level distinctions that were too compressed in the first build:

- multicollinearity: perfect vs high collinearity, estimator precision, high R² with weak individual t-ratios, pairwise correlations, auxiliary regressions, VIF/tolerance, remedies and specification-bias warning;
- heteroskedasticity: causes, OLS consequences, graphical detection, Park, Glejser, Goldfeld–Quandt, Breusch–Pagan–Godfrey, White, robust inference/WLS logic;
- autocorrelation: AR(1) idea, Durbin–Watson assumptions and bounds/indecision, modified d logic, Breusch–Godfrey and higher-order serial correlation, model misspecification vs pure autocorrelation, respecification, GLS/FGLS and Newey–West/HAC.

## 2. Test-bank alignment

The uploaded **Wooldridge 5e Test Bank** contains **19 chapters × 20 questions = 380 questions**. Every item now has a valid theory destination.

| Test Bank chapter | Main theory destination |
| ---: | --- |
| 1 | `m1` Foundations |
| 2 | `m2` Simple Linear Regression |
| 3 | `m3` Multiple Regression |
| 4 | `m4` Statistical Inference |
| 5 | `m4/consistency-asymptotics`, `m4/lm-large-sample` |
| 6 | `m3/functional-forms`, `m6/data-scaling-standardization`, `m6/prediction-residuals` |
| 7 | `m6` dummy/multiple-category/interaction/LPM lessons |
| 8 | `m5` heteroskedasticity + robust/WLS coverage |
| 9 | `m3/omitted-specification`, `m6/functional-misspec-reset`, proxy/measurement-error/sample-selection lessons |
| 10 | `m7` time-series nature, static/distributed lags, trend/seasonality |
| 11 | `m7` stationarity, AR/MA/random walk, time-series OLS, dynamic completeness |
| 12 | `m7` serial correlation detection/correction and time-series heteroskedasticity |
| 13 | `m8` pooled cross sections, natural experiments, two-period panels, first differencing, clustering |
| 14 | `m8` fixed effects, random effects, correlated random effects/Hausman, cluster inference |
| 15 | `m9` IV, relevance/exogeneity, 2SLS, weak instruments, overidentification, endogeneity tests |
| 16 | `m9` simultaneous equations, reduced form, simultaneity bias, identification and system 2SLS |
| 17 | `m10` logit/probit, MLE/LR/Wald, Tobit, Poisson/count, sample selection |
| 18 | `m7` distributed lags, unit roots, spurious regression, cointegration/ECM, forecasting |
| 19 | `m6/empirical-project` and empirical workflow |

### Test-bank question policy

- All 380 items are stored separately from generated/course drills (`sourceType: test-bank`).
- Original chapter/question number, difficulty, Bloom level and topic/A-Head are retained.
- Every option has an explanation.
- Every item maps to `module + lesson` so **Open linked theory** always has a real target.
- The source key is retained in `sourceAnswer`.
- When a clear conflict was found, `sourceAudit` explains the issue. Five keys were corrected; two more bank-specific wording/cause cautions were annotated without changing the selected answer.

## 3. Supplementary textbooks and archive sources

### Gujarati & Porter — Basic Econometrics, 5th ed.
Used for fuller derivations and diagnostic details, especially multiple regression, inference, dummy variables, multicollinearity, heteroskedasticity, autocorrelation, model specification and later econometric topics.

### Wooldridge — Introductory Econometrics, 3rd ed.
Used for the modern ceteris-paribus interpretation, zero-conditional-mean logic, omitted-variable bias, asymptotics, robust inference, time series, panels, IV and limited-dependent-variable reasoning.

### Stock & Watson — Introduction to Econometrics, 3rd ed.
Present in the uploaded course archive and treated as a supplementary source for applied regression, inference, causal interpretation and empirical examples.

### FTU KTEE309 project/research-method guide
Supports the Empirical Project lesson: research question, literature review, model choice, variable definition, data source/summary statistics, OLS methodology, results, conclusion, references and appendices.

### Additional archived assessments
The archive also contains FTU/KTEE218 MCQ/revision/final-exam material. These were used as course/exam calibration sources. They do not create a new theory domain beyond the core lecture sequence. A second questions-only/mock-test PDF based on the Wooldridge bank was treated as duplicate packaging rather than counted again as a second 380-question bank.

## 4. Scope controls in the app

To prevent the enlarged source set from making the actual course feel unfocused:

- **Core course drills** = instructor-course modules and non-test-bank practice;
- **Wooldridge Test Bank** = all 380 supplied bank questions;
- **Mixed** = the full 980-question pool;
- **Core Course exam** = test generated from the core module pool;
- **Test-bank exam** = test generated from the uploaded bank pool.

This keeps source completeness and exam focus separate.
