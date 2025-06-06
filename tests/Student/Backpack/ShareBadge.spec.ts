import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Make ${institution} edubadge public`, async ({
    catalogPage,
    backpackPage,
    adminPage,
  }) => {
    //var
    const badgeName = 'Introduction to Political Science';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await backpackPage.login(institution);
    await adminPage.loginTestIdp(institution, 'Institution');

    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    await catalogPage.requestEdubadge(institution);

    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    await backpackPage.reloadPage();
    await backpackPage.openBackpack();
    await backpackPage.openBadge(badgeName);

    // test
    await expect(
      backpackPage.page.getByRole('link', { name: 'Share' }),
    ).toHaveAttribute('disabled', 'true');
    await expect(backpackPage.page.locator('.slider')).toBeChecked();

    await backpackPage.makeEdubadgePublic(badgeName);

    await expect(
      backpackPage.page.getByRole('link', { name: 'Share' }),
    ).toHaveAttribute('disabled', 'false');
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
    await expect(backpackPage.page).toHaveScreenshot(
      'Successfully made badge public.png',
    );
  });

  test(`Share public ${institution} edubadge`, async ({
    catalogPage,
    backpackPage,
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'MBO');
    await expect(institution != 'WO' && institution != 'MBO').toBeTruthy();

    //var
    const badgeName = 'History of Political Thought';
    const studentInfo = await backpackPage.getStudentAccount(institution);

    // setup
    await backpackPage.login(institution);
    await adminPage.loginTestIdp(institution, 'Institution');

    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    await catalogPage.requestEdubadge(institution);

    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    await backpackPage.openBackpack();
    await backpackPage.reloadPage();
    await backpackPage.makeEdubadgePublic(badgeName);

    await backpackPage.page.getByRole('link', { name: 'Share' }).waitFor();
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();

    // test
    const url = await backpackPage.getShareLink();
    await backpackPage.validateBadge(url);
  });
});
