import { test as base } from '@playwright/test';
import { HomePage } from '../../../pages/homePage';
import { StaffMainPage } from '../../../pages/staffPages/staffMainPage';
import { Testdata } from '../../../util/testdata';
import { CatalogPage } from '../../../pages/catalogPage';

type EdubadgeFixture = {
  woIssuergroupAdminPage: StaffMainPage;
  catalogPage: CatalogPage;
  testdata: Testdata;
  newStaffLoginPage: StaffMainPage;
};

export const test = base.extend<EdubadgeFixture>({
  woIssuergroupAdminPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const woPage = new StaffMainPage(page, testdata);
    await woPage.loginWithWoIssuerGroupAdmin();

    // Use the fixture value in the test.
    await use(woPage);

    // Clean up the fixture.
  },
  testdata: async ({}, use, testInfo) => {
    var testdata = new Testdata();
    testdata.testCaseName = testInfo.title;

    // Use the fixture value in the test.
    await use(testdata);

    // Clean up the fixture.
  },
  catalogPage: async ({ browser, testdata }, use) => {
    // Set up the fixture.
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
  newStaffLoginPage: async ({ browser, testdata }, use) => {
    // Set up the fixture.
    const newStaffContext = await browser.newContext();
    const page = await  newStaffContext.newPage();
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const newStaffPage = new StaffMainPage(page, testdata);
    
    await use(newStaffPage);
  },
});
export { expect, BrowserContext } from '@playwright/test';