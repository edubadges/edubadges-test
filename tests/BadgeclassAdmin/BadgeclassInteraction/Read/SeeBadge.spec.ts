import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`,{annotation: [{type: 'Growth and devevlopement page is displayed', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portal. This navigates to the Issuer portal page. Log in with account. Enter Growth and development in the search field. Open the Growth and development page.'}]}, async ({ adminPage }) => {
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
