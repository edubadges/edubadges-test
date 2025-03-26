import { expect, test } from '../../fixtures/loginFixture';

test('Login WO institution admin', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // login
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(
      testdata.WOAccounts.institutionAdminLogin.username,
      testdata.WOAccounts.institutionAdminLogin.password
    )

    // validate success
    await expect(issuerPortalPage.page.locator('.expand-menu')).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();
  });

test('Logout WO institution admin', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // var
    const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');

    // setup
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(
      testdata.WOAccounts.institutionAdminLogin.username,
      testdata.WOAccounts.institutionAdminLogin.password
    )
    await expect(loggedInMenu).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();

    // test
    await loggedInMenu.click();
    await loggedInMenu.getByText('Logout').click();
    await expect(loggedInMenu).not.toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).not.toBeVisible();
  });