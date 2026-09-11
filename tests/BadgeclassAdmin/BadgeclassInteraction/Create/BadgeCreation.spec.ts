import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`${institution} badgeclass admin cannot create a badge`,{annotation: [{type: 'MBO cant create new badge class', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portal. This navigates to the Issuer portal page.Log in with professor2.Enter Growth and development in the search field. Open the Growth and development page.Click on manage and verify that "add new badge class" is not available.'}]},  async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'HBO');
    await expect(institution != 'WO' && institution != 'HBO').toBeTruthy();

    // var
    const existingBadge = 'Growth and development';
    const issuerBreadcrumb = adminPage.page
      .locator('[href*="/manage/issuer/"]')
      .first();
    const newBadgeButton = adminPage.page.getByRole('link', {
      name: 'Add new badge class',
    });

    // setup
    await adminPage.page.waitForTimeout(2000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');
  
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.searchWithText(existingBadge);
    await adminPage.badgeClassPage.openBadge(existingBadge);

    // test
    await issuerBreadcrumb.click();
    await adminPage.waitForLoadingToStop();
    await expect(newBadgeButton).not.toBeVisible();
  });
});
