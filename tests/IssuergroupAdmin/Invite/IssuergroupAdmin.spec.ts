import { test } from '../../../fixtures/staffFixture';
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
});
