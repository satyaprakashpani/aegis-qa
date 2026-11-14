# Purpose:
 Identical to 03-prompt-with-guardrails except for the "Provided Information" block added under Context, and Source labels that reference it.

# R: Role

You are a senior QA engineer with 15 years of experience in SaaS and B2B application testing, with strong knowledge of Wingify (VWO) products and terminology.

# I: Instructions
Generate a complete set of functional test cases for the login page of https://app.vwo.com.
Cover positive, negative, boundary, security, usability, and UI scenarios.
Each test case must have: ID, Title, Preconditions, Test Steps, Expected Result, Priority (High/Medium/Low), and Type (Functional/Negative/Security/UI/Usability).
Cover at least 20 test cases.
Group the test cases by type.
 
# C: Context
Application: VWO (Visual Website Optimizer), a SaaS experimentation and conversion optimization platform.
Page under test: the login page, used by marketers, product managers, and developers to access their VWO account.
Users: existing customers on web browsers (desktop and mobile).
Provided Information

Source: observed by the tester on https://app.vwo.com/#/login on 2026-11-14 in Chrome on desktop, unless marked "tester-reported".

Page structure (observed)
Item	Observed
Page heading	"Sign in to Wingify platform"
Logo	Wingify logo at the top of the form
Email field	Label "Email address", placeholder "Enter email ID"
Password field	Label "Password", placeholder "Enter password"
Password show/hide control	Eye icon at the right end of the password field (toggle behavior not verified)
Forgot password link	"Forgot Password?" below the password field
Remember me	Checkbox labelled "Remember me", unchecked by default
Primary button	"Sign in"
Divider	"Or"
Alternative sign-in buttons	"Sign in with Google", "Sign in using SSO", "Sign in with Passkey"
Sign-up link	"Don't have an account?" followed by the link "Start a free trial"
Legal text	"By continuing, you agree to Wingify's Privacy policy & Terms." (Privacy policy and Terms are links)
Behavior (tester-reported)
Scenario	Result
Wrong credentials (made-up email and password)	Message shown: "Your email, password, IP address or location did not match"
Empty email, empty password, both fields empty, malformed email	Same message shown: "Your email, password, IP address or location did not match"
Test account (tester-reported)
The test account has no 2FA, no SSO, and no CAPTCHA.
Credentials are not included in this prompt.
Decisions by the tester
Browser in scope: Chrome on desktop.
Priority rule: High = authentication and security; Medium = input validation and error handling; Low = cosmetic and layout.
Scope rule

Anything not listed under Provided Information remains unknown. Treat it as a gap.

# E: Example
ID	Title	Preconditions	Steps	Expected Result	Priority	Type
TC001	Login with valid credentials	User has an active account	1. Open login page 2. Enter email 3. Enter password 4. Click Sign in	User lands on the dashboard	High	Functional

# P: Parameters
Write steps as short, numbered, imperative sentences.
Expected results must be specific and verifiable.
Avoid duplicate test cases.
Prioritize by business risk.

# O: Output
A single markdown table of all test cases, grouped by type.
After the table, one line with the total count per type.
Store the output testcase document in the new file 07-testcases-final.md under Anti-Hallucination-Comparison folder.  

# T: Tone
Professional, precise, and concise.

## Anti-Hallucination Rules

SCOPE OF KNOWLEDGE

Use ONLY information stated in this prompt, including the Provided Information section. The URL is a label only.
Do not browse. Do not use prior knowledge of how the live VWO login page looks or behaves. VWO knowledge may be used for terminology only.

WHAT IS ALLOWED

Derive scenarios from the features the prompt states, using standard test design techniques (empty input, invalid format, boundary).
A scenario is allowed. Its expected result is allowed only if the prompt supports it.

STRICT RULES (MANDATORY)

Do not invent features, APIs, error codes, UI elements, labels, links, messages, validation rules, limits, timeouts, URLs, or behavior.
Do not assume default or "typical" system behavior.
If a detail is missing or unclear, write exactly "Insufficient information to determine." in that field, record it as a gap, and continue.
Every precondition, step and expected result must be traceable to this prompt. Add a Source column with one of: "Provided Information", "Prompt", "Inference (low confidence)", "Gap".
Label any inferred detail exactly "Inference (low confidence)". Use inference only for steps that are logically necessary (for example, "open the login page").
Use stable wording so the same input produces the same output.
The example row is a format guide only. Do not treat its content as fact.

PROCESS (perform internally)

Extract verifiable facts. 2. List unknowns. 3. Generate only from the facts. 4. Self-check for invented details and contradictions.

OUTPUT FORMAT (STRICT)

Verified Facts: numbered list of facts taken from this prompt.
Test cases: the table from the Output section, plus a Source column. Include the count per type.
Missing / Unknown Information: table with Gap ID, Missing detail, Test cases affected. End with the total number of gaps.
Self-Validation Check: confirm every assertion has a Source, list test cases whose expected result is a gap, and list contradictions found (or "none found").

If a section cannot be completed, state why in that section and continue.