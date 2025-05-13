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

    //setup
    await catalogPage.searchForClass(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(badgeName);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    await backpackPage.login(institution);
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
    //var
    const badgeName = 'History of Political Thought';
    const studentName = (await backpackPage.getStudentAccount(institution))
      .name;

      //setup
      await catalogPage.searchForClass(badgeName);
      await catalogPage.filterOn(institution);
      await catalogPage.openEduClass(badgeName);
      await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.approveRequest(badgeName, studentName);

    await backpackPage.login(institution);
    await backpackPage.openBackpack();
    await backpackPage.reloadPage();
    await backpackPage.makeEdubadgePublic(badgeName);

      await backpackPage.page.getByRole('link', { name: 'Share' }).waitFor();
      await expect(backpackPage.page.locator('.slider')).not.toBeChecked();

      // test
      const url = await backpackPage.getShareLink();
      await backpackPage.validateBadge(url);
    },
  );
});
