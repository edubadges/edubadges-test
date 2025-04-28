import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
test(`Accept ${institution} Issuer admin invite`, async ({ 
    adminPage,
    extraStaffLoginPage,
}) => {
  // fail if correct account is missing. SHOULD BE CHANGED
  test.fail(institution == 'WO' || institution == 'HBO' || institution == 'MBO');
  expect(institution != 'WO' && institution != 'HBO' && institution != 'MBO').toBeTruthy();

    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuerAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const issuerName = 'Political Science';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
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
