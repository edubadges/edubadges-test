import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach(institution => {
test(`Reject received ${institution} badge`, async ({ 
  backpackPage, 
  adminPage, 
}) => {
  // var
  const badgeName = 'Law and Politics';
  const studentAccount = await backpackPage.getStudentAccount(institution);

  // setup
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.directAwardBadgeToStudent(
    badgeName,
    studentAccount.email, studentAccount.EPPN,
  );

  await backpackPage.login(institution);

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
  const claimText = backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' });
  const succBar = backpackPage.page.getByText('Successfully claimed edubadge');
  const studentAccount = await backpackPage.getStudentAccount(institution);

  // setup
  await backpackPage.login(institution);
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.directAwardBadgeToStudent(
    badgeName,
    studentAccount.email, studentAccount.EPPN,
  );

  // test
  await backpackPage.reloadPage();
  await backpackPage.openBackpack();
  await unclaimedBadgeLocator.click();
  await backpackPage.page.waitForTimeout(500);
  await claimText.click();
  await backpackPage.page.waitForTimeout(500);
  await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

  // validate
  await expect(succBar).toBeVisible();
});
});
