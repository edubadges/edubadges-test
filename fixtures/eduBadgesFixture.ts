import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { IssuerPortalPage } from '../pages/issuerPortal/issuerPortalPage';
import { Testdata } from '../util/testdata';
import { IssuerPortalPageManage } from '../pages/issuerPortal/issuerPortalPageManage';

type EdubadgeFixture = {
  issuerPortalPageManage: IssuerPortalPageManage;
  mboIssuerPortalPageManage: IssuerPortalPageManage;
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
  issuerPortalPageManage: async ({ page, testdata }, use) => {
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
  mboIssuerPortalPageManage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const issuerPortalPage = new IssuerPortalPage(page, testdata);
    await issuerPortalPage.loginWithMBOInstitutionAdmin();
    await issuerPortalPage.goToManage();

    const mboIssuerPortalPageManage = new IssuerPortalPageManage(
      page,
      testdata,
    );

    // Use the fixture value in the test.
    await use(mboIssuerPortalPageManage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
