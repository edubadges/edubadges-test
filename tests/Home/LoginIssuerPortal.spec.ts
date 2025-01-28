import { test } from '../../fixtures/loginFixture';

test('Login with institution admin in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuer group admin in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithIssuerGroupAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with badge class admin in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithBadgeClassAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuerAdmin in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithIssuerAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with student in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithStudent();
  await issuerPortalPage.validateLoginFailed();
});
