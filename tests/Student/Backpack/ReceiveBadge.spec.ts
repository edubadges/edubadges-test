import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach(institution => {
test(`Reject received ${institution} badge`, async ({ 
  backpackPage, 
  adminPage, 
}) => {
  // var
  const badgeName = 'Law and Politics';

  // setup
  await backpackPage.login(institution);
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.directAwardBadgeToStudent(badgeName);

  // test
  await backpackPage.rejectReceivedBadge(badgeName);

  // validate
  await expect(
    backpackPage.page.getByText('Edubadge is rejected'),
  ).toBeVisible();
});

test(`Accept received ${institution} badge`, async ({ 
  backpackPage, 
  adminPage,
}) => {
  // var
  const badgeName = 'Introduction to Psychology';
  const unclaimedBadgeLocator = backpackPage.page
    .getByText(badgeName)
    .locator('../../..')
    .getByText('View details to claim this edubadge');

  // setup
  await adminPage.badgeClassPage.directAwardBadgeToStudent(badgeName);

  // test
  await backpackPage.reloadPage();
  await backpackPage.openBackpack();
  await unclaimedBadgeLocator.click();
  await backpackPage.page.waitForTimeout(500);
  await backpackPage.page
    .getByRole('link', { name: 'Claim & Add to your backpack' })
    .click();
  await backpackPage.page.waitForTimeout(500);
  await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

  // validate
  await expect(
    backpackPage.page.getByText('Successfully claimed edubadge'),
  ).toBeVisible();
});
});
