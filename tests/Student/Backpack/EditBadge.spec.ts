import { expect, test } from '../../../fixtures/studentFixture';

// TODO: Make public, Share, Make private

test('Reject accepted badge', async ({ backpackPage, woTeacherPage }) => {
  // var
  const badgeName = 'Circulation and Breathing';

  //setup
  await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(badgeName);

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
