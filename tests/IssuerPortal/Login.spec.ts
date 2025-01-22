import { test } from '../../fixtures/loginFixture';

test('test', async ({ loginPage, issuerPortalPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.expectLoginPageOpened();
  await loginPage.loginWithInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});
