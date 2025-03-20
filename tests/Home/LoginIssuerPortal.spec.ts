import { test } from '../../fixtures/loginFixture';

test('Login with institution admin for MBO in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithMBOInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with institution admin for HBO in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithHBOInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});
