import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See ${institution} issuer`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO');
    await expect(institution != 'WO').toBeTruthy();

    // var
    const issuer = adminPage.managePage.issuersPage;
    const existingGroupName = 'Computer Science';
    const badgeInfoMask = adminPage.page.locator('div.info');
    const crumbMask = adminPage.page.locator('div.bread-crumb');

    // test
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await issuer.openIssuer(existingGroupName);
    await adminPage.waitForLoadingToStop();

    await expect(adminPage.page).toHaveScreenshot('SeeExistingIssuer.png', {
      mask: [badgeInfoMask, crumbMask],
    });
  });
});
