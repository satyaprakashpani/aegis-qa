# Comparison and Evaluation
Page under test: https://app.vwo.com/#/login

Run dates: 02 on 2026-11-12, 04 on 2026-11-13, 07 on 2026-11-14

1. The three runs
Run	File	Prompt	Test cases	Expected results that are gaps	Expected results backed by provided information	Gaps listed
1	02	RICEPOT, no guardrails	26	not tracked	none provided	none
2	04	RICEPOT + guardrails	20	20 of 20	0	9
3	07	RICEPOT + guardrails + provided information	25	13 of 25	12	12

Run 3 count per type: Functional 8, Negative 6, Security 3, UI 6, Usability 2.

2. Step 3: information gaps identified by the rules

9 gaps (G01 to G09 in 05-information-gaps.md), identified in run 2. After the missing information was supplied, run 3 reported 12 residual gaps. The run 3 count is higher because the cases are more specific, so each gap is narrower. The two counts are not comparable as a measure of progress.

3. Step 4: before and after (02 vs 07)
Summary
Measure	Count
Test cases in 02	26
Test cases in 07	25
Identical test cases	0
02 cases retained in 07 with the same scenario	16
02 cases retained loosely (broader or merged)	2
02 cases removed in 07	8
07 cases with no counterpart in 02	9

No case is identical, because every case in 07 has new wording, a Source label, and a different expected result.

Mapping of 02 to 07
02 ID	Scenario in 02	07 match	Status
TC001	Valid sign-in	TC001	Same scenario
TC002	Uppercase email	none	Removed
TC003	Retry after wrong password	TC001, TC009	Loose
TC004	Password visibility control	TC002	Same scenario
TC005	Password recovery link	TC003	Same scenario
TC006	Registration link	TC007	Same scenario
TC007	Plus-tagged email	none	Removed
TC008	Unregistered email	TC009	Same scenario (merged)
TC009	Incorrect password	TC009	Same scenario
TC010	Empty email	TC010	Same scenario
TC011	Empty password	TC011	Same scenario
TC012	Both fields empty	TC012	Same scenario
TC013	Invalid email format	TC013	Same scenario
TC014	Whitespace-only input	none	Removed
TC015	Password length boundary	TC014	Same scenario (generic)
TC016	Password masked	TC015	Same scenario
TC017	HTTPS	TC016	Same scenario
TC018	Script-like text in email	none	Removed
TC019	Session ends after sign-out	none	Removed
TC020	Desktop layout	TC018 to TC023	Same scenario (made specific)
TC021	Mobile layout	none	Removed (mobile not in scope)
TC022	Label and control alignment	TC019, TC020	Loose
TC023	Keyboard navigation	TC024	Same scenario
TC024	Accessible form errors	none	Removed
TC025	Email kept after failed sign-in	none	Removed
TC026	Clear failure feedback	TC025	Same scenario
New in 07 (no counterpart in 02)

TC004 (Google sign-in), TC005 (SSO sign-in), TC006 (Passkey sign-in), TC008 (Remember me), TC017 (repeated unsuccessful attempts), TC018 (heading and logo), TC021 (Remember me default state), TC022 (alternative sign-in controls), TC023 (sign-up and legal text).

Run 1 never mentioned Google, SSO, Passkey, or Remember me. They appear in run 3 only because the observed page structure was supplied.

Accuracy of 02 against the observed facts
Correct assumptions: a password visibility control, a recovery link, and a registration link all exist on the page. Run 1 assumed them without any source.
Likely contradicted: TC010 to TC013 expected field-specific feedback ("missing email is indicated", "required-field feedback"). The observed behavior is one generic message for all four scenarios. This depends on the tester-reported fact being confirmed.
Unverifiable from the provided information: most other expected results, including HTTPS, sign-out, whitespace handling, and mobile layout.

4. Supporting comparison: 04 vs 07
Measure	04	07
Test cases	20	25
Concrete expected results	0	12
Gap expected results	20	13
Padding or near-duplicates	Several (TC004/005, TC015/016, TC008/009)	None
Priorities assigned	No (gap)	Yes, by the supplied rule

Cases removed in 04 whose assumptions later proved correct: the visibility control, recovery link, and registration link cases. The guardrails were over-cautious here, and the supplied information restored them.

5. Step 5: evaluation
Criterion	Run 1 (02)	Run 2 (04)	Run 3 (07)
Traceability to inputs	None	Source column, per row	Source column, per row
Silent assumptions	About 9	None	None
Invented details (messages, limits)	None invented, but expected results hedged	None	None
Concrete, verifiable expected results	Few	0	12 of 25
Coverage of the real page	Missed Google, SSO, Passkey, Remember me	Not applicable (empty)	Covers all visible controls
Executable as written	Mostly	No	12 of 25
Gaps made visible	No	Yes (9)	Yes (12)
Verdict

Applying the anti-hallucination rules produced more accurate and more trustworthy test cases, but not by themselves more useful ones.

Accuracy: with the rules, every expected result is either backed by supplied information or marked as a gap. Without them, expected results rested on guesses, some correct and some likely wrong.
Usefulness depends on the supplied information. Run 2 had the rules and no information, and it produced 20 empty cases. Run 3 recovered coverage and concrete expected results only after the facts were supplied. The rules' own contribution is that they found the 9 gaps and removed unsupported cases.
Cost of the rules: 8 baseline cases were removed, 3 of which rested on assumptions that proved true. Two standard ideas (script-like input, accessible errors) were also dropped, though they could have stayed as scenarios with a gap marked as the result.
Remaining weakness: 13 of 25 expected results are still gaps, so the suite is not complete without further information.

6. Limitations
One run per prompt. Models vary between runs, so the counts may change on a repeat.
Rules and information are not separated. Run 3 adds both the rules and the information relative to run 1. A fourth run (information without rules) would show what the rules add once the facts are known. It was not part of the task.
The empty-field behavior is tester-reported. TC010 to TC013 and TC025 depend on one message being shown for all four validation scenarios. Confirm this before submitting.
Some run 3 cases are circular. TC018 to TC023 check facts that were copied into the prompt, so they restate the input and add little new coverage. TC025 repeats TC009 to TC013.
The priority rule and browser scope were chosen by the tester, not observed.
The gap counts are not comparable between runs (see section 2).

7. Suggested next steps
Supply the post-login URL, the eye icon toggle behavior, and the Forgot Password, Start a free trial, and Remember me results to close more gaps.
Optionally run a fourth prompt with the information and no guardrails, to isolate the effect of the rules.