import { expect, test } from '../../../fixtures/studentFixture';

test(
  `End to end testing with existing resources`,
  { tag: '@E2E' },
  async ({ catalogPage, backpackPage, adminPage }) => {
    // var
    const institution = 'WO';
    const badgeName = 'Circulation and Breathing';

    const reason = 'Reason for revocation is valid';
    const studentInfo = await backpackPage.getStudentAccount('WO');
    const badgeLocator = await backpackPage.getBadgeLocator(badgeName);

    // setup
    await backpackPage.login(institution);
    await expect(badgeLocator).not.toBeVisible();
    await adminPage.loginTestIdp('WO', 'Institution');

    // request badge
    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    await catalogPage.requestEdubadge(institution);

    // award badge and validate
    await expect(badgeLocator).not.toBeVisible();
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.email);
    await backpackPage.reloadPage();
    await backpackPage.openBackpack();
    await expect(badgeLocator).toBeVisible();

    // remove badge and validate
    await backpackPage.rejectReceivedBadge(badgeName);
    await expect(
      backpackPage.page
        .getByText(
          'This edubadge has been removed. You can no longer download or share this edubadge',
        )
        .or(backpackPage.page.getByText('Edubadge is rejected')),
    ).toBeVisible();

    // revoke and validate
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.revokeAwardedBadge(studentInfo.name, reason);

    await catalogPage.reloadPage();
    await catalogPage.page.getByRole('link', { name: 'My backpack' }).click();
    await expect(catalogPage.page.getByText(badgeName)).not.toBeVisible();
    await catalogPage.page.getByRole('link', { name: 'Archive' }).click();
    await expect(catalogPage.page.getByText(badgeName)).toBeVisible();
    await catalogPage.page.getByText(badgeName).click();
    await expect(catalogPage.page.getByText(reason)).toBeVisible();
  },
);
