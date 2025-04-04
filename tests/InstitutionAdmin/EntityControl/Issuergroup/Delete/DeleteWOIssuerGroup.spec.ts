import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Delete WO issuer group', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const issuerGroupName = "GroupToRemove";
    const newIssuerGroupDesc = "This group was made to be removed";
    const issuerGroup = woPage.managePage.issuerGroupPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.addNewIssuerGroup(issuerGroupName, newIssuerGroupDesc);
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await woPage.waitForLoadingToStop();

    // test
    await issuerGroup.deleteExistingIssuerGroup(issuerGroupName);

    // validate
    await expect(woPage.page.getByText('Successfully deleted issuer group')).toBeVisible();
  });