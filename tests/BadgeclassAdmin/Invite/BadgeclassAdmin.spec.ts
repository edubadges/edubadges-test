import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Invite ${institution} Badgeclass admin`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'HBO');
    await expect(institution != 'HBO').toBeTruthy();

    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const badgeName = 'Growth and development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.goToAdminView();

    // test
    await userManagement.inviteUser(newUserMail);

    // validate
    await expect(
      adminPage.page.getByText(`Successfully invited ${newUserMail}`),
    ).toBeVisible();
    await expect(
      adminPage.page.locator('.main-content-margin').getByText(newUserMail),
    ).toBeVisible();
  });
});
