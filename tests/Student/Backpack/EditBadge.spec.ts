import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach(institution => {
test(`Reject accepted ${institution} badge`, async ({ 
  backpackPage, 
  adminPage, 
}) => {
  // var
  const badgeName = 'Circulation and Breathing';

  //setup
  await backpackPage.login(institution);
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.directAwardBadgeToStudent(badgeName);

  await backpackPage.reloadPage();
  await backpackPage.openBackpack();
  await backpackPage.claimReceivedBadge(badgeName);

  // test
  await backpackPage.page
    .getByRole('link', { name: 'Reject this edubadge' })
    .click();
  await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

  // validate
  await expect(backpackPage.page.getByText('Rejected')).toBeVisible();
});
});