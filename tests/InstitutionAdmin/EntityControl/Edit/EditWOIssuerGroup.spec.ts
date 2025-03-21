import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Edit WO issuer group', async ({
    woPage,
  }) => {
    // var
    const newIssuerGroupName = "FirstWOIssuerGroupName";
    const newIssuerGroupDesc = "First description";
    const editedIssuerGroupName = "SecondWOIssuerGroupName";
    const editedIssuerGroupDesc = "Second description";
    const issuerGroup = woPage.managePage.issuerGroupPage;
    const editButtonLocator = woPage.page.getByRole('link', { name: 'Edit issuer group' });

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.AddNewIssuerGroup(newIssuerGroupName, newIssuerGroupDesc);
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await woPage.waitForLoadingToStop();

    // test
    await issuerGroup.EditExistingIssuerGroup(newIssuerGroupName, editedIssuerGroupName, editedIssuerGroupDesc);
    
    // validate
    const groupTitleLocator = woPage.page.locator('.entity.title').locator('h2');
    const descriptionLocator = woPage.page.locator('.info').locator('p');

    await expect(editButtonLocator).toBeVisible();
    await expect(groupTitleLocator).toHaveText(newIssuerGroupName);
    await expect(descriptionLocator).toHaveText(newIssuerGroupDesc)
  });