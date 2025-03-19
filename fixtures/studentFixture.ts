import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Testdata } from '../util/testdata';
import { CatalogPage } from '../pages/catalogPage';
import { StaffControlPage } from '../pages/staffPages/staffControlPage';
import { BackpackPage } from '../pages/backpackPage';

type CatalogFixture = {
  catalogPage: CatalogPage;
  backpackPage: BackpackPage;
  woTeacherPage: StaffControlPage;
  hboTeacherPage: StaffControlPage;
  mboTeacherPage: StaffControlPage;
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
  backpackPage: async ({ browser, testdata }, use, testInfo) => {
    // Set up the fixture.
    testdata.testCaseName = testInfo.title;

    var backpackContext = await browser.newContext();
    var page = await backpackContext.newPage();

    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.OpenBackpack();
    const backpackPage = new BackpackPage(page, testdata);
    await backpackPage.Login();

    // Use the fixture value in the test.
    await use(backpackPage);

    // Clean up the fixture.
  },
  woTeacherPage: async ({ browser, testdata }, use) => {
    // Set up the fixture.
    var woTeacherContext = await browser.newContext();
    var page = await woTeacherContext.newPage();

    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const woPage = new StaffControlPage(page, testdata);
    await woPage.loginWithWoInstitutionAdmin();

    // Use the fixture value in the test.
    await use(woPage);

    // Clean up the fixture.
  },
  mboTeacherPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const mboPage = new StaffControlPage(page, testdata);
    await mboPage.loginWithMBOInstitutionAdmin();

    // Use the fixture value in the test.
    await use(mboPage);

    // Clean up the fixture
  },
  hboTeacherPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const hboPage = new StaffControlPage(page, testdata);
    await hboPage.loginWithHBOInstitutionAdmin();

    // Use the fixture value in the test.
    await use(hboPage);

    // Clean up the fixture.
  }, 
});
export { expect, BrowserContext } from '@playwright/test';
