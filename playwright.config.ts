import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: false,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 1 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : 2,

  // Reporter to use
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results.xml' }],
  ],
  timeout: 2 * 60 * 1000, // 2 minutes

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.BASE_URL,

    // Collect trace when retrying the failed test.
    trace: 'on',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    } /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },*/,
  ],
});
