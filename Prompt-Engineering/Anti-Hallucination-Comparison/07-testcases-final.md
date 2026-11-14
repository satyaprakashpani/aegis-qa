# VWO Login Page Test Cases

Date: 2026-11-14

## Verified Facts

1. The page is identified as the VWO login page at `https://app.vwo.com/#/login`; the URL is a label, not evidence beyond the observations provided.
2. The observation context is Chrome on desktop on 2026-11-14.
3. The observed heading is "Sign in to Wingify platform", and a Wingify logo appears above the form.
4. The observed email field has label "Email address" and placeholder "Enter email ID".
5. The observed password field has label "Password" and placeholder "Enter password".
6. An eye icon is present at the right end of the password field; its toggle behavior was not verified.
7. "Forgot Password?" appears below the password field.
8. "Remember me" appears as a checkbox, unchecked by default.
9. The primary button is labelled "Sign in".
10. A divider labelled "Or" and buttons labelled "Sign in with Google", "Sign in using SSO", and "Sign in with Passkey" are present.
11. "Don't have an account?" and the link "Start a free trial" appear below the sign-in options.
12. The legal text reads "By continuing, you agree to Wingify's Privacy policy & Terms." Privacy policy and Terms are links.
13. Tester-reported wrong credentials, empty email, empty password, both fields empty, and malformed email each show: "Your email, password, IP address or location did not match".
14. The test account has no 2FA, SSO, or CAPTCHA. Credentials are not included.
15. Chrome on desktop is the browser scope. High priority is for authentication and security; Medium is for input validation and error handling; Low is for cosmetic and layout concerns.
16. Details not stated in the supplied information remain unknown; scenarios may use standard test design techniques, but unsupported expected results must be marked as gaps.

## Test Cases

