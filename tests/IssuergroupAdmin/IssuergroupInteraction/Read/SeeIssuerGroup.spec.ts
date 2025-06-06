import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See ${institution} issuer group`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO');
    await expect(institution != 'WO').toBeTruthy();

    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const existingGroupName = 'Science';
    const badgeclassMask = adminPage.page
      .locator('th')
      .getByText('Badge Classes');
    const dateMask = adminPage.page.getByText('Created ').locator('../..');
    const crumbMask = adminPage.page.locator('div.bread-crumb');

    // test
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await issuerGroup.searchWithText(existingGroupName);
    await issuerGroup.page
      .locator('td')
      .getByText(existingGroupName, { exact: true })
      .click();
    await adminPage.waitForLoadingToStop();

    await expect(adminPage.page).toHaveScreenshot(
      'SeeExistingIssuergroup.png',
      {
        mask: [dateMask, badgeclassMask, crumbMask],
      },
    );
  });
});
