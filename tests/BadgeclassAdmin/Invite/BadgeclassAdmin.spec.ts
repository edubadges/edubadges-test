import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Invite ${institution} Badgeclass admin`, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const badgeName = 'Growth and development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(badgeName);
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
    await extraStaffLoginPage.loginDummyIdp(
      newUsername,
      newUserMail,
      institutionServer,
    );

    // validate
    await extraStaffLoginPage.validateLoginSuccessful();
  });

  test(`Update ${institution} Badgeclass admin rights`, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Changed${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const badgeName = 'Growth and development';
    const originalRole = 'Admin';
    const updatedRole = 'Awarder';
    const staffRow = adminPage.page.getByText(newUserMail).locator('../..');

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.goToAdminView();
    await userManagement.inviteUser(newUserMail, originalRole);
    await extraStaffLoginPage.loginDummyIdp(
      newUsername,
      newUserMail,
      institutionServer,
    );
    await adminPage.reloadPage();

    // test
    await userManagement.updatePermissions(newUserMail, updatedRole);

    // validate
    await expect(staffRow.getByText(updatedRole)).toBeVisible();
  });
});
