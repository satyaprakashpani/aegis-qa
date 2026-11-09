import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  retries: 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: 'https://app.wingify.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
  ],
});
