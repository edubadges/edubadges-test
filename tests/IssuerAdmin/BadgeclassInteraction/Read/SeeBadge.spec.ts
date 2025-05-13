import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // var
    const dateMask = adminPage.page.getByText('Created').locator('../..');
    const badgeName = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);

    // validate
    await expect(adminPage.page).toHaveScreenshot(
      `SeeBadgeAs${institution}IssuerAdmin.png`,
      {
        fullPage: true,
        mask: [dateMask],
      },
    );
  });
});
