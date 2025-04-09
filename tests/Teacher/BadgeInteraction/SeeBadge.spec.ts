import { expect, test } from '../../../fixtures/staffFixtures/staffMboFixture';

test('See badge in MBO staff page', async ({ mboPage }) => {
  // var
  const dateMask = mboPage.page.getByText('Created').locator('../..');
  const course = 'Circulation and Breathing';

  // setup
  await mboPage.badgeClassPage.searchWithText(course);
  await mboPage.badgeClassPage.openBadge(course);

  // validate
  await expect(mboPage.page).toHaveScreenshot('SeeBadgeAsTeacher.png', {
    fullPage: true,
    mask: [dateMask],
  });
});
