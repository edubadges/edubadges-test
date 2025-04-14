import { expect, test } from '../../fixtures/loginFixture';
import { institution, institutions } from '../../util/loginPossibilities';

institutions.forEach(institution => {
test(`Login ${institution} institution admin`, async ({
  homePage,
  issuerPortalPage,
}) => {
  // login
  await homePage.navigateToHomePage();
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(institution, 'Institution');

  // validate success
  const expandMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigation = issuerPortalPage.page.getByRole('navigation');

  await expect(expandMenu).toBeVisible();
  await expect(navigation).toBeVisible();
});
});

// Only tested once because logging in is already tested 3 times
test('Logout WO institution admin', async ({
  homePage,
  issuerPortalPage,
  testdata,
}) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigation = issuerPortalPage.page.getByRole('navigation');
  const institution: institution = 'WO'

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(institution, 'Institution' );

  await expect(loggedInMenu).toBeVisible();
  await expect(navigation).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validation
  await expect(loggedInMenu).not.toBeVisible();
  await expect(navigation).not.toBeVisible();
});
