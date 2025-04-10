import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach(institution => {
test(`See badge in ${institution} staff page`, async ({
    adminPage 
  }) => {
  // var
  const dateMask = adminPage.page.getByText('Created').locator('../..');
  const course = 'Circulation and Breathing';

  // setup
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.searchWithText(course);
  await adminPage.badgeClassPage.openBadge(course);

  // validate
  await expect(adminPage.page).toHaveScreenshot(`SeeBadgeAs${institution}Teacher.png`, {
    fullPage: true,
    mask: [dateMask],
  });
});
});
