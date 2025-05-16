import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Invite ${institution} user as institution admin`, async ({
    adminPage,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUserMail = `userToInvite@${institution}mail.edu`;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();

    // test
    await userManagement.inviteUser(newUserMail);

    // validate
    await expect(
      adminPage.page.getByText(`Successfully invited ${newUserMail}`),
    ).toBeVisible();
  });

  test(`Revoke ${institution} user institution admin invite`, async ({
    adminPage,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUserMail = `userToRevoke@${institution}mail.edu`;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();
    await userManagement.inviteUser(newUserMail);

    // test
    await userManagement.removeExistingPermissions(newUserMail);

    // validate
    await expect(
      adminPage.page.getByText('Successfully removed invite'),
    ).toBeVisible();
    await expect(adminPage.page.getByText(newUserMail)).not.toBeVisible();
  });

  test(`Accept ${institution} institution admin invite`, async ({
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteInstitutionAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + testdata.retryCount + '@' + institutionServer;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();

    // test
    await userManagement.inviteUser(newUserMail);
    await extraStaffLoginPage.loginDummyIdp(
      newUsername,
      newUserMail,
      institutionServer,
    );

    // validate
    await extraStaffLoginPage.validateLoginSuccessful();
  });

  test(`Delete ${institution} institution admin permission`, async ({
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `GetRightsRemoved${institution}InstitutionAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + testdata.retryCount + '@' + institutionServer;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();
    await userManagement.inviteUser(newUserMail);
    await extraStaffLoginPage.loginDummyIdp(
      newUsername,
      newUserMail,
      institutionServer,
    );

    // test
    await adminPage.reloadPage();
    await userManagement.removeExistingPermissions(newUserMail);

    // validate
    await expect(
      adminPage.page.getByText('Successfully removed rights'),
    ).toBeVisible();
    await expect(adminPage.page.getByText(newUsername)).not.toBeVisible();
  });
});
