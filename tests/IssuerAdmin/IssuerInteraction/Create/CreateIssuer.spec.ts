import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Issuer admin cannot create new ${institution} issuer`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'HBO' || institution == 'MBO');
    expect(institution != 'HBO' && institution != 'MBO').toBeTruthy();

    // var
    const newIssuerButton = adminPage.page.getByRole('link', {
      name: 'Add new issuer',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();

    // test
    await expect(newIssuerButton).not.toBeVisible();
  });
});
