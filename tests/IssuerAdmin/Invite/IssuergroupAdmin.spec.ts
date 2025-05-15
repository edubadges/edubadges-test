import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to invite ${institution} Issuergroup admin invite`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'HBO' || institution == 'MBO');
    expect(institution != 'HBO' && institution != 'MBO').toBeTruthy();

    // var
    const issuerGroupCell = adminPage.page
      .locator('td')
      .getByText('Business', { exact: true });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    await expect(issuerGroupCell).not.toBeVisible();
  });
});
