import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { StaffControlPage } from '../../pages/staffPages/staffControlPage';
import { Testdata } from '../../util/testdata';
import { CatalogPage } from '../../pages/catalogPage';

type EdubadgeFixture = {
  woPage: StaffControlPage;
  catalogPage: CatalogPage;
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
  /**
   * The page that logs in to the linked account.
   * This page should be used for assertions and expects.
   * The other pages should be used for their functions.
   */
  woPage: async ({ page, testdata }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, testdata);
    await homePage.navigateToHomePage();
    await homePage.openIssuerPortal();

    const woPage = new StaffControlPage(page, testdata);
    await woPage.loginWithWoInstitutionAdmin();

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
      await homePage.OpenCatalog();
      const catalogPage = new CatalogPage(page, testdata);
  
      // Use the fixture value in the test.
      await use(catalogPage);
  
      // Clean up the fixture.
    },
});
export { expect, BrowserContext } from '@playwright/test';