import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`${institution} badgeclass admin cannot create a badge`, async ({
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
