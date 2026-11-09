import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Wingify Login Page', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page: browserPage }) => {
    page = browserPage;
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Logo and login fields are visible and correctly configured', async () => {
    try {
      await loginPage.verifyLogo();
      await loginPage.verifyUsername();
      await loginPage.verifyPassword();
      await loginPage.verifySignInButton();
    } catch (error) {
      await page.screenshot({ path: 'test-results/failed-login-page.png', fullPage: true });
      throw error;
    }
  });

  test('Input handling retains typed values', async () => {
    try {
      await loginPage.acceptInputHandling();
    } catch (error) {
      await page.screenshot({ path: 'test-results/failed-input-handling.png', fullPage: true });
      throw error;
    }
  });

  test('Valid login redirects to the configured post-login URL', async () => {
    const email = process.env.VWO_EMAIL?.trim();
    const password = process.env.VWO_PASSWORD?.trim();
    const postLoginUrlPattern = process.env.VWO_POST_LOGIN_URL_PATTERN?.trim();

    if (!email || !password || !postLoginUrlPattern) {
      test.skip(true, 'VWO_EMAIL, VWO_PASSWORD, and VWO_POST_LOGIN_URL_PATTERN are required');
      return;
    }

    try {
      await loginPage.login(email, password);
      await test.step('Verify post-login URL', async () => {
        await expect(page).toHaveURL(new RegExp(postLoginUrlPattern));
      });
    } catch (error) {
      await page.screenshot({ path: 'test-results/failed-valid-login.png', fullPage: true });
      throw error;
    }
  });

  test('Invalid login displays the configured error message', async () => {
    const email = process.env.INVALID_EMAIL?.trim();
    const password = process.env.INVALID_PASSWORD?.trim();

    if (!email || !password) {
      test.skip(true, 'INVALID_EMAIL and INVALID_PASSWORD are required');
      return;
    }

    try {
      await loginPage.login(email, password);
      await test.step('Verify invalid-login error message', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        expect(await loginPage.getErrorText()).toBe(
          'Your email, password, IP address or location did not match',
        );
        await expect(page).toHaveURL(/#\/login/);
      });
    } catch (error) {
      await page.screenshot({ path: 'test-results/failed-invalid-login.png', fullPage: true });
      throw error;
    }
  });
});
