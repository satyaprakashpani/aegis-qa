# Wingify Login: Playwright + TypeScript (RICEPOT Prompt)

# R: Role
You are a QA automation engineer with 15 years of experience in SaaS and B2B testing, with deep knowledge of Wingify (VWO) products and terminology. You write production-grade Playwright with TypeScript code following enterprise standards.

# I: Instructions
Create a runnable Playwright + TypeScript project that tests the login page https://app.wingify.com/#/login. Scope is limited to what the reference file documents: the logo, username field, password field, and Sign in button.

## Reference inputs (Mandatory, read first)
- Read `Prompt-Engineering/RICEPOT/reference/LoginPageElementReference.md` before writing any code.
- The reference file contains raw HTML for four elements: Logo, UserName, Password, Signin Button.
- Take every locator and every asserted value only from that HTML.
- Anything not present in the reference file (remember-me, error messages, post-login page, validation messages, test credentials) is unknown. Do not write locators, assertions, or tests for it. Report it under "Missing inputs".

## Project location (Mandatory)
- Create the project inside `Prompt-Engineering/RICEPOT/wingify-login-playwright-automation/`.
- Never create any .ts file directly under `Prompt-Engineering/RICEPOT/`.
- Required structure:

```
Prompt-Engineering/RICEPOT/wingify-login-playwright-automation/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── .env.example
├── .gitignore
├── pages/LoginPage.ts
├── utils/SelfHealingLocator.ts
└── tests/login.spec.ts
```

## Existing files check (Mandatory, do this before creating anything)
1. Scan the project folder for existing .ts and config files.
2. Review each existing file against every rule in this prompt: locator strategy, no comments, no waitForTimeout, POM structure, try/catch with rethrow, Allure, hooks, self-healing, strict-mode compilation, correct imports, and no scenarios outside the reference scope.
3. Correct file: leave unchanged and report "OK".
4. File needing changes: apply minimal edits and report one line per change. Never overwrite blindly.
5. Create only the files that are missing.

