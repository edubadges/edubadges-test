import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Login at ${institution}`, async ({ backpackPage }) => {
    // var
    const loggedInMenu = backpackPage.page.locator('.expand-menu');
    const backPackButton = backpackPage.page.getByText('My backpack').nth(1);

    // test
    await backpackPage.login(institution);

    // validate
    await expect(loggedInMenu).toBeVisible();
    await expect(backPackButton).toBeVisible();
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
  await backpackPage.login('WO', 1);

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
