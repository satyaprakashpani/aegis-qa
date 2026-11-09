import { Page, Locator, expect, test } from '@playwright/test';
import { SelfHealingLocator } from '../utils/SelfHealingLocator';

export class LoginPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#vow-login-logo');
    this.username = page.locator('#login-username');
    this.password = page.locator('#login-password');
    this.signInButton = page.locator('#js-login-btn');
    this.errorMessage = page.locator('#js-notification-box-msg');
  }

  async navigate(): Promise<void> {
    try {
      await this.page.goto('/#/login');
      await expect(this.page).toHaveURL(/\/\#\/login$/);
      await expect(this.logo).toBeVisible();
      await expect(this.username).toBeVisible();
      await expect(this.password).toBeVisible();
      await expect(this.signInButton).toBeVisible();
    } catch (error) {
      throw error;
    }
  }

  async enterUsername(value: string): Promise<void> {
    try {
      await this.username.fill(value);
    } catch (error) {
      throw error;
    }
  }

  async enterPassword(value: string): Promise<void> {
    try {
      await this.password.fill(value);
    } catch (error) {
      throw error;
    }
  }

  async clickSignIn(): Promise<void> {
    try {
      await this.signInButton.click();
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await test.step('Enter email', async () => {
        await this.enterUsername(email);
      });
      await test.step('Enter password', async () => {
        await this.enterPassword(password);
      });
      await test.step('Click Sign in', async () => {
        await this.clickSignIn();
      });
    } catch (error) {
      throw error;
    }
  }

  async getLogo(): Promise<Locator> {
    try {
      return new SelfHealingLocator(this.page, 'logo').resolve();
    } catch (error) {
      throw error;
    }
  }

  async getUsernameField(): Promise<Locator> {
    try {
      return new SelfHealingLocator(this.page, 'username').resolve();
    } catch (error) {
      throw error;
    }
  }

  async getPasswordField(): Promise<Locator> {
    try {
      return new SelfHealingLocator(this.page, 'password').resolve();
    } catch (error) {
      throw error;
    }
  }

  async getSignInButton(): Promise<Locator> {
    try {
      return new SelfHealingLocator(this.page, 'signin').resolve();
    } catch (error) {
      throw error;
    }
  }

  async getErrorMessage(): Promise<Locator> {
    try {
      return new SelfHealingLocator(this.page, 'errorMessage').resolve();
    } catch (error) {
      throw error;
    }
  }

  async getErrorText(): Promise<string> {
    try {
      const errorMessage = await this.getErrorMessage();
      return await errorMessage.innerText();
    } catch (error) {
      throw error;
    }
  }

  async verifyLogo(): Promise<void> {
    try {
      const logo = await this.getLogo();
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('alt', 'Wingify');
      await test.step('Verify logo', async () => {
        await expect(logo).toBeVisible();
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyUsername(): Promise<void> {
    try {
      const username = await this.getUsernameField();
      await expect(username).toBeVisible();
      await expect(username).toHaveAttribute('type', 'email');
      await expect(username).toHaveAttribute('placeholder', 'Enter email ID');
      await test.step('Verify username field', async () => {
        await expect(username).toBeVisible();
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyPassword(): Promise<void> {
    try {
      const password = await this.getPasswordField();
      await expect(password).toBeVisible();
      await expect(password).toHaveAttribute('type', 'password');
      await expect(password).toHaveAttribute('placeholder', 'Enter password');
      await test.step('Verify password field', async () => {
        await expect(password).toBeVisible();
      });
    } catch (error) {
      throw error;
    }
  }

  async verifySignInButton(): Promise<void> {
    try {
      const signInButton = await this.getSignInButton();
      await expect(signInButton).toBeVisible();
      await expect(signInButton).toHaveAttribute('type', 'submit');
      await expect(signInButton).toHaveText('Sign in');
      await test.step('Verify sign in button', async () => {
        await expect(signInButton).toBeVisible();
      });
    } catch (error) {
      throw error;
    }
  }

  async acceptInputHandling(): Promise<void> {
    try {
      const username = await this.getUsernameField();
      const password = await this.getPasswordField();
      const sampleUser = 'test.user@example.com';
      const samplePassword = 'SamplePassword123';
      await username.fill(sampleUser);
      await expect(username).toHaveValue(sampleUser);
      await password.fill(samplePassword);
      await expect(password).toHaveValue(samplePassword);
      await expect(password).toHaveAttribute('type', 'password');
      await test.step('Input handling', async () => {
        await expect(username).toHaveValue(sampleUser);
      });
    } catch (error) {
      throw error;
    }
  }
}
