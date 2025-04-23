import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Issuer admin cannot create new ${institution} issuer group`, async ({ adminPage }) => {
    // var
    const addIsssuergroupButton = adminPage.page.getByRole('link', {
      name: 'Add new issuer group',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    await expect(addIsssuergroupButton).not.toBeVisible();
  });
});
