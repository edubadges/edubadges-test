import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Issuergroup admin cannot create ${institution} issuer group`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'MBO',
    );
    expect(
      institution != 'MBO',
    ).toBeTruthy();

    // var
    const newIssuergroupButton = adminPage.page.getByRole('link', {
      name: 'Add new issuer group',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    await expect(newIssuergroupButton).not.toBeVisible();
  });
});
