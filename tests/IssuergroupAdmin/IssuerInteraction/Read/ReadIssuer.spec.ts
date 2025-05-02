import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See ${institution} issuer`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'WO' || institution == 'MBO' || institution == 'HBO',
    );
    expect(
      institution != 'WO' && institution != 'MBO' && institution != 'HBO',
    ).toBeTruthy();

    // var
    const issuer = adminPage.managePage.issuersPage;
    const existingGroupName = 'Medicine';
    const badgeInfoMask = adminPage.page.locator('div.info');
    const crumbMask = adminPage.page.locator('div.bread-crumb');

    // test
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await issuer.openIssuer(existingGroupName);
    await adminPage.waitForLoadingToStop();

    await expect(adminPage.page).toHaveScreenshot('SeeExistingIssuer.png', {
      mask: [badgeInfoMask, crumbMask],
    });
  });
});
