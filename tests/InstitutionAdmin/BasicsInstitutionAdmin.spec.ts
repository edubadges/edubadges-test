import { expect, test } from '../../fixtures/loginFixture';

test('Login WO institution admin', async ({
  homePage,
  issuerPortalPage,
  testdata,
}) => {
  // login
  await homePage.navigateToHomePage();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(
    testdata.WOAccounts.institutionAdminLogin.username,
    testdata.WOAccounts.institutionAdminLogin.password,
  );

  // validate success
  const expandMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigation = issuerPortalPage.page.getByRole('navigation');

  await expect(expandMenu).toBeVisible();
  await expect(navigation).toBeVisible();
});

test('Logout WO institution admin', async ({
  homePage,
  issuerPortalPage,
  testdata,
}) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigation = issuerPortalPage.page.getByRole('navigation');

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(
    testdata.WOAccounts.institutionAdminLogin.username,
    testdata.WOAccounts.institutionAdminLogin.password,
  );

  await expect(loggedInMenu).toBeVisible();
  await expect(navigation).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validation
  await expect(loggedInMenu).not.toBeVisible();
  await expect(navigation).not.toBeVisible();
});
