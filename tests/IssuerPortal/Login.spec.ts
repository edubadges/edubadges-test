import { test } from '../../fixtures/loginFixture';

test('Login with institution admin', async ({ loginPage, issuerPortalPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with issuer group admin', async ({ loginPage, issuerPortalPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithIssuerGroupAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with badge class admin', async ({ loginPage, issuerPortalPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithBadgeClassAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with issuerAdmin', async ({ loginPage, issuerPortalPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithIssuerAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});