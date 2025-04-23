import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test.fail(`Try to invite ${institution} user as institution admin`, async ({ adminPage }) => {
    // var
    const userManagement = adminPage.managePage.userManagement;
    const newUserMail = `userToInvite@${institution}mail.edu`;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToUserManagement();

    // test, should fail here
    await userManagement.inviteUser(newUserMail);

    // validate
    await expect(
      adminPage.page.getByText(`Successfully invited ${newUserMail}`),
    ).toBeVisible();
  });
});
