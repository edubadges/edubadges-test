import { expect, test } from '../../../fixtures/staffFixture';

test(
  `End to end testing by creating every resource needed`,
  { tag: '@E2E' },
  async ({ adminPage, catalogPage, extraStaffLoginPage, testdata }) => {
    // var
    const issuergroup = adminPage.managePage.issuerGroupPage;
    const issuers = adminPage.managePage.issuersPage;
    const userManagement = adminPage.managePage.userManagement;

    const institution = 'WO';
    const issuergroupName = 'E2E Issuergroup';
    const descriptionText = 'E2E filler description';
    const issuerName = 'E2E Issuer';
    const badgeName = 'E2E Regular badge';
    const badgeLocator = catalogPage.page
      .locator('.card.badge')
      .getByText(badgeName)
      .first()
      .locator('../../..');

    const studentInfo = await adminPage.getStudentAccount(institution);
    const institutionServer =
      await userManagement.getInstitutionServer(institution);
    const newBadgeAdminName = 'NewE2EBadgeAdmin';
    const newBadgeAdminMail =
      newBadgeAdminName + testdata.retryCount + '@' + institutionServer;

    // setup
    await adminPage.loginTestIdp('WO', 'Institution');

    // create issuergroup
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await issuergroup.addNewIssuerGroup(issuergroupName, descriptionText);

    // create issuer
    await issuers.createNewIssuer(issuerName, descriptionText);

    // create badgeclass
    await issuers.createRegularBadge(badgeName);

    // invite and accept new badgeclass admin
    await adminPage.managePage.userManagement.inviteUser(newBadgeAdminMail);
    await extraStaffLoginPage.loginDummyIdp(
      newBadgeAdminName,
      newBadgeAdminMail,
      institutionServer,
    );
    await extraStaffLoginPage.validateLoginSuccessful();

    // award badge and validate
    await extraStaffLoginPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentInfo.email,
    );
    await catalogPage.page.goto('');
    await catalogPage.page
      .getByRole('link', { name: 'Open your backpack' })
      .click();
    await catalogPage.loginStudentIdp(institution);
    await catalogPage.page.getByRole('link', { name: 'My backpack' }).click();
    await expect(catalogPage.page.getByText(badgeName)).toBeVisible();

    // reject badge and validate
    await catalogPage.reloadPage();
    await badgeLocator.getByText('View details to claim this edubadge').click();

    await catalogPage.page.getByRole('link', { name: 'Reject' }).click();
    await catalogPage.page.getByRole('link', { name: 'Confirm' }).click();

    await catalogPage.waitForLoadingToStop();

    await expect(
      catalogPage.page.getByText('Edubadge is rejected'),
    ).toBeVisible();
    await expect(badgeLocator).not.toBeVisible();
  },
);
