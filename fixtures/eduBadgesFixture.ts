import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuerPortalPage } from '../pages/issuerPortalPage';
import { Testdata } from '../util/testdata';

type EdubadgeFixture = {
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var testdata = new Testdata();

export const test = base.extend<EdubadgeFixture>({
  issuerPortalPage: async ({ page }, use, testInfo) => {
    testdata.testCaseName = testInfo.title;

    // Set up the fixture.
    const loginPage = new LoginPage(page, testdata);
    await loginPage.navigateToLoginPageForIssuerPortal();
    await loginPage.loginWithInstitutionAdmin();
    const issuerPortalPage = new IssuerPortalPage(page, testdata);
    await issuerPortalPage.goToManage();

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
