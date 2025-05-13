import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'HBO');
    await expect(institution != 'HBO').toBeTruthy();

    // var
    const badgeName = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.badgeClassPage.searchWithText(badgeName);
    await adminPage.badgeClassPage.openBadge(badgeName);

    // validate
    const groupTitle = adminPage.page.locator('div.info').locator('h2');
    const breadcrumbs = adminPage.page.locator('.bread-crumb');

    await expect(groupTitle).toHaveText(badgeName);
    await expect(breadcrumbs.getByText(badgeName)).toBeVisible();
  });
});
