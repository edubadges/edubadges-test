import { test } from '../../fixtures/loginFixture';

// TODO: create basicsLogin test
test('Login with institution admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithWoInstitutionAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with issuer group admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithWoIssuerGroupAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with badge class admin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithWoBadgeClassAdmin();
  await issuerPortalPage.validateLoginSuccesfull();
});

test('Login with issuerAdmin for uni in the issuer portal', async ({
  homePage,
  issuerPortalPage,
}) => {
  await homePage.expectHomePageOpened();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginWithWoIssuerAdmin();
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
