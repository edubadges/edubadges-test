import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const existingIssuergroupName = 'Medicine';
    const issuerName = 'Issuer to remove';
    const newIssuerDesc = 'This issuer was made to be removed';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(existingIssuergroupName)
    await issuers.createNewIssuer(issuerName, newIssuerDesc);

    // test
    await issuers.deleteExistingIssuer(issuerName);

    // validate
    await expect(
      adminPage.page.getByText('Successfully deleted issuer'),
    ).toBeVisible();
  });
});
