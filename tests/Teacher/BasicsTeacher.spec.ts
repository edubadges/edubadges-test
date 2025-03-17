import { expect, test } from '../../fixtures/loginFixture';

test('Login', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // login
    const maskedLocators = [issuerPortalPage.page.locator('.content'), issuerPortalPage.page.locator('.link')];
    await homePage.openIssuerPortal();
    await issuerPortalPage.login(
      testdata.WOAccounts.badgeClassAdminLogin.username,
      testdata.WOAccounts.badgeClassAdminLogin.password
    )

    // validage success
    await expect(issuerPortalPage.page.locator('.expand-menu')).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();
    await expect(issuerPortalPage.page).toHaveScreenshot("TeacherLoggedInPortal.png", { mask: maskedLocators })
  });

test('Logout', async ({
    homePage,
    issuerPortalPage,
    testdata,
  }) => {
    // var
    const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');

    // setup
    await homePage.openIssuerPortal();
    await issuerPortalPage.login(
      testdata.WOAccounts.badgeClassAdminLogin.username,
      testdata.WOAccounts.badgeClassAdminLogin.password
    )
    await expect(loggedInMenu).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();

    // test
    await loggedInMenu.click();
    await loggedInMenu.getByText('Logout').click();
    await expect(loggedInMenu).not.toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).not.toBeVisible();
  });