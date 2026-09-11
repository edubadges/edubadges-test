import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Invite ${institution} Badgeclass admin`,{annotation: [{type: 'Invite email badgeclass admin', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portal. This navigates to the Issuer portal page. Log in with account. Enter "Growth and development" into the search field. Go to admin view, then User management, and select invite new user. Fill in the details and verify that the badge is visible.'}]}, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Accept${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const badgeName = 'Growth and development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.goToAdminView();

    // test
    await userManagement.inviteUser(newUserMail);

    // validate
  
    await expect(
      adminPage.page.getByText(`Successfully invited ${newUserMail}`),
    ).toBeVisible();
    await expect(
      adminPage.page.locator('.main-content-margin').getByText(newUserMail),
    ).toBeVisible();
    await adminPage.page.waitForTimeout(2000);
    await extraStaffLoginPage.loginDummyIdp(
      newUsername,
      newUserMail,
      institutionServer,
    );

    // validate
    await extraStaffLoginPage.validateLoginSuccessful();
  });

  test(`Update ${institution} Badgeclass admin rights`,{annotation: [{type: 'Update badgeclass rights from awarder to admin rights', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portal. This navigates to the Issuer portal page. Log in with account. Enter "Growth and development" into the search field. Go to admin view, then User management, and select invite new user. Change the permissions from awarder to admin.'}]}, async ({
    extraStaffLoginPage,
    adminPage,
    testdata,
  }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUsername = `Changed${institution}InviteBadgeclassAdmin`;
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newUserMail =
      newUsername + testdata.retryCount + '@' + institutionServer;
    const badgeName = 'Growth and development';
    const originalRole = 'Admin';
    const updatedRole = 'Awarder';
    const staffRow = adminPage.page.getByText(newUserMail).locator('../..');

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.page.waitForTimeout(2000);
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);
    await adminPage.badgeClassPage.goToAdminView();
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
