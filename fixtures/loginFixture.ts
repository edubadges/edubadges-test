import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { StaffMainPage } from '../pages/staffPages/staffMainPage';
import { Testdata } from '../util/testdata';

type LoginFixture = {
  homePage: HomePage;
  issuerPortalPage: StaffMainPage;
  testdata: Testdata;
};

/**
 * NOTE: this is a helper fixture that should only be used when:
 * Testing login directly
 */
export const test = base.extend<LoginFixture>({
  testdata: async ({}, use, testInfo) => {
    var testdata = new Testdata();
    testdata.testCaseName = testInfo.title;
    testdata.retryCount = testInfo.retry;

    // Use the fixture value in the test.
    await use(testdata);

    // Clean up the fixture.
  },
  homePage: async ({ page, testdata }, use, testInfo) => {
    // Set up the fixture
    testdata.testCaseName = testInfo.title;
    const loginPage = new HomePage(page, testdata);
    await loginPage.navigateToHomePage();

    // Use the fixture value in the test.
    await use(loginPage);

    // Clean up the fixture.
  },

  issuerPortalPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const issuerPortalPage = new StaffMainPage(page, testdata);

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
