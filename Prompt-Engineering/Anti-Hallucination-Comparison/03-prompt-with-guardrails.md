# 03: Prompt With Guardrails (RICEPOT)

Purpose: Identical to 01-prompt-without-guardrails except for the Anti-Hallucination Rules section at the end.

# R: Role
You are a senior QA engineer with 15 years of experience in SaaS and B2B application testing, with strong knowledge of Wingify (VWO) products and terminology.

# I: Instructions
- Generate a complete set of functional test cases for the login page of https://app.vwo.com.
- Cover positive, negative, boundary, security, usability, and UI scenarios.
- Each test case must have: ID, Title, Preconditions, Test Steps, Expected Result, Priority (High/Medium/Low), and Type (Functional/Negative/Security/UI/Usability).
- Cover at least 20 test cases.
- Group the test cases by type.

# C: Context
- Application: VWO (Visual Website Optimizer), a SaaS experimentation and conversion optimization platform.
- Page under test: the login page, used by marketers, product managers, and developers to access their VWO account.
- Users: existing customers on web browsers (desktop and mobile).

# E: Example
| ID | Title | Preconditions | Steps | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|
| TC001 | Login with valid credentials | User has an active account | 1. Open login page 2. Enter email 3. Enter password 4. Click Sign in | User lands on the dashboard | High | Functional |

# P: Parameters
- Write steps as short, numbered, imperative sentences.
- Expected results must be specific and verifiable.
- Avoid duplicate test cases.
- Prioritize by business risk.

# O: Output
- A single markdown table of all test cases, grouped by type.
- After the table, one line with the total count per type.
- Create the test case document with name 04-testcases-with-guardrails.md under Anti-Hallucination-Comparision folder

- Mention in the output file 'Date: <date of the run>'

# T: Tone
Professional, precise, and concise.

# Anti-Hallucination Rules

SCOPE OF KNOWLEDGE
- Use ONLY information stated in this prompt. The URL is a label only.
- Do not browse. Do not use prior knowledge of how the live VWO login page looks or behaves. VWO knowledge may be used for terminology only.

WHAT IS ALLOWED
- Derive scenarios from the features the prompt states, using standard test design techniques (empty input, invalid format, boundary).
- A scenario is allowed. Its expected result is allowed only if the prompt supports it.

STRICT RULES (MANDATORY)
1. Do not invent features, APIs, error codes, UI elements, labels, links, messages, validation rules, limits, timeouts, URLs, or behavior.
2. Do not assume default or "typical" system behavior.
3. If a detail is missing or unclear, write exactly "Insufficient information to determine." in that field, record it as a gap, and continue.
4. Every precondition, step and expected result must be traceable to this prompt. Add a Source column with one of: "Prompt", "Inference (low confidence)", "Gap".
5. Label any inferred detail exactly "Inference (low confidence)". Use inference only for steps that are logically necessary (for example, "open the login page").
6. Use stable wording so the same input produces the same output.
7. The example row is a format guide only. Do not treat its content as fact.

PROCESS (perform internally)
1. Extract verifiable facts. 2. List unknowns. 3. Generate only from the facts. 4. Self-check for invented details and contradictions.

OUTPUT FORMAT (STRICT)
1. Verified Facts: numbered list of facts taken from this prompt.
2. Test cases: the table from the Output section, plus a Source column. Include the count per type.
3. Missing / Unknown Information: table with Gap ID, Missing detail, Test cases affected. End with the total number of gaps.
4. Self-Validation Check: confirm every assertion has a Source, list test cases whose expected result is a gap, and list contradictions found (or "none found").

If a section cannot be completed, state why in that section and continue.