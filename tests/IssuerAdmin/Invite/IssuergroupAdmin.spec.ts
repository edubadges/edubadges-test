import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
test.fail(`Try to invite ${institution} Issuergroup admin invite`, async ({ 
    adminPage,
    extraStaffLoginPage,
}) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuergroupAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const issuergroupName = 'Business';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(issuergroupName);

    // test, should fail here
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
