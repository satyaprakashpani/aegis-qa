# VWO Regression Suite Optimization Report

**Run analyzed:** 22 October 2026, starting at 05:15:00 UTC  
**Source:** `skill-Basics/logs/vwo_regression_run.log`  
**Scope:** One Playwright regression run; 18 tests, 18 test files, Chromium/Firefox/WebKit, 4 workers.

## 1. Executive Summary

- **Total Tests Analyzed:** 18
- **Average Execution Duration:** Approximately 10.69 seconds per test when dividing the 192.45-second suite wall-clock duration by 18. This is only a rough allocation: tests ran in parallel, so the log does not provide a true mean per-test execution time.
- **Flakiness Rate:** 5.56% (1 of 18 tests was marked flaky; it failed once and passed on retry).
- **Optimization Recommendations Overview:** Replace the hardcoded 10-second sleep in password-reset testing with condition-based polling; stabilize the SSO locator and wait for the redirect state; reconcile the rate-limit test's expected 429 with the configured endpoint policy; address the 2.85-second full-load measurement against the 2-second target; and consolidate the explicitly duplicated invalid-password assertion. Keep the independent authentication and validation coverage.

### Run snapshot

| Result | Count | Notes |
|---|---:|---|
| Passed | 16 | As reported in the suite summary. |
| Failed | 1 | `security/rate_limiting.spec.ts`. |
| Flaky | 1 | `auth/sso_login.spec.ts`; passed on attempt 2 of 3. |
| Suite duration | 192.45 seconds | 3 minutes 12 seconds, parallel run on 4 workers. |

The suite summary categories add up to 18. The SSO test is called flaky separately because its first attempt failed and a retry passed; interpret the counts using the runner's classifications rather than treating retry attempts as additional tests.

## 2. Flaky Test Diagnostic Report

| Test Name / File | Failure Signature | Probable Root Cause | Recommended Code Fix |
|---|---|---|---|
| `auth/sso_login.spec.ts` — `TC-AUTH-006: SAML Enterprise SSO redirect and callback` | Attempt 1 timed out after 30 seconds while clicking `//div[@id="root"]/div[2]/form/div[3]/button[2]`; the locator resolved to a loading button that was hidden or detached. Attempt 2 passed in 4.8 seconds. | The positional XPath is coupled to the current DOM structure, and the target appears to transition while the click is being attempted. | Prefer a stable user-facing locator (for example, a role and accessible name) over positional XPath. Wait for the intended SSO button to be visible and enabled before clicking, then wait for the expected redirect/callback state. Avoid retry-only masking of a locator race. |

### Slow test and timing diagnostic

| Test Name / File | Evidence | Recommended Code Fix |
|---|---|---|
| `auth/password_reset.spec.ts` — `TC-REC-001: Request password reset email` | Takes 14.2 seconds and includes a hardcoded `page.waitForTimeout(10000)` before checking the inbox API. | Replace the fixed sleep with bounded polling or a condition-based wait for the expected reset email/message. Preserve a clear timeout failure that explains which condition was not met. |

## 3. Redundancy & Overlap Analysis

| Overlapping Tests | Shared Assertion / Coverage | Action Recommended |
|---|---|---|
| `auth/login_duplicate_checks.spec.ts` — `TC-VAL-005` and `tests/auth/login_validation.spec.ts` line 45 | The assertion for `text="Invalid credentials"` is explicitly reported as already verified in the validation spec. | Keep one canonical assertion. Prefer retaining it with the primary login-validation coverage and remove or merge only the duplicate assertion from `login_duplicate_checks.spec.ts`. Preserve any distinct setup, input, or behavioral coverage in that test. |
| Two duplicate assertion blocks across auth specs (suite summary) | The log reports two duplicate blocks but provides concrete detail for only the invalid-credentials assertion above. | Review the auth-spec overlap report or source before removing anything else. The second duplicate is not identifiable from this log alone; do not prune it based on a guess. |

## 4. Optimized Execution Strategy

- **Smoke Suite Tag:** `@smoke` — prioritize the critical login path: valid login, invalid credentials/required-field validation, remember-me behavior, and a basic keyboard-navigation check. The skill's under-3-minute target is a goal to verify in CI; this run log does not provide a measured smoke-only duration.
- **Full Regression Tag:** `@regression` — retain the full functional, recovery, SSO, security, accessibility, and performance coverage. Continue parallel execution, and consider splitting work into deterministic CI chunks by browser or spec group while ensuring every supported browser receives its required coverage.
- **Execution prioritization:** Run smoke checks before deep regression. Run failure-prone or configuration-dependent SSO, rate-limit, and performance checks with their required test-environment configuration and diagnostics. No code diff was provided, so change-based risk selection cannot be derived from this log.
- **Pruned / Deprecated Tests:** Consolidate the duplicate invalid-credentials assertion in `TC-VAL-005`. Do not remove the whole spec unless review confirms it has no unique coverage. No other obsolete test can be identified from this run.
- **Parallelism:** The suite already uses 4 workers. This log alone does not establish whether increasing worker count would improve wall-clock time; measure CI resource utilization and repeat-run duration before changing the worker count.

### Failure requiring triage

`security/rate_limiting.spec.ts` expected HTTP `429 Too Many Requests` on the tenth failed login attempt, but received `200 OK`; the response reported `x-ratelimit-remaining: 15`.

This is an expectation/configuration mismatch in the observed run, but the log alone cannot establish whether the test threshold is wrong, the environment uses a different rate-limit policy, or rate limiting is not functioning as required. Confirm the intended threshold and test environment configuration. Then either align the test with the documented policy or fix the implementation if it is supposed to reject/throttle at this point. Keep the test as a security check until the discrepancy is resolved; do not mark it as passed or lower its expectation without evidence.

### Performance follow-up

`performance/page_load.spec.ts` measured **DOMContentLoaded at 1.2 seconds** and **full load at 2.85 seconds**, exceeding the PRD's **under-2-second login-page load** target for the reported full-load measure. Confirm the product's agreed measurement definition and standard-connection conditions, then profile page assets and delivery (the PRD calls out compression, minification, and CDN usage). Track the 2-second target using a consistent measurement; do not substitute the faster DOMContentLoaded result for full load unless that is the agreed acceptance metric.

## Evidence and limitations

- The analysis reflects a single execution log and cannot establish a trend or an intermittent-failure rate across runs.
- The reported flakiness rate is the share of tests explicitly marked flaky in this run, not a multi-run statistical flake rate.
- The log includes one specific duplicate assertion and a summary count of two duplicate blocks; it does not identify the second block.
- No source code, test inventory beyond this run, environment configuration, CI resource data, or recent git diff was provided. Root causes beyond the observed signatures are therefore hypotheses to validate.
- The PRD or environment policy needed to resolve the rate-limit threshold, browser/runtime versions, and performance measurement conditions is not included in this log.
