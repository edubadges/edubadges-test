import { expect, test } from '../../../../../fixtures/staffFixture';
import { institutions } from '../../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer`, async ({ adminPage }) => {
    // var
    const issuerName = 'Issuer to remove';
    const newIssuerDesc = 'This issuer was made to be removed';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await issuers.createNewIssuer(issuerName, newIssuerDesc);
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await adminPage.waitForLoadingToStop();

    // test
    await issuers.deleteExistingIssuer(issuerName);

    // validate
    await expect(
      adminPage.page.getByText('Successfully deleted issuer'),
    ).toBeVisible();
  });
});
