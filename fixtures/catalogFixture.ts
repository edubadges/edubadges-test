import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Testdata } from '../util/testdata';
import { CatalogPage } from '../pages/catalogPage';
import { IssuerPortalPage } from '../pages/issuerPortalPage';

type CatalogFixture = {
  catalogPage: CatalogPage;
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var institutionAdminUsername = process.env.INSTUTUTION_ADMIN_USERNAME || '';
var institutionAdminPassword = process.env.INSTUTUTION_ADMIN_PASSWORD || '';
var issuerGroupAdminUsername = process.env.ISSUER_GROUP_ADMIN_USERNAME || '';
var iissuerGroupAdminPassword = process.env.ISSUER_GROUP_ADMIN_PASSWORD || '';
var issuerGroupAdminIssuerGroup =
  process.env.ISSUER_GROUP_ADMIN_ISSUERGROUP || '';
var issuerAdminUsername = process.env.ISSUER_ADMIN_USERNAME || '';
var iissuerAdminPassword = process.env.ISSUER_ADMIN_PASSWORD || '';
var badgeClassAdminUsername = process.env.BADGE_CLASS_ADMIN_USERNAME || '';
var badgeClassAdminPassword = process.env.BADGE_CLASS_ADMIN_PASSWORD || '';
var studentName = process.env.STUDENT_USERNAME || '';
var studentPassword = process.env.STUDENT_PASSWORD || '';
var studentEmail = process.env.STUDENT_EMAIL || '';

var testdata = new Testdata(
  institutionAdminUsername,
  institutionAdminPassword,
  issuerGroupAdminUsername,
  iissuerGroupAdminPassword,
  issuerGroupAdminIssuerGroup,
  issuerAdminUsername,
  iissuerAdminPassword,
  badgeClassAdminUsername,
  badgeClassAdminPassword,
);

export const test = base.extend<CatalogFixture>({
  catalogPage: async ({ page }, use) => {
    // Set up the fixture.
    testdata.studentName = studentName;
    testdata.studentPassword = studentPassword;
    testdata.studentEmail = studentEmail;
    const loginPage = new LoginPage(page, testdata);
    await loginPage.navigateToLoginPageForIssuerPortal();
    await loginPage.OpenCatalog();
    const catalogPage = new CatalogPage(page, testdata);

    // Use the fixture value in the test.
    await use(catalogPage);

    // Clean up the fixture.
  },
  issuerPortalPage: async ({ browser }, use) => {
    // Set up the fixture.
    var issuerContext = await browser.newContext();
    var issuerPage = await issuerContext.newPage();
    testdata.studentName = studentName;
    testdata.studentPassword = studentPassword;
    testdata.studentEmail = studentEmail;
    const loginPage = new LoginPage(issuerPage, testdata);
    await loginPage.navigateToLoginPageForIssuerPortal();
    await loginPage.loginWithInstitutionAdmin();
    const issuerPortalPage = new IssuerPortalPage(issuerPage, testdata);

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
