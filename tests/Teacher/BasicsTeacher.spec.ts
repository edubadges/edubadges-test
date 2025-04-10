import { expect, test } from '../../fixtures/loginFixture';
import { institutions } from '../../util/loginPossibilities';

institutions.forEach(institution => {

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

test(`Logout from ${institution}`, async ({ homePage, issuerPortalPage }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigationHeader = issuerPortalPage.page.getByRole('navigation');

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
});
