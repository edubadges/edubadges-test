import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { StaffControlPage } from '../../pages/staffPages/staffControlPage';
import { Testdata } from '../../util/testdata';

type EdubadgeFixture = {
  mboPage: StaffControlPage;
  testdata: Testdata;
};

export const test = base.extend<EdubadgeFixture>({
  testdata: async ({}, use, testInfo) => {
    var testdata = new Testdata();
    testdata.testCaseName = testInfo.title;

    // Use the fixture value in the test.
    await use(testdata);

    // Clean up the fixture.
  },
  /**
   * The page that logs in to the linked account.
   * This page should be used for assertions and expects.
   * The other pages should be used for their functions.
   */
  mboPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const mboPage = new StaffControlPage(page, testdata);
    await mboPage.loginWithMBOInstitutionAdmin();

    // Use the fixture value in the test.
    await use(mboPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
