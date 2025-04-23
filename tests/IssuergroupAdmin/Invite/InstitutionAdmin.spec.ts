import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to invite ${institution} user as institution admin`, async ({ adminPage }) => {
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
