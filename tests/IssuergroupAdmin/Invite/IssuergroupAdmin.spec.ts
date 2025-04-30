import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
test(`Accept ${institution} Issuergroup admin invite`, async ({ 
    adminPage,
    extraStaffLoginPage,
}) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'HBO' || institution == 'MBO');
    expect(institution != 'WO' && institution != 'HBO' && institution != 'MBO').toBeTruthy();
  
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuergroupAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const issuergroupName = 'Business';

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
