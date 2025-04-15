import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { StaffMainPage } from '../pages/staffPages/staffMainPage';
import { Testdata } from '../util/testdata';
import { CatalogPage } from '../pages/catalogPage';

type EdubadgeFixture = {
  adminPage: StaffMainPage;
  catalogPage: CatalogPage;
  testdata: Testdata;
  extraStaffLoginPage: StaffMainPage;
};

export const test = base.extend<EdubadgeFixture>({
  /** The main page, should login first */
  adminPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();
    const woPage = new StaffMainPage(page, testdata);

    // Use the fixture value in the test.
    await use(woPage);

    // Clean up the fixture.
  },
  catalogPage: async ({ browser, testdata }, use) => {
    // Set up the fixture.
    var catalogContext = await browser.newContext();
    var page = await catalogContext.newPage();

    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openCatalog();
    const catalogPage = new CatalogPage(page, testdata);

    // Use the fixture value in the test.
    await use(catalogPage);

    // Clean up the fixture.
  },
  testdata: async ({}, use, testInfo) => {
    var testdata = new Testdata();
    testdata.testCaseName = testInfo.title;

    // Use the fixture value in the test.
    await use(testdata);

    // Clean up the fixture.
  },
  /** Additional staff page to use for testing */
  extraStaffLoginPage: async ({ browser, testdata }, use) => {
    // Set up the fixture.
    const newStaffContext = await browser.newContext();
    const page = await newStaffContext.newPage();
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();
    const newStaffPage = new StaffMainPage(page, testdata);

    // Use the fixture value in the test.
    await use(newStaffPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
