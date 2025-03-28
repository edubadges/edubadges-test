import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Invite WO user', async ({
    woPage,
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
    woPage,
  }) => {
    // var
    const newUserMail = "SecondTestMailAre@university.org";
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
    woPage,
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

    // validate
    await newStaffLoginPage.loginDummyIdp(newUsername, newUserMail);
    await expect(newStaffLoginPage.page.locator('.expand-menu')).toBeVisible()
  });