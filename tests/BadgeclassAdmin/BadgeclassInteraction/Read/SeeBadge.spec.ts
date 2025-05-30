import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // var
    const badgeName = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);

    // validate
    const badgeNameLocator = adminPage.page.locator('div.info').locator('h2');
    const breadcrumbs = adminPage.page.locator('.bread-crumb');

    await expect(badgeNameLocator).toHaveText(badgeName);
    await expect(breadcrumbs.getByText(badgeName)).toBeVisible();
  });
});
