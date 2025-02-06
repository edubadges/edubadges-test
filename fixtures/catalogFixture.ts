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

export const test = base.extend<CatalogFixture>({
  testdata: async ({}, use, testInfo) => {
    var testdata = new Testdata();
    testdata.testCaseName = testInfo.title;

    // Use the fixture value in the test.
    await use(testdata);

    // Clean up the fixture.
  },
  catalogPage: async ({ browser, testdata }, use, testInfo) => {
    // Set up the fixture.
    testdata.testCaseName = testInfo.title;

    var catalogContext = await browser.newContext();
    var page = await catalogContext.newPage();
    
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.OpenCatalog();
    const catalogPage = new CatalogPage(page, testdata);
    
    // Use the fixture value in the test.
    await use(catalogPage);

    // Clean up the fixture.
  },
  issuerPortalPage: async ({ browser, testdata }, use) => {
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
