import { test } from '../../fixtures/loginFixture';

// TODO: create basicsLogin test
test('Login with institution admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuer group admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithIssuerGroupAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with badge class admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithBadgeClassAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test.skip('Login with issuerAdmin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithIssuerAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

/* Replaced by Student -> Backpack -> BasicsBackpack
test('Login with student in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithStudent();
  await issuerPortalPage.validateLoginFailed();
});
*/

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
