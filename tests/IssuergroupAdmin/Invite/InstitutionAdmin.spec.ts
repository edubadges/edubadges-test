import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to invite ${institution} user as institution admin`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO' || institution == 'HBO');
    expect(institution != 'MBO' && institution != 'HBO').toBeTruthy();

    // var
    const addUserButton = adminPage.page.getByRole('link', {
      name: 'Invite new user',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();

    // test
    await expect(addUserButton).not.toBeVisible();
  });
});
