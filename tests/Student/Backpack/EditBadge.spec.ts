import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Reject accepted ${institution} badge`, async ({
    backpackPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Circulation and Breathing';
    const studentAccount = await backpackPage.getStudentAccount(institution);

    //setup
    await backpackPage.login(institution);
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentAccount.email,
      studentAccount.EPPN,
    );

    await backpackPage.reloadPage();
    await backpackPage.page.waitForTimeout(2000);
    await backpackPage.openBackpack();
    await backpackPage.claimReceivedBadge(badgeName);
    await backpackPage.page.waitForTimeout(2000);
    // test
    await backpackPage.rejectReceivedBadge(badgeName);
    // validate
    await expect(backpackPage.page.getByText('Rejected')).toBeVisible();
  });
});
