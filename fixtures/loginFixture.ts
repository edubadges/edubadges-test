import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { IssuerPortalPage } from '../pages/issuerPortal/issuerPortalPage';
import { Testdata } from '../util/testdata';

type LoginFixture = {
  homePage: HomePage;
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var testdata = new Testdata();

export const test = base.extend<LoginFixture>({
  homePage: async ({ page }, use, testInfo) => {
    // Set up the fixture
    testdata.testCaseName = testInfo.title;
    const loginPage = new HomePage(page, testdata);
    await loginPage.navigateToHomePage();

    // Use the fixture value in the test.
    await use(loginPage);

    // Clean up the fixture.
  },

  issuerPortalPage: async ({ page }, use) => {
    // Set up the fixture.
    const issuerPortalPage = new IssuerPortalPage(page, testdata);

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
