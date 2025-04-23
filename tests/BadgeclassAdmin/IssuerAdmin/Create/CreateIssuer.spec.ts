import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Try to create new ${institution} issuer`, async ({ adminPage }) => {
    // var
    const addNewIssuerButton = adminPage.page.getByRole('link', {
      name: 'Add new issuer',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();

    // test
    await expect(addNewIssuerButton).not.toBeVisible();
  });
});
