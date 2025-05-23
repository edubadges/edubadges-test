import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer`, async ({ adminPage }) => {
    // var
    var issuerName = 'Issuer to remove';
    const existingIssuergroupName = 'Medicine';
    const newIssuerDesc = 'This issuer was made to be removed';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(
      existingIssuergroupName,
    );
    issuerName = await issuers.createNewIssuer(issuerName, newIssuerDesc);

    // test
    await issuers.deleteExistingIssuer(issuerName);

    // validate
    await expect(
      adminPage.page.getByText('Successfully deleted issuer'),
    ).toBeVisible();
  });
});
