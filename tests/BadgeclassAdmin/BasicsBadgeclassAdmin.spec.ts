import { expect, test } from '../../fixtures/loginFixture';
import { institutions } from '../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Login at ${institution}`, async ({ homePage, issuerPortalPage }) => {
    // var
    const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
    const navigationHeader = issuerPortalPage.page.getByRole('navigation');

    // test
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(institution, 'Badgeclass');

    // validate
    await expect(loggedInMenu).toBeVisible();
    await expect(navigationHeader).toBeVisible();
  });
});

// Only test logout once
test(`Logout from WO`, async ({ homePage, issuerPortalPage }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigationHeader = issuerPortalPage.page.getByRole('navigation');
  const institution = 'WO';

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(institution, 'Badgeclass');
  await expect(loggedInMenu).toBeVisible();
  await expect(navigationHeader).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validate
  await expect(loggedInMenu).not.toBeVisible();
  await expect(navigationHeader).not.toBeVisible();
});

test('See staff subpages', async ({ homePage, issuerPortalPage }) => {
  // var

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp('WO', 'Badgeclass');

  // test
  await issuerPortalPage.goToBadgeClasses();
  await issuerPortalPage.badgeClassPage.expectBadgeclassesPage();

  await issuerPortalPage.goToManage();
  await issuerPortalPage.managePage.expectManagePage();

  await issuerPortalPage.goToUsers();
  await issuerPortalPage.usersPage.expectUsersPage();

  await issuerPortalPage.goToInsights();
  await issuerPortalPage.insightsPage.expectInsightsPage();
});
