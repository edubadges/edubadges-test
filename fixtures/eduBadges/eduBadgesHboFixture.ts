import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { IssuerPortalPage } from '../../pages/issuerPortal/issuerPortalPage';
import { Testdata } from '../../util/testdata';
import { IssuerPortalPageManage } from '../../pages/issuerPortal/issuerPortalPageManage';

type EdubadgeFixture = {
  hboIssuerPortalPageManage: IssuerPortalPageManage;
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
  hboIssuerPortalPageManage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const issuerPortalPage = new IssuerPortalPage(page, testdata);
    await issuerPortalPage.loginWithHBOInstitutionAdmin();
    await issuerPortalPage.goToManage();

    const hboIssuerPortalPageManage = new IssuerPortalPageManage(
      page,
      testdata,
    );

    // Use the fixture value in the test.
    await use(hboIssuerPortalPageManage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
