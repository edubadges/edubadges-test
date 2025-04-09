import { expect, test } from '../../fixtures/loginFixture';

test('Login', async ({ homePage, issuerPortalPage, testdata }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigationHeader = issuerPortalPage.page.getByRole('navigation');

  // test
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(
    testdata.WOAccounts.badgeClassAdminLogin.username,
    testdata.WOAccounts.badgeClassAdminLogin.password,
  );

  // validate
  await expect(loggedInMenu).toBeVisible();
  await expect(navigationHeader).toBeVisible();
});

test('Logout', async ({ homePage, issuerPortalPage, testdata }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigationHeader = issuerPortalPage.page.getByRole('navigation');

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(
    testdata.WOAccounts.badgeClassAdminLogin.username,
    testdata.WOAccounts.badgeClassAdminLogin.password,
  );
  await expect(loggedInMenu).toBeVisible();
  await expect(navigationHeader).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validate
  await expect(loggedInMenu).not.toBeVisible();
  await expect(navigationHeader).not.toBeVisible();
});
