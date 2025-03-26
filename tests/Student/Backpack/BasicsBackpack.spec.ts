import { expect, test } from '../../../fixtures/studentFixture';
// TODO: logout, see account, see requests, see history, base screenshots


test('Login', async ({
    backpackPage,
  }) => {
    const maskedLocators = [backpackPage.page.locator('.content')];
    await expect(backpackPage.page.locator('.expand-menu')).toBeVisible();
    await expect(backpackPage.page).toHaveScreenshot("BackpackLoggedIn.png", { fullPage: true, mask: maskedLocators })
  });

test('Logout', async ({
    backpackPage,
  }) => {
    // var
    const loggedInMenu = backpackPage.page.locator('.expand-menu');

    // setup
    await expect(loggedInMenu).toBeVisible();

    // test
    await loggedInMenu.click();
    await loggedInMenu.getByText('Logout').click();
    await expect(loggedInMenu).not.toBeVisible();
  });

test('See subcategories', async ({
    backpackPage,
  }) => {
    const maskedLocators = [ backpackPage.page.locator('.content'), ]

    await backpackPage.OpenBadgeRequests();
    await expect(backpackPage.page).toHaveScreenshot("RequestsBackpack.png", { fullPage: true, mask:maskedLocators });
    
    await backpackPage.OpenCollections();
    await expect(backpackPage.page).toHaveScreenshot("CollectionsBackpack.png", { fullPage: true, mask:maskedLocators });

    await backpackPage.OpenImported();
    await expect(backpackPage.page).toHaveScreenshot("ImportedBackpack.png", { fullPage: true, mask:maskedLocators });

    await backpackPage.OpenArchive();
    await expect(backpackPage.page).toHaveScreenshot("ArchiveBackpack.png", { fullPage: true, mask:maskedLocators });

    await backpackPage.OpenAccount();
    await expect(backpackPage.page).toHaveScreenshot("AccountBackpack.png",{ mask: maskedLocators }
        );
  });