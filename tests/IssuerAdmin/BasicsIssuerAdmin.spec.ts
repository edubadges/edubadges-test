import { expect, test } from '../../fixtures/loginFixture';
import { institution, institutions } from '../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Login ${institution} issuer admin`, async ({
    homePage,
    issuerPortalPage,
  }) => {
    // test
    await homePage.openIssuerPortal();
    await issuerPortalPage.loginTestIdp(institution, 'Issuer');

    // validate
    await expect(issuerPortalPage.page.locator('.expand-menu')).toBeVisible();
    await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();
  });
});

// Only tested once because logging in is already tested 3 times
test('Logout WO issuer group admin', async ({ homePage, issuerPortalPage }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const institution: institution = 'WO';

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(institution, 'Issuer');
  await expect(loggedInMenu).toBeVisible();
  await expect(issuerPortalPage.page.getByRole('navigation')).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validate
  await expect(loggedInMenu).not.toBeVisible();
  await expect(issuerPortalPage.page.getByRole('navigation')).not.toBeVisible();
});
