import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Invite ${institution} user as institution admin`,{annotation: [{type: 'Invite user as institution admin', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to User management and invite a new user with the role institution admin'}]}, async ({ 
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUserMail = `userToInviteNr${testdata.retryCount}@${institution}mail.edu`;

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

  test(`Revoke ${institution} user institution admin invite`,{annotation: [{type: 'Revoke  user institution admin invite', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to User management and invite a new user with the role institution admin. Select the created invite for the user, remove the permission, and verify the message "succesvol remove invite".'}]}, async ({  
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUserMail = `userToRevokeNr${testdata.retryCount}@${institution}mail.edu`;

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

  test(`Accept ${institution} institution admin invite`,{annotation: [{type: 'Accept institution admin invite', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to User management and invite a new user with the role institution admin. Select the created invite for the user, accept the invite, and verify the message "succesvol accepted invite".'}]}, async ({ 
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteInstitutionAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;

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

  test(`Delete ${institution} institution admin permission`,{annotation: [{type: 'Delete institution admin permission', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to User management and invite a new user with the role institution admin. Select the created invite for the user, remove the permission, and verify the message "successfully remove rights".'}]}, async ({ 
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `GetRightsRemoved${institution}InstitutionAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;

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
