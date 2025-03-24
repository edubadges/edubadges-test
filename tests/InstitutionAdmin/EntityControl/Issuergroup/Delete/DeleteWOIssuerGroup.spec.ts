import { expect, test } from '../../../../../fixtures/staffFixtures/staffWOFixture';

test('Delete WO issuer group', async ({
    woPage,
  }) => {
    // var
    const issuerGroupName = "GroupToRemove";
    const newIssuerGroupDesc = "This group was made to be removed";
    const issuerGroup = woPage.managePage.issuerGroupPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.AddNewIssuerGroup(issuerGroupName, newIssuerGroupDesc);
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await woPage.waitForLoadingToStop();

    // test
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.DeleteExistingIssuerGroup(issuerGroupName);

    // validate
    await expect(woPage.page.getByText('Successfully deleted issuer group')).toBeVisible();
  });