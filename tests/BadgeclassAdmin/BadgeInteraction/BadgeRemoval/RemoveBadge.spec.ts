import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test.skip(`Remove existing regular ${institution} badge`, async ({
    adminPage,
  }) => {
    // var
    const issuerGroupName = 'Medicine';
    const badgeName = 'Regular badge to delete, should be deleted';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await issuers.createRegularBadge(issuerGroupName, badgeName);

    // test
    await issuers.removeExistingBadge();

    // validate
    await issuers.searchWithText(badgeName);
    await expect(adminPage.page.locator('td')).toHaveCount(0);
  });

  test.skip(`Remove existing ${institution} micro credential`, async ({
    adminPage,
  }) => {
    // var
    const issuerGroupName = 'Medicine';
    const badgeName = 'Micro credential badge to delete, should be deleted';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await issuers.createMicroBadge(issuerGroupName, badgeName);

    // test
    await issuers.removeExistingBadge();

    // validate
    await issuers.searchWithText(badgeName);
    await expect(adminPage.page.locator('td')).toHaveCount(0);
  });

  test.skip(`Remove existing extra curricular ${institution} badge`, async ({
    adminPage,
  }) => {
    // var
    const issuerGroupName = 'Medicine';
    const badgeName = 'Extra curricular badge to delete, should be deleted';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await issuers.createExtracurricularBadge(issuerGroupName, badgeName);

    // test
    await issuers.removeExistingBadge();

    // validate
    await issuers.searchWithText(badgeName);
    await expect(adminPage.page.locator('td')).toHaveCount(0);
  });
});
