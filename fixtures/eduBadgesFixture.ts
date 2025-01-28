import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { IssuerPortalPage } from '../pages/issuerPortal/issuerPortalPage';
import { Testdata } from '../util/testdata';
import { IssuerPortalPageManage } from '../pages/issuerPortal/issuerPortalPageManage';

type EdubadgeFixture = {
  issuerPortalPageManage: IssuerPortalPageManage;
  testdata: Testdata;
};

var testdata = new Testdata();

export const test = base.extend<EdubadgeFixture>({
  issuerPortalPageManage: async ({ page }, use, testInfo) => {
    testdata.testCaseName = testInfo.title;

    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const issuerPortalPage = new IssuerPortalPage(page, testdata);
    await issuerPortalPage.loginWithInstitutionAdmin();
    await issuerPortalPage.goToManage();

    const issuerPortalPageManage = new IssuerPortalPageManage(page, testdata);

    // Use the fixture value in the test.
    await use(issuerPortalPageManage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
