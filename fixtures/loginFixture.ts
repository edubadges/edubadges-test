import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuerPortalPage } from '../pages/issuerPortalPage';
import { Testdata } from '../util/testdata';

type LoginFixture = {
  loginPage: LoginPage;
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var testdata = new Testdata();

export const test = base.extend<LoginFixture>({
  loginPage: async ({ page }, use, testInfo) => {
    // Set up the fixture
    testdata.testCaseName = testInfo.title;
    const loginPage = new LoginPage(page, testdata);
    await loginPage.navigateToLoginPageForIssuerPortal();

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
