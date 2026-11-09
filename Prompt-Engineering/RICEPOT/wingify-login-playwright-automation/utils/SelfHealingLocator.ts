import { Locator, Page, test } from '@playwright/test';

export type HealMode = 'tolerant' | 'strict';

export interface HealCandidate {
  strategy: string;
  locator: Locator;
}

export class SelfHealingLocator {
  private readonly page: Page;
  private readonly elementName: string;
  private readonly healMode: HealMode;

  constructor(page: Page, elementName: string, healMode: HealMode = (process.env.HEAL_MODE as HealMode) || 'tolerant') {
    this.page = page;
    this.elementName = elementName;
    this.healMode = healMode;
  }

  async resolve(): Promise<Locator> {
    const candidates = this.getCandidates();
    const attempts: string[] = [];

    for (const [index, candidate] of candidates.entries()) {
      const locator = candidate.locator;
      const failedStrategies = [...attempts];
      attempts.push(candidate.strategy);
      try {
        await locator.waitFor({ state: 'visible' });
      } catch {
        continue;
      }
      const count = await locator.count();
      if (count === 1) {
        if (index > 0) {
          await this.attachHealResult('resolved', failedStrategies, candidate.strategy);
          if (this.healMode === 'strict') {
            throw new Error(`${this.elementName} required locator healing in strict mode`);
          }
        }
        return locator;
      }
    }

    const failedStrategies = attempts.join(', ');
    const message = `${this.elementName} could not be located with the allowed strategies: ${failedStrategies}`;
    await this.attachHealResult('failed', attempts, 'none');
    throw new Error(message);
  }

  private getCandidates(): HealCandidate[] {
    const map: Record<string, HealCandidate[]> = {
      logo: [
        { strategy: 'id=vow-login-logo', locator: this.page.locator('#vow-login-logo') },
        { strategy: 'img[alt="Wingify"]', locator: this.page.locator('img[alt="Wingify"]') },
        { strategy: 'img[src="assets/images/wingify.svg"]', locator: this.page.locator('img[src="assets/images/wingify.svg"]') },
      ],
      username: [
        { strategy: 'id=login-username', locator: this.page.locator('#login-username') },
        { strategy: 'input[type="email"][name="username"]', locator: this.page.locator('input[type="email"][name="username"]') },
        { strategy: 'input[placeholder="Enter email ID"]', locator: this.page.locator('input[placeholder="Enter email ID"]') },
      ],
      password: [
        { strategy: 'id=login-password', locator: this.page.locator('#login-password') },
        { strategy: 'input[type="password"][name="password"]', locator: this.page.locator('input[type="password"][name="password"]') },
        { strategy: 'input[placeholder="Enter password"]', locator: this.page.locator('input[placeholder="Enter password"]') },
      ],
      signin: [
        { strategy: 'id=js-login-btn', locator: this.page.locator('#js-login-btn') },
        { strategy: 'button[type="submit"]', locator: this.page.locator('button[type="submit"]') },
        { strategy: 'button:has-text("Sign in")', locator: this.page.getByRole('button', { name: 'Sign in' }).or(this.page.locator('button:has-text("Sign in")')) },
      ],
      errorMessage: [
        { strategy: 'id=js-notification-box-msg', locator: this.page.locator('#js-notification-box-msg') },
        { strategy: 'class=notification-box-description', locator: this.page.locator('.notification-box-description') },
      ],
    };

    const candidates = map[this.elementName];
    if (!candidates) {
      throw new Error(`Unknown self-healing element: ${this.elementName}`);
    }
    return candidates;
  }

  private async attachHealResult(status: 'resolved' | 'failed', attempts: string[], strategyUsed: string): Promise<void> {
    const details = {
      element: this.elementName,
      status,
      failedStrategies: attempts,
      strategyUsed,
      mode: this.healMode,
    };
    const description = JSON.stringify(details);
    test.info().annotations.push({ type: 'Self-healing locator', description });
    await test.info().attach(`${this.elementName}-heal-status`, {
      body: JSON.stringify(details, null, 2),
      contentType: 'application/json',
    });
  }
}
