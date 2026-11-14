Information Gaps Identified by Anti-Hallucination Rules
Source: Missing / Unknown Information table in 04-testcases-with-guardrails.md
Run: (RICEPOT prompt with anti-hallucination rules)
Model: <model name and version>
Date of run: 2026-11-13
Page under test: <app.vwo.com>
Result

Total information gaps identified: 9

In addition, all 20 of 20 generated test cases have "Insufficient information to determine." as their Expected Result, so no test case is executable until the gaps are filled.

Gap list (as reported by the model, unedited)
Gap ID	Missing detail	Test cases affected
G01	Login page controls, input fields, and submission action	TC001–TC003, TC006–TC013, TC015–TC019
G02	Test account availability and what credentials count as valid or invalid	TC001–TC003
G03	Input formats, validation rules, and lower/upper boundary values	TC006–TC010
G04	Authentication outcomes and unsuccessful-attempt behavior	TC001–TC003, TC006–TC010, TC013, TC019
G05	Security requirements for sensitive data, submission, repeated attempts, and sessions	TC011–TC014
G06	Expected page content, layout, and presentation on desktop and mobile	TC004–TC005, TC015–TC016, TC020
G07	Usability requirements and expected interaction or feedback	TC017–TC020
G08	Supported browsers and viewport/device criteria	TC004–TC005, TC015–TC016, TC020
G09	Business-risk criteria for assigning priority	TC001–TC020
Impact per gap (counted from the table above)
Gap ID	Test cases affected
G01	16
G02	3
G03	5
G04	10
G05	4
G06	5
G07	4
G08	5
G09	20
Grouped by type of missing information
Group	Gaps
Page structure and test setup	G01, G02
Expected behavior	G03, G04
Non-functional requirements	G05, G06, G07, G08
Test management	G09
Reviewer notes (author's own analysis, not model output)
G09 (priority criteria) is a test-management decision and not a fact about the application. It could be resolved by a priority rule and does not need information from the app.
G01 is the root gap. Without knowing the page's fields and controls, most other gaps cannot be answered, so it should be filled first.
The model reported gaps as categories. Counted per field, the number of "Insufficient information to determine." entries is higher. This file uses the model's category count of 9 as the answer.
The prompt's "at least 20 test cases" rule conflicts with the guardrails. The model produced exactly 20 cases, several of them near-duplicates, to meet the count.
Information to provide in step 4
Gap	Information needed	Source to use
G01	Fields and controls actually on the login page	Observed on the live page
G02	Test account type; whether 2FA, SSO or CAPTCHA applies	Observed or provided by the account owner
G03	Behavior for empty email, empty password, both empty, malformed email	Observed on the live page
G04	Exact error text for wrong credentials; post-login URL or element	Observed on the live page
G05	HTTPS behavior; lockout or rate-limit behavior	Observed, only if verifiable
G06, G08	Browsers and viewport sizes in scope	Decided by the tester
G07	Usability expectations (for example keyboard navigation)	Observed, only if verifiable
G09	Priority rule	Decided by the tester

Anything that cannot be confirmed stays a gap.