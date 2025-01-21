import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuerPortalPage } from '../pages/issuerPortalPage';
import { Testdata } from '../util/testdata';

type LoginFixture = {
  loginPage: LoginPage;
  issuerPortalPage: IssuerPortalPage;
  testdata: Testdata;
};

var institutionAdminUsername = process.env.INSTUTUTION_ADMIN_USERNAME || '';
var institutionAdminPassword = process.env.INSTUTUTION_ADMIN_PASSWORD || '';
var issuerGroupAdminUsername = process.env.ISSUER_GROUP_ADMIN_USERNAME || '';
var iissuerGroupAdminPassword = process.env.ISSUER_GROUP_ADMIN_PASSWORD || '';
var issuerGroupAdminIssuerGroup = process.env.ISSUER_GROUP_ADMIN_ISSUERGROUP || '';
var issuerAdminUsername = process.env.ISSUER_ADMIN_USERNAME || '';
var iissuerAdminPassword = process.env.ISSUER_ADMIN_PASSWORD || '';
var badgeClassAdminUsername = process.env.BADGE_CLASS_ADMIN_USERNAME || '';
var badgeClassAdminPassword = process.env.BADGE_CLASS_ADMIN_PASSWORD || '';

var testdata = new Testdata(institutionAdminUsername, institutionAdminPassword, issuerGroupAdminUsername, iissuerGroupAdminPassword, issuerGroupAdminIssuerGroup, 
  issuerAdminUsername, iissuerAdminPassword, badgeClassAdminUsername, badgeClassAdminPassword);

export const test = base.extend<LoginFixture>({
  loginPage: async ({ page }, use, testInfo) => {
    // Set up the fixture
    testdata.testCaseName = testInfo.title;
    console.log(testInfo.title);
    const loginPage = new LoginPage(page, testdata);
    await loginPage.navigateToLoginPage();

    // Use the fixture value in the test.
    await use(loginPage);

    // Clean up the fixture.
  },

  issuerPortalPage: async ({ page }, use) => {
    // Set up the fixture.
    const issuerPortalPage = new IssuerPortalPage(page, testdata);

    // Use the fixture value in the test.
    await use(issuerPortalPage);

    // Clean up the fixture.
  },
});
export { expect, BrowserContext } from '@playwright/test';
