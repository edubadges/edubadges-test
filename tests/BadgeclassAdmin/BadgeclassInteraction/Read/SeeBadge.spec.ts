import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'HBO');
    await expect(institution != 'HBO').toBeTruthy();
    
    // var
    const dateMask = adminPage.page.getByText('Created').locator('../..');
    const badgeName = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);

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
