import { expect, test } from '../../fixtures/loginFixture';
import { institution, institutions } from '../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Login ${institution} institution admin`,{annotation: [{type: 'Login with all institutions', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portaal. This navigates to the Issuer portal page.Log in with all institution. Navigation menu is loaded.'}]}, async ({
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
test('Logout WO institution admin',{annotation: [{type: 'Login with WO institution', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portaal. This navigates to the Issuer portal page. Log in with staff1. Logout.'}]}, async ({

  homePage, issuerPortalPage }) => {
  // var
  const loggedInMenu = issuerPortalPage.page.locator('.expand-menu');
  const navigation = issuerPortalPage.page.getByRole('navigation');
  const institution: institution = 'WO';

  // setup
  await homePage.openIssuerPortal();
  await issuerPortalPage.loginTestIdp(institution, 'Institution');

  await expect(loggedInMenu).toBeVisible();
  await expect(navigation).toBeVisible();

  // test
  await loggedInMenu.click();
  await loggedInMenu.getByText('Logout').click();

  // validation
  await expect(loggedInMenu).not.toBeVisible();
  await expect(navigation).not.toBeVisible();
});
