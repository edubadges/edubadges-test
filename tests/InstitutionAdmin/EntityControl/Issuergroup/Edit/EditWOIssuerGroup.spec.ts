import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Edit WO issuer group', async ({
    woPage,
  }) => {
    // var
    const initialIssuerGroupName = "FirstWOIssuerGroupName";
    const initialIssuerGroupDesc = "First description";
    const editedIssuerGroupName = "SecondWOIssuerGroupName";
    const editedIssuerGroupDesc = "Second description";

    const issuerGroup = woPage.managePage.issuerGroupPage;
    const editButtonLocator = woPage.page.getByRole('link', { name: 'Edit issuer group' });

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.AddNewIssuerGroup(initialIssuerGroupName, initialIssuerGroupDesc);
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await woPage.waitForLoadingToStop();

    // test
    await issuerGroup.EditExistingIssuerGroup(initialIssuerGroupName, editedIssuerGroupName, editedIssuerGroupDesc);
    
    // validate
    const groupTitleLocator = woPage.page.locator('.title').getByRole('heading');
    const descriptionLocator = woPage.page.locator('.info').locator('p').first();

    await expect(editButtonLocator).toBeVisible();
    await expect(groupTitleLocator).toHaveText(editedIssuerGroupName);
    await expect(descriptionLocator).toHaveText(editedIssuerGroupDesc);
  });