# Comparison and Evaluation

* **Page under test:** `https://app.vwo.com/#/login`
* **Run dates:** 
  * **Run 02:** 2026-11-12
  * **Run 04:** 2026-11-13
  * **Run 07:** 2026-11-14

---

## 1. The Three Runs

| Run | File | Prompt | Test Cases | Expected Results That Are Gaps | Expected Results Backed by Provided Info | Gaps Listed |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **1** | `02` | RICEPOT, no guardrails | 26 | Not tracked | None provided | None |
| **2** | `04` | RICEPOT + guardrails | 20 | 20 of 20 | 0 | 9 |
| **3** | `07` | RICEPOT + guardrails + provided information | 25 | 13 of 25 | 12 | 12 |

* **Run 3 count per type:** Functional (8), Negative (6), Security (3), UI (6), Usability (2).

---

## 2. Step 3: Information Gaps Identified by the Rules

* **9 gaps** (`G01` to `G09` in `05-information-gaps.md`) were identified in Run 2. 
* After the missing information was supplied, Run 3 reported **12 residual gaps**. 
* *Note:* The Run 3 count is higher because the test cases are more specific, meaning each gap is narrower. Consequently, the two counts are not directly comparable as a measure of progress.

---

## 3. Step 4: Before and After (`02` vs. `07`)

### Summary

| Measure | Count |
| :--- | :---: |
| Test cases in `02` | 26 |
| Test cases in `07` | 25 |
| Identical test cases | 0 |
| `02` cases retained in `07` with the same scenario | 16 |
| `02` cases retained loosely (broader or merged) | 2 |
| `02` cases removed in `07` | 8 |
| `07` cases with no counterpart in `02` | 9 |

> **Note:** No case is completely identical because every case in `07` features updated wording, a `Source` label, and a revised expected result.

### Mapping of `02` to `07`

| `02` ID | Scenario in `02` | `07` Match | Status |
| :--- | :--- | :--- | :--- |
| **TC001** | Valid sign-in | TC001 | Same scenario |
| **TC002** | Uppercase email | *None* | Removed |
| **TC003** | Retry after wrong password | TC001, TC009 | Loose |
| **TC004** | Password visibility control | TC002 | Same scenario |
| **TC005** | Password recovery link | TC003 | Same scenario |
| **TC006** | Registration link | TC007 | Same scenario |
| **TC007** | Plus-tagged email | *None* | Removed |
| **TC008** | Unregistered email | TC009 | Same scenario (merged) |
| **TC009** | Incorrect password | TC009 | Same scenario |
| **TC010** | Empty email | TC010 | Same scenario |
| **TC011** | Empty password | TC011 | Same scenario |
| **TC012** | Both fields empty | TC012 | Same scenario |
| **TC013** | Invalid email format | TC013 | Same scenario |
| **TC014** | Whitespace-only input | *None* | Removed |
| **TC015** | Password length boundary | TC014 | Same scenario (generic) |
| **TC016** | Password masked | TC015 | Same scenario |
| **TC017** | HTTPS | TC016 | Same scenario |
| **TC018** | Script-like text in email | *None* | Removed |
| **TC019** | Session ends after sign-out | *None* | Removed |
| **TC020** | Desktop layout | TC018 to TC023 | Same scenario (made specific) |
| **TC021** | Mobile layout | *None* | Removed (mobile not in scope) |
| **TC022** | Label and control alignment | TC019, TC020 | Loose |
| **TC023** | Keyboard navigation | TC024 | Same scenario |
| **TC024** | Accessible form errors | *None* | Removed |
| **TC025** | Email kept after failed sign-in | *None* | Removed |
| **TC026** | Clear failure feedback | TC025 | Same scenario |

### New in `07` (No Counterpart in `02`)
* **TC004:** Google sign-in
* **TC005:** SSO sign-in
* **TC006:** Passkey sign-in
* **TC008:** Remember me
* **TC017:** Repeated unsuccessful attempts
* **TC018:** Heading and logo
* **TC021:** Remember me default state
* **TC022:** Alternative sign-in controls
* **TC023:** Sign-up and legal text

*Observation:* Run 1 never mentioned Google, SSO, Passkey, or Remember me. They appear in Run 3 solely because the observed page structure was supplied.

### Accuracy of `02` Against Observed Facts
* **Correct assumptions:** A password visibility control, a recovery link, and a registration link all exist on the page. Run 1 assumed them without any source.
* **Likely contradicted:** `TC010` to `TC013` expected field-specific feedback (e.g., *"missing email is indicated"*, *"required-field feedback"*). The observed behavior is a single generic message for all four scenarios (pending confirmation of this tester-reported fact).
* **Unverifiable from provided information:** Most other expected results, including HTTPS enforcement, sign-out behavior, whitespace handling, and mobile layout.

---

## 4. Supporting Comparison: `04` vs. `07`

| Measure | `04` | `07` |
| :--- | :---: | :---: |
| **Test cases** | 20 | 25 |
| **Concrete expected results** | 0 | 12 |
| **Gap expected results** | 20 | 13 |
| **Padding or near-duplicates** | Several (`TC004/005`, `TC015/016`, `TC008/009`) | None |
| **Priorities assigned** | No (gap) | Yes, by the supplied rule |

* **Restored cases:** The cases removed in `04` whose assumptions later proved correct were the visibility control, recovery link, and registration link cases. The guardrails were overly cautious initially, and the supplied information restored them.

---

## 5. Step 5: Evaluation

| Criterion | Run 1 (`02`) | Run 2 (`04`) | Run 3 (`07`) |
| :--- | :--- | :--- | :--- |
| **Traceability to inputs** | None | `Source` column, per row | `Source` column, per row |
| **Silent assumptions** | About 9 | None | None |
| **Invented details (messages, limits)** | None invented, but expected results hedged | None | None |
| **Concrete, verifiable expected results** | Few | 0 | 12 of 25 |
| **Coverage of the real page** | Missed Google, SSO, Passkey, Remember me | Not applicable (empty) | Covers all visible controls |
| **Executable as written** | Mostly | No | 12 of 25 |
| **Gaps made visible** | No | Yes (9) | Yes (12) |

### Verdict
Applying the anti-hallucination rules produced **more accurate and trustworthy** test cases, though not inherently more useful ones without supporting context.

* **Accuracy:** With the rules applied, every expected result is either backed by supplied information or explicitly marked as a gap. Without them, expected results relied on guesses—some accurate and others likely wrong.
* **Usefulness depends on supplied information:** Run 2 applied the rules without information and produced 20 empty placeholder cases. Run 3 recovered coverage and concrete expected results only after facts were provided. The rules' primary value was surfacing the 9 initial gaps and stripping out unsupported assumptions.
* **Cost of the rules:** 8 baseline cases were removed, 3 of which rested on assumptions that turned out to be true. Two standard edge cases (script-like input and accessible errors) were also dropped, though they could have been retained as scenarios with gaps marked for their expected results.
* **Remaining weakness:** 13 of 25 expected results remain gaps, meaning the test suite is incomplete without further documentation.

---

## 6. Limitations

1. **Single run per prompt:** LLM outputs vary between runs, so exact counts may fluctuate on a repeat execution.
2. **Confounded variables (rules vs. information):** Run 3 adds both guardrails and page information relative to Run 1. A fourth run (information *without* guardrails) would be needed to isolate the exact effect of the rules once facts are known.
3. **Unverified tester reports:** The empty-field validation behavior (`TC010`–`TC013` and `TC025`) relies on a single generic message being shown across all four scenarios. Confirm this behavior before final submission.
4. **Circular test cases in Run 3:** `TC018` to `TC023` verify static facts copied directly into the prompt, restating the input rather than adding deep coverage. Similarly, `TC025` duplicates `TC009` to `TC013`.
5. **Tester-defined constraints:** The priority rules and browser scope were chosen by the tester rather than directly observed from the application.
6. **Non-comparable gap counts:** As noted in Section 2, gap counts between Run 2 and Run 3 measure different levels of granularity and cannot be compared directly.

---

## 7. Suggested Next Steps

* **Close remaining gaps:** Supply the post-login URL, eye icon toggle behavior, and expected outcomes for *Forgot Password*, *Start a free trial*, and *Remember me* to resolve the remaining 13 gaps.
* **Run a control prompt (optional):** Execute a fourth prompt providing the observed page information *without* guardrails to isolate the exact impact of the anti-hallucination rules.