| ID | Title | Preconditions | Test Steps | Expected Result | Priority | Type | Source |
|---|---|---|---|---|---|---|---|
| TC001 | Sign in with valid credentials | The test account has no 2FA, SSO, or CAPTCHA. Its credentials are not provided. | 1. Open the login page. (Inference (low confidence))<br>2. Enter the test account's email and password. (Credentials: Insufficient information to determine.)<br>3. Select "Sign in". | Insufficient information to determine. | High | Functional | Gap |
| TC002 | Activate the password visibility control | The login page is open. The eye icon is present. | 1. Enter a password.<br>2. Select the eye icon. | Insufficient information to determine. | Low | Functional | Gap |
| TC003 | Follow the password recovery link | The login page is open. | 1. Select "Forgot Password?". | Insufficient information to determine. | Medium | Functional | Gap |
| TC004 | Use Google sign-in | The login page is open. | 1. Select "Sign in with Google". | Insufficient information to determine. | High | Functional | Gap |
| TC005 | Use SSO sign-in | The login page is open. The test account has no SSO. | 1. Select "Sign in using SSO". | Insufficient information to determine. | High | Functional | Gap |
| TC006 | Use passkey sign-in | The login page is open. | 1. Select "Sign in with Passkey". | Insufficient information to determine. | High | Functional | Gap |
| TC007 | Follow the free-trial link | The login page is open. | 1. Select "Start a free trial". | Insufficient information to determine. | Low | Functional | Gap |
| TC008 | Change the Remember me checkbox state | The login page is open. The checkbox is unchecked by default. | 1. Select "Remember me". | Insufficient information to determine. | Medium | Functional | Gap |
| TC009 | Submit incorrect credentials | The login page is open. Made-up email and password values are available. | 1. Enter a made-up email and password.<br>2. Select "Sign in". | The message "Your email, password, IP address or location did not match" is shown. | High | Negative | Provided Information |
| TC010 | Submit with an empty email | The login page is open. | 1. Leave the email field empty.<br>2. Enter a password.<br>3. Select "Sign in". | The message "Your email, password, IP address or location did not match" is shown. | Medium | Negative | Provided Information |
| TC011 | Submit with an empty password | The login page is open. | 1. Enter an email address.<br>2. Leave the password field empty.<br>3. Select "Sign in". | The message "Your email, password, IP address or location did not match" is shown. | Medium | Negative | Provided Information |
| TC012 | Submit with both fields empty | The login page is open. | 1. Leave the email and password fields empty.<br>2. Select "Sign in". | The message "Your email, password, IP address or location did not match" is shown. | Medium | Negative | Provided Information |
| TC013 | Submit a malformed email address | The login page is open. | 1. Enter a malformed email address.<br>2. Enter a password.<br>3. Select "Sign in". | The message "Your email, password, IP address or location did not match" is shown. | Medium | Negative | Provided Information |
| TC014 | Check input behavior at a boundary | The login page is open. Input boundary values are not provided. | 1. Enter an email or password at a boundary value. The field and boundary value are: Insufficient information to determine.<br>2. Select "Sign in". | Insufficient information to determine. | Medium | Negative | Gap |
| TC015 | Check the password field's default visibility | The login page is open. | 1. Enter a password.<br>2. Observe how the entered value is displayed. | Insufficient information to determine. | High | Security | Gap |
| TC016 | Check the credential submission transport | The login page is open. The test account credentials are not provided. | 1. Submit credentials. (Credentials: Insufficient information to determine.)<br>2. Inspect the transport used for submission. | Insufficient information to determine. | High | Security | Gap |
| TC017 | Check behavior after repeated unsuccessful attempts | The login page is open. | 1. Submit incorrect credentials repeatedly.<br>2. Observe the response to the attempts. | Insufficient information to determine. | High | Security | Gap |
| TC018 | Verify the observed page heading and logo | The login page is open in Chrome on desktop. | 1. Observe the heading and the area above the form. | The heading reads "Sign in to Wingify platform"; the Wingify logo is above the form. | Low | UI | Provided Information |
| TC019 | Verify the email field label and placeholder | The login page is open in Chrome on desktop. | 1. Observe the email field's label and placeholder. | The label is "Email address" and the placeholder is "Enter email ID". | Low | UI | Provided Information |
| TC020 | Verify the password field label and placeholder | The login page is open in Chrome on desktop. | 1. Observe the password field's label and placeholder. | The label is "Password" and the placeholder is "Enter password". | Low | UI | Provided Information |
| TC021 | Verify the default Remember me state | The login page is open in Chrome on desktop. | 1. Observe the "Remember me" checkbox before interacting with it. | The checkbox is labelled "Remember me" and is unchecked by default. | Low | UI | Provided Information |
| TC022 | Verify the primary sign-in and alternative sign-in controls | The login page is open in Chrome on desktop. | 1. Observe the primary button, divider, and alternative sign-in controls. | The primary button reads "Sign in"; the divider reads "Or"; the alternative buttons read "Sign in with Google", "Sign in using SSO", and "Sign in with Passkey". | Low | UI | Provided Information |
| TC023 | Verify the sign-up and legal text | The login page is open in Chrome on desktop. | 1. Observe the sign-up text, legal text, and links. | The page shows "Don't have an account?" and "Start a free trial"; the legal text reads "By continuing, you agree to Wingify's Privacy policy & Terms." and includes Privacy policy and Terms links. | Low | UI | Provided Information |
| TC024 | Navigate the sign-in page using a keyboard | The login page is open in Chrome on desktop. | 1. Navigate through the page controls using the keyboard. | Insufficient information to determine. | Medium | Usability | Gap |
| TC025 | Check whether unsuccessful sign-in feedback is consistent | The login page is open. | 1. Submit each of these scenarios: incorrect credentials, empty email, empty password, both fields empty, and malformed email.<br>2. Compare the displayed messages. | Each scenario displays "Your email, password, IP address or location did not match". | Medium | Usability | Provided Information |

Count per type: Functional — 8; Negative — 6; Security — 3; UI — 6; Usability — 2. Total — 25.

## Missing / Unknown Information

| Gap ID | Missing detail | Test cases affected |
|---|---|---|
| G01 | Usable test credentials and the successful sign-in result or destination | TC001 |
| G02 | Whether the eye icon toggles password visibility and the password field's default display behavior | TC002, TC015 |
| G03 | Destination and result of selecting "Forgot Password?" | TC003 |
| G04 | Result of Google sign-in | TC004 |
| G05 | Result of SSO sign-in; the supplied test account has no SSO | TC005 |
| G06 | Result of passkey sign-in | TC006 |
| G07 | Destination and result of "Start a free trial" | TC007 |
| G08 | Whether selecting "Remember me" changes state or affects later sign-ins | TC008 |
| G09 | Input fields' boundary values and expected behavior at those boundaries | TC014 |
| G10 | Security requirements and verifiable transport behavior for credential submission | TC016 |
| G11 | Behavior or controls after repeated unsuccessful attempts | TC017 |
| G12 | Keyboard navigation order and expected keyboard interaction | TC024 |

Total number of gaps: 12.

## Self-Validation Check

- Every test case has a Source value. Observed UI details and tester-reported outcomes are attributed to "Provided Information"; missing expected behavior is explicitly marked "Gap". The page-opening action is the only low-confidence inference.
- Test cases whose expected result is a gap: TC001–TC008, TC014–TC017, and TC024.
- Contradictions found: none found. The test account's lack of SSO is recorded without assuming how the SSO option behaves for other accounts.
- No live page was browsed; no credentials or behavior beyond the supplied information were assumed.
