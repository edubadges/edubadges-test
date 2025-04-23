import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
test.fail(`Try to invite ${institution} Issuer admin`, async ({ 
    adminPage,
    extraStaffLoginPage,
}) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuerAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const issuerName = 'Political Science';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await adminPage.managePage.issuersPage.openIssuer(issuerName);

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
