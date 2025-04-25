import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Make ${institution} edubadge public`, async ({
    catalogPage,
    backpackPage,
    adminPage,
  }) => {
    //var
    const course = 'Introduction to Political Science';

    //setup
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.approveRequest(course, institution);

    await backpackPage.login(institution);
    await backpackPage.openBackpack();
    await backpackPage.openBadge(course);

    // test
    await expect(
      backpackPage.page.getByRole('link', { name: 'Share' }),
    ).toHaveAttribute('disabled', 'true');
    await expect(backpackPage.page.locator('.slider')).toBeChecked();

    await backpackPage.makeEdubadgePublic(course);

    await expect(
      backpackPage.page.getByRole('link', { name: 'Share' }),
    ).toHaveAttribute('disabled', 'false');
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
    await expect(backpackPage.page).toHaveScreenshot(
      'Successfully made badge public.png',
    );
  });

  // known issue on the verification of the public badge
  test.fail(`Share public ${institution} edubadge`, async ({
    catalogPage,
    backpackPage,
    adminPage,
  }) => {
    //var
    const course = 'History of Political Thought';

    //setup
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.approveRequest(course, institution);

    await backpackPage.openBackpack();
    await backpackPage.reloadPage();
    await backpackPage.makeEdubadgePublic(course);

    await backpackPage.page.getByRole('link', { name: 'Share' }).waitFor();
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();

    // test
    const url = await backpackPage.getShareLink();
    await backpackPage.validateBadge(url);
  });
});
