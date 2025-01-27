import { test } from '../../fixtures/loginFixture';

test('Login with institution admin in the issuer portal', async ({
  loginPage,
  issuerPortalPage,
}) => {
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuer group admin in the issuer portal', async ({
  loginPage,
  issuerPortalPage,
}) => {
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithIssuerGroupAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with badge class admin in the issuer portal', async ({
  loginPage,
  issuerPortalPage,
}) => {
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithBadgeClassAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuerAdmin in the issuer portal', async ({
  loginPage,
  issuerPortalPage,
}) => {
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithIssuerAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with student in the issuer portal', async ({
  loginPage,
  issuerPortalPage,
}) => {
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithStudent();
  await issuerPortalPage.validateLoginFailed();
});
