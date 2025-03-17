import { expect, test } from '../../fixtures/catalogFixture';

test('Login', async ({
    issuerPortalPage,
  }) => {
    const maskedLocators = [issuerPortalPage.page.locator('.content'), issuerPortalPage.page.locator('.link')];
    await expect(issuerPortalPage.page.locator('.expand-menu')).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();
    await expect(issuerPortalPage.page).toHaveScreenshot("TeacherLoggedInPortal.png", { mask: maskedLocators })
  });

test('Logout', async ({
    issuerPortalPage,
  }) => {
    // var
    const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');

    // setup
    await expect(loggedInMenu).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();

    // test
    await loggedInMenu.click();
    await loggedInMenu.getByText('Logout').click();
    await expect(loggedInMenu).not.toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).not.toBeVisible();
  });