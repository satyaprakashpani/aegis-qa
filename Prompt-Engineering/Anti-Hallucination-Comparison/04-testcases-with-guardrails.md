# VWO Login Page Test Cases — With Guardrails

Date: 2026-11-13

## Verified Facts

1. The requested page is the VWO login page identified by `https://app.vwo.com`; the URL is a label, not a source of behavior.
2. The prompt describes users as existing customers using desktop and mobile web browsers.
3. The requested scenario coverage includes positive, negative, boundary, security, usability, and UI scenarios.
4. The requested test case fields are ID, Title, Preconditions, Test Steps, Expected Result, Priority, and Type; the guarded output also requires a Source field.
5. The prompt permits deriving scenarios using standard techniques such as empty input, invalid format, and boundary tests, but permits an expected result only when supported by the prompt.
6. The example row is a format guide only and is not evidence of actual page fields, controls, labels, or behavior.

## Test Cases

For each row, `Source` applies to the case as a whole. A step explicitly labeled `Inference (low confidence)` is an inferred action; unsupported details and outcomes are recorded as gaps. Priorities are not assigned because no risk-ranking evidence is provided.

| ID | Title | Preconditions | Test Steps | Expected Result | Priority | Type | Source |
|---|---|---|---|---|---|---|---|
| TC001 | Attempt sign-in with valid customer credentials | User is an existing customer. Whether a usable test account and valid credentials are available: Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Functional | Gap |
| TC002 | Attempt sign-in with credentials that do not match an account | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC003 | Attempt sign-in again after an unsuccessful attempt | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Functional | Gap |
| TC004 | Access the login page using a desktop browser | User accesses web browsers on desktop. | 1. Open the login page in a desktop browser. (Inference (low confidence)) | Insufficient information to determine. | Insufficient information to determine. | UI | Gap |
| TC005 | Access the login page using a mobile browser | User accesses web browsers on mobile. | 1. Open the login page in a mobile browser. (Inference (low confidence)) | Insufficient information to determine. | Insufficient information to determine. | UI | Gap |
| TC006 | Attempt sign-in with empty input | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Attempt the empty-input scenario. The input field and submission action are: Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC007 | Attempt sign-in using an invalid input format | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Attempt the invalid-format scenario. The field and invalid format are: Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC008 | Attempt sign-in at the lower input boundary | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Attempt an input at its lower boundary. The input field and boundary value are: Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC009 | Attempt sign-in at the upper input boundary | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Attempt an input at its upper boundary. The input field and boundary value are: Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC010 | Attempt sign-in using whitespace-only input | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Attempt the whitespace-only input scenario. The input field and submission action are: Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Negative | Gap |
| TC011 | Assess handling of sensitive sign-in data | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Security | Gap |
| TC012 | Assess protection of sign-in data during submission | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Security | Gap |
| TC013 | Assess security behavior after repeated sign-in attempts | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Security | Gap |
| TC014 | Assess security of the authenticated session | Insufficient information to determine. | 1. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Security | Gap |
| TC015 | Inspect login-page content and layout on desktop | User accesses web browsers on desktop. | 1. Open the login page in a desktop browser. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | UI | Gap |
| TC016 | Inspect login-page content and layout on mobile | User accesses web browsers on mobile. | 1. Open the login page in a mobile browser. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | UI | Gap |
| TC017 | Assess whether the sign-in flow is understandable | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Usability | Gap |
| TC018 | Assess whether a user can complete sign-in using available interactions | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Usability | Gap |
| TC019 | Assess whether unsuccessful sign-in feedback is understandable | Insufficient information to determine. | 1. Open the login page. (Inference (low confidence))<br>2. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Usability | Gap |
| TC020 | Assess usability in desktop and mobile browser contexts | User accesses web browsers on desktop and mobile. | 1. Open the login page in a desktop browser. (Inference (low confidence))<br>2. Open the login page in a mobile browser. (Inference (low confidence))<br>3. Insufficient information to determine. | Insufficient information to determine. | Insufficient information to determine. | Usability | Gap |

Count per type: Functional — 2; Negative — 6; Security — 4; UI — 4; Usability — 4. Total — 20.

## Missing / Unknown Information

| Gap ID | Missing detail | Test cases affected |
|---|---|---|
| G01 | Login page controls, input fields, and submission action | TC001–TC003, TC006–TC013, TC015–TC019 |
| G02 | Test account availability and what credentials count as valid or invalid | TC001–TC003 |
| G03 | Input formats, validation rules, and lower/upper boundary values | TC006–TC010 |
| G04 | Authentication outcomes and unsuccessful-attempt behavior | TC001–TC003, TC006–TC010, TC013, TC019 |
| G05 | Security requirements for sensitive data, submission, repeated attempts, and sessions | TC011–TC014 |
| G06 | Expected page content, layout, and presentation on desktop and mobile | TC004–TC005, TC015–TC016, TC020 |
| G07 | Usability requirements and expected interaction or feedback | TC017–TC020 |
| G08 | Supported browsers and viewport/device criteria | TC004–TC005, TC015–TC016, TC020 |
| G09 | Business-risk criteria for assigning priority | TC001–TC020 |

Total number of distinct gap categories: 9.

## Self-Validation Check

- Every test case has a Source value. Inferred page-opening steps are explicitly labeled `Inference (low confidence)`; unsupported requirements and results are marked `Gap`.
- Test cases whose expected result is a gap: TC001–TC020.
- Contradictions found: none found.
- No live page was browsed, and the format-only example was not treated as evidence.
