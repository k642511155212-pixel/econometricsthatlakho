# Source Alignment

## Curriculum map

| Website module | Primary supplied source | Main coverage |
|---|---|---|
| 01 — Foundations of Econometrics | `1. chapter1 .pdf`; Wooldridge Ch. 1 | nature/purpose of econometrics, empirical workflow, data types, terminology, probability/statistics, causal caution |
| 02 — Simple Linear Regression | `2. chapter2.pdf`; Gujarati Ch. 2–5 | PRF/SRF, stochastic error, OLS, assumptions, BLUE, standard errors, R² |
| 03 — Multiple Regression | `3. chapter3.pdf`; Gujarati Ch. 7; Wooldridge multiple-regression chapters | ceteris paribus slopes, multiple OLS, assumptions, R²/adjusted R², specification bias, functional forms |
| 04 — Statistical Inference | `4. chapter 4 Statistical Inference.pdf`; Gujarati Ch. 8 | t tests, confidence intervals, overall F, equality restrictions, restricted least squares, Chow test, functional-form testing |
| 05 — Diagnosing Model Problems | `5. chapter 5.pdf`; Gujarati Ch. 10–12 | multicollinearity, heteroskedasticity, autocorrelation: nature → consequences → detection → remedies |
| 06 — Exam Extensions & Empirical Lab | supplied final/test-bank materials; Gujarati/Wooldridge | logs, dummies, quadratics, interactions, centering, regression-table interpretation, Stata/EViews workflow, empirical project |

## Key source-driven design decisions

- The site preserves the lecture course sequence **Introduction → Simple Regression → Multiple Regression → Statistical Inference → Diagnosing Model Problems**.
- Chapter 1's empirical project structure is represented in the Empirical Project lesson: abstract, introduction, literature review, methodology/data, results, conclusion, references and appendices.
- Chapter 4's inference sequence is retained: individual coefficient tests, overall significance, coefficient equality, linear restrictions, parameter stability and functional form.
- Chapter 5 is explicitly organized using the course's diagnostic logic: **nature, consequences, detection, cure/remedy**.
- The assessment extension module adds log/dummy/quadratic/interaction interpretation because these patterns occur in the supplied exam materials and are standard continuations in Gujarati/Wooldridge.

## Precision clarifications

Some lecture-slide rules are presented in a more precise way in the website while preserving the course principle:

- **Fixed-X vs random-X framing:** classical fixed-regressor presentation is connected to the modern random-sampling/conditional-mean formulation.
- **Fail to reject:** the website avoids the incorrect phrase “accept H₀” when evidence is insufficient.
- **Confidence intervals:** frequentist long-run coverage is stated precisely.
- **VIF thresholds:** `VIF > 10` and pairwise correlation cutoffs are labeled rules of thumb rather than universal laws.
- **Durbin–Watson:** `d ≈ 2` is presented as intuition; formal bounds/conditions and the limitation with lagged dependent variables are noted.
- **Dummy in log(Y):** exact percentage effects use `100[exp(δ)-1]%`; `100δ%` is identified as an approximation.

## Online references

The Sources page links to:

- Stata official regression postestimation documentation for `estat vif`, heteroskedasticity diagnostics and related postestimation.
- Penn State STAT 501 for open regression-method and diagnostic references.
- NIST/SEMATECH e-Handbook for general statistical diagnostic reference.
