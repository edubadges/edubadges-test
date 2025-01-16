import { test as base } from '@playwright/test';
import { EdubadgesPage } from '../pages/loginPage';

type MyFixtures = {
  loginPage: EdubadgesPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new EdubadgesPage(page);
    await loginPage.navigateToLoginPage();

    // Use the fixture value in the test.
    await use(loginPage);

    // Clean up the fixture.
  },
});
export { expect } from '@playwright/test';
