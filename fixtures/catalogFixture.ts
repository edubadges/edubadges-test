import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Testdata } from '../util/testdata';
import { CatalogPage } from '../pages/catalogPage';
import { IssuerPortalPage } from '../pages/issuerPortal/issuerPortalPage';

type CatalogFixture = {
  catalogPage: CatalogPage;
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var testdata = new Testdata();

export const test = base.extend<CatalogFixture>({
  catalogPage: async ({ page }, use, testInfo) => {
    // Set up the fixture.
    testdata.testCaseName = testInfo.title;
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.OpenCatalog();
    const catalogPage = new CatalogPage(page, testdata);

    // Use the fixture value in the test.
    await use(catalogPage);

    // Clean up the fixture.
  },
  issuerPortalPage: async ({ browser }, use) => {
    // Set up the fixture.
    var issuerContext = await browser.newContext();
    var issuerPage = await issuerContext.newPage();
    const homePage = new HomePage(issuerPage, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const issuerPortalPage = new IssuerPortalPage(issuerPage, testdata);
    await issuerPortalPage.loginWithInstitutionAdmin();

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
