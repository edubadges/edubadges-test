import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to invite ${institution} issuer admin`,{annotation: [{type: 'Login with MBO and go Issuer page', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portal. This navigates to the Issuer portal page. Log in with professor2.'}]}, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'HBO');
    await expect(institution != 'WO' && institution != 'HBO').toBeTruthy();

    // var
    const issuer = adminPage.page.getByRole('cell', {
      name: 'Political Science',
    });

    // setup
    await adminPage.page.waitForTimeout(2000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();

    // test
    await expect(issuer).not.toBeVisible();
  });
});
