import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Login at ${institution}`, async ({ backpackPage }) => {
    // var
    const maskedLocators = [backpackPage.page.locator('.content')];

    // test
    await backpackPage.login(institution);

    // validate
    await expect(backpackPage.page.locator('.expand-menu')).toBeVisible();
    await expect(backpackPage.page).toHaveScreenshot('BackpackLoggedIn.png', {
      mask: maskedLocators,
    });
  });
});

test('Logout', async ({ backpackPage }) => {
  // var
  const loggedInMenu = backpackPage.page.locator('.expand-menu');

  // setup
  await backpackPage.login('WO');

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validate
  await expect(loggedInMenu).not.toBeVisible();
});

test('See subcategories', async ({ backpackPage }) => {
  // var
  const maskedLocators = [backpackPage.page.locator('.content')];

  // setup
  await backpackPage.login('WO');

  // test & validate
  await backpackPage.openBadgeRequests();
  await expect(backpackPage.page).toHaveScreenshot('RequestsBackpack.png', {
    mask: maskedLocators,
  });

  await backpackPage.openCollections();
  await expect(backpackPage.page).toHaveScreenshot('CollectionsBackpack.png', {
    mask: maskedLocators,
  });

  await backpackPage.openImported();
  await expect(backpackPage.page).toHaveScreenshot('ImportedBackpack.png', {
    mask: maskedLocators,
  });

  await backpackPage.openArchive();
  await expect(backpackPage.page).toHaveScreenshot('ArchiveBackpack.png', {
    mask: maskedLocators,
  });

  await backpackPage.openAccount();
  await expect(backpackPage.page).toHaveScreenshot('AccountBackpack.png', {
    mask: maskedLocators,
  });
});
