import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Accept ${institution} Issuer admin invite`, async ({
    adminPage,
    extraStaffLoginPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteIssuerAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const issuerName = 'Medicine';

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

  test(`Update ${institution} issuer admin rights`, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Changed${institution}InviteIssuerAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const issuerName = 'Medicine';
    const originalRole = 'Issuer admin';
    const updatedRole = 'Issuer awarder';
    const staffRow = adminPage.page.getByText(newUserMail).locator('../..');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await adminPage.managePage.issuersPage.openIssuer(issuerName);
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
