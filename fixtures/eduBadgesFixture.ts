import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuerPortalPage } from '../pages/issuerPortalPage';
import { Testdata } from '../util/testdata';

type EdubadgeFixture = {
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

export const test = base.extend<EdubadgeFixture>({
  issuerPortalPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page, testdata);
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithInstitutionAdmin();
    const issuerPortalPage = new IssuerPortalPage(page, testdata);
    await issuerPortalPage.goToManage();

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
