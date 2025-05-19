import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Accept ${institution} Issuergroup admin invite`, async ({
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuergroupAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + testdata.retryCount + '@' + institutionServer;
    const issuergroupName = 'Medicine';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(issuergroupName);

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

  test(`Update ${institution} issuergroup admin rights`, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Changed${institution}InviteIssuergroupAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + testdata.retryCount + '@' + institutionServer;
    const issuergroupName = 'Medicine';
    const originalRole = 'Issuer group admin';
    const updatedRole = 'Issuer group awarder';
    const staffRow = adminPage.page.getByText(newUserMail).locator('../..');
    const roleField = staffRow.locator('.select-field');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(issuergroupName);

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
