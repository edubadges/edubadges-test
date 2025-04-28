import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    test.fail(institution == 'WO' || institution == 'HBO' || institution == 'MBO');
    expect(institution != 'WO' && institution != 'HBO' && institution != 'MBO').toBeTruthy();
  
    // var
    const issuerName = 'Issuer to remove';
    const newIssuerDesc = 'This issuer was made to be removed';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
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
