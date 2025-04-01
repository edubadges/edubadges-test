import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Invite WO user', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const newUserMail = "TestNewFirstTestMailAdress@university.org";
    const userManagement = woPage.managePage.userManagePage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToUserManagement();

    // test
    await userManagement.addNewUser(newUserMail);

    // validate
    await expect(woPage.page.getByText(`Successfully invited ${newUserMail}`)).toBeVisible();
  });

  test('Revoke WO user invite', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const newUserMail = "SecondTestMailAdress@university.org";
    const userManagement = woPage.managePage.userManagePage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToUserManagement();
    await userManagement.addNewUser(newUserMail);

    // test
    await userManagement.removeExistingPermissions(newUserMail);

    // validate
    await expect(woPage.page.getByText('Successfully removed invite')).toBeVisible();
    await expect(woPage.page.getByText(newUserMail)).not.toBeVisible();
  });

  test('Accept WO invite', async ({
    woInstitutionAdminPage: woPage,
    newStaffLoginPage,
  }) => {
    // var
    const newUsername = "AcceptInviteInstitutionAdmin";
    const newUserMail = "ThirdTestMailAdress@university.org";
    const userManagement = woPage.managePage.userManagePage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToUserManagement();

    // test
    await userManagement.addNewUser(newUserMail);
    await newStaffLoginPage.loginDummyIdp(newUsername, newUserMail);

    // validate
    await expect(newStaffLoginPage.page.locator('.expand-menu')).toBeVisible()
  });

  test('Delete WO permission', async ({
    woInstitutionAdminPage: woPage,
    newStaffLoginPage,
  }) => {
    // var
    const newUsername = "GetRemovedRightsInstitutionAdmin";
    const newUserMail = "FourthTestMailAdress@university.org";
    const userManagement = woPage.managePage.userManagePage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToUserManagement();
    await userManagement.addNewUser(newUserMail);
    await newStaffLoginPage.loginDummyIdp(newUsername, newUserMail);

    // test
    await woPage.reloadPage();
    await userManagement.removeExistingPermissions(newUserMail);

    // validate
    await expect(woPage.page.getByText('Successfully removed rights')).toBeVisible();
    await expect(woPage.page.getByText(newUsername)).not.toBeVisible();

  });