## Coding rules
- [Critical] Use Playwright hooks: test.describe, test.beforeEach, test.afterEach, test().
- [Critical] Use structured try/catch in Page Object methods and in tests. Always rethrow after capturing context so failures are never swallowed.
- [Mandatory] Page Object Model: a TypeScript class with `readonly page: Page`, readonly locator properties initialised in the constructor, and reusable action methods (navigate, enter email, enter password, click Sign in, plus getters needed by tests). No PageFactory or @FindBy.
- [Mandatory] Allure: `allure-playwright` in the reporter config, `test.step` for key actions, screenshot attached on failure.
- [Don't] No comments in code. No `page.waitForTimeout()`. No hardcoded sleeps. Use Playwright auto-waiting and web-first assertions such as `expect(locator).toBeVisible()`.

## Locator strategy (Mandatory)
- Follow Playwright best practice. Preference order:
  1. User-facing locators (getByRole, getByLabel) where the text is stable
  2. getByTestId, only if the test-id attribute is confirmed stable
  3. Stable id or attribute based locators
  4. XPath, last resort only, never absolute or index-based
- `data-qa` values in the reference HTML look auto-generated. Do not use them.
- Text-based locators (placeholder, button text, alt) depend on the UI language because the app uses `vwo-html-translate`. Use them only as fallbacks.
- Keep all locators inside the Page Object.

## Self-healing locators (Mandatory)
- Implement `utils/SelfHealingLocator.ts` with an ordered list of locator candidates per element.
- Build candidates only from attributes that exist in the reference HTML, in this order:
  1. `id`
  2. Tag with `type` and `name` (or tag with `type` for the button)
  3. Language-dependent attributes (placeholder, visible text, alt, src), labelled "Inference (low confidence)" in the status section
- Per element, the permitted source attributes are:
  - Logo: `id="vow-login-logo"`, `alt="Wingify"`, `src="assets/images/wingify.svg"`
  - UserName: `id="login-username"`, `type="email"` with `name="username"`, `placeholder="Enter email ID"`
  - Password: `id="login-password"`, `type="password"` with `name="password"`, `placeholder="Enter password"`
  - Signin Button: `id="js-login-btn"`, `type="submit"`, visible text `Sign in`
- Accept a candidate only if it resolves to exactly one element.
- Heal locators only. Never heal assertions, URLs, or expected text.
- Report every heal as an Allure annotation and an attachment (element name, failed strategies, strategy used).
- Support `HEAL_MODE=tolerant|strict` from environment variables. Default is tolerant. In strict mode a heal fails the test.
- Never use AI or network calls at runtime to generate locators.
- Timeouts come from constants or `playwright.config.ts`, never inline magic numbers.

## Test scenarios (limited to the reference scope)
UI verification:
- Logo is visible, has `alt` equal to `Wingify`
- Username field is visible, has `type` equal to `email`, placeholder equals `Enter email ID`
- Password field is visible, has `type` equal to `password` (masked), placeholder equals `Enter password`
- Sign in button is visible, has `type` equal to `submit`, text equals `Sign in`

Input handling:
- Username field accepts typed input and retains the value
- Password field accepts typed input and retains the value, and remains `type="password"`
- Synthetic, non-credential sample values may be used for these checks. Do not submit the form.

Not generated, because the reference file gives no expected outcome:
- Successful login, remember-me, wrong password, unregistered email, empty fields, malformed email, or any behavior after clicking Sign in

# C: Context
- Application: Wingify (VWO) login page, hash-routed SPA at https://app.wingify.com/#/login.
- Environment: Node 18+, latest stable Playwright, Chromium (Firefox and WebKit also configured).
- Hash routing: navigate with `page.goto('/#/login')` against the configured baseURL.
- The login page may rate-limit or show CAPTCHA after repeated submissions. The current scope never submits the form.

# E: Example
Structure only. Do not reuse its selectors.

```typescript
import { Page, Locator } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly field: Locator;

  constructor(page: Page) {
    this.page = page;
    this.field = page.locator('#example-field');
  }

  async enterValue(value: string): Promise<void> {
    try {
      await this.field.fill(value);
    } catch (error) {
      throw error;
    }
  }
}
```

# P: Parameters
- Production-grade, near-zero bad practices, strict TypeScript.
- `playwright.config.ts`: testDir `./tests`, baseURL `https://app.wingify.com`, reporters `list` and `allure-playwright`, retries 1, trace `retain-on-failure`, screenshot `only-on-failure`, explicit timeouts, projects for chromium, firefox, webkit.
- `package.json` scripts: `test`, `test:headed`, `test:strict`, `report:generate`, `report:open`.
- Dependencies: @playwright/test, allure-playwright, allure-commandline, dotenv, typescript, @types/node.
- `tsconfig.json` with `strict: true`.
- `.env.example` key: `HEAL_MODE`. Credentials are not required at this scope.
- `.gitignore`: node_modules, test-results, playwright-report, allure-results, allure-report, .env.
- If a required input is missing, do not invent it. Skip that scenario and list it.

# O: Output
1. Project tree (paths only).
2. One status line per pre-existing file: OK, or modified with the reason.
3. Each file as a separate code block with its relative path as the heading.
4. "Missing inputs" list.
5. Text outside code blocks is limited to items 1, 2, and 4. Code contains no comments.

# T: Tone
Technical, precise, enterprise-grade.

# Safety / Anti-hallucination
- Do not invent IDs, selectors, error messages, APIs, or behavior.
- Every assertion must trace to an attribute or text in the reference HTML.
- Missing information: reply exactly "Insufficient information to determine." followed by the missing items.
- Any inferred detail: label it exactly "Inference (low confidence)" in the status section, never inside code.
- Generated code must be deterministic: the same reference file produces the same code.