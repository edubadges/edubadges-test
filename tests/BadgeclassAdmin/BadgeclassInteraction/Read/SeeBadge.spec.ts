import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // var
    const dateMask = adminPage.page.getByText('Created').locator('../..');
    const course = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.badgeClassPage.searchWithText(course);
    await adminPage.badgeClassPage.openBadge(course);

    // validate
    await expect(adminPage.page).toHaveScreenshot(
      `SeeBadgeAs${institution}BadgeclassAdmin.png`,
      {
        fullPage: true,
        mask: [dateMask],
      },
    );
  });
});
