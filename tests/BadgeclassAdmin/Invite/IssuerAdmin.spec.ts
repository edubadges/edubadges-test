import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to invite ${institution} issuer admin`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'HBO');
    await expect(institution != 'WO' && institution != 'HBO').toBeTruthy();

    // var
    const issuer = adminPage.page.getByRole('cell', {
      name: 'Political Science',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();

    // test
    await expect(issuer).not.toBeVisible();
  });
});
