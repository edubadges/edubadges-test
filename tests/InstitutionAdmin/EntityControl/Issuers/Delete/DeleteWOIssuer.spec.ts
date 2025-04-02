import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Delete WO issuer', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const issuerName = "Issuer to remove";
    const newIssuerDesc = "This issuer was made to be removed";
    const issuers = woPage.managePage.issuersPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await issuers.createNewIssuer(issuerName, newIssuerDesc);
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await woPage.waitForLoadingToStop();

    // test
    await issuers.deleteExistingIssuer(issuerName);

    // validate
    await expect(woPage.page.getByText('Successfully deleted issuer')).toBeVisible();
  });