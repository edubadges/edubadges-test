import { expect, test } from '../../fixtures/loginFixture';

test('Login WO issuer group admin', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // login
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(
      testdata.WOAccounts.issuerGroupAdmin.username,
      testdata.WOAccounts.issuerGroupAdmin.password
    )

    // validate success
    await expect(issuerPortalPage.page.locator('.expand-menu')).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();
  });

test('Logout WO issuer group admin', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // var
    const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');

    // setup
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(
      testdata.WOAccounts.issuerGroupAdmin.username,
      testdata.WOAccounts.issuerGroupAdmin.password
    )
    await expect(loggedInMenu).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();

    // test
    await loggedInMenu.click();
    await loggedInMenu.getByText('Logout').click();
    await expect(loggedInMenu).not.toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).not.toBeVisible();
  });