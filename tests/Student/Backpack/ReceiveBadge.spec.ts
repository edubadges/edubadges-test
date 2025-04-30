import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Reject received ${institution} badge`, async ({
    backpackPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Law and Politics';
    const studentAccount = await backpackPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentAccount.email,
      studentAccount.EPPN,
    );

    await backpackPage.login(institution);

    // test
    await backpackPage.rejectReceivedBadge(badgeName);

    // validate
    await expect(
      backpackPage.page.getByText('Edubadge is rejected'),
    ).toBeVisible();
  });

  test(`Accept received ${institution} badge`, async ({
    backpackPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Introduction to Psychology';
    const unclaimedBadgeLocator = backpackPage.page
      .getByText(badgeName)
      .locator('../../..')
      .getByText('View details to claim this edubadge');
    const claimText = backpackPage.page.getByRole('link', {
      name: 'Claim & Add to your backpack',
    });
    const succBar = backpackPage.page.getByText(
      'Successfully claimed edubadge',
    );
    const studentAccount = await backpackPage.getStudentAccount(institution);

    // setup
    await backpackPage.login(institution);
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentAccount.email,
      studentAccount.EPPN,
    );

    // test
    await backpackPage.reloadPage();
    await backpackPage.openBackpack();
    await unclaimedBadgeLocator.click();
    await backpackPage.page.waitForTimeout(500);
    await claimText.click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

    // validate
    await expect(succBar).toBeVisible();
  });

  test(`Have received ${institution} badge revoked`, async ({
    catalogPage,
    backpackPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Need extra badge name';
    await test.fail(badgeName == 'Need extra badge name');
    expect(badgeName != 'Need extra badge name').toBeTruthy();

    const reason = 'A valid reason for revocation';
    const studentInfo = await adminPage.getStudentAccount(institution);
    const badgeLocator = backpackPage.page
      .getByText(badgeName)
      .locator('../../..')
      .getByText('View details to claim this edubadge');

    // setup
    await catalogPage.searchForClass(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(badgeName);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    // test
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.revokeBadge(badgeName, studentInfo.name, reason);

    // validate
    await backpackPage.reloadPage();
    await backpackPage.openArchive();
    await expect(badgeLocator.locator('.status-indicator.revoked')).toBeVisible();
  });
});
