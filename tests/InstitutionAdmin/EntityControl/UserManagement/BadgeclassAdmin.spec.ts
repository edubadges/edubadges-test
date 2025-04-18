import { test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
test(`Accept ${institution} Badgeclass admin invite`, async ({ 
    adminPage,
    extraStaffLoginPage,
}) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail = newUsername + '@' + institutionServer;
    const badgeName = 'Law and Politics';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.goToAdminView();

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
