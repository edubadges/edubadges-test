import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Create new WO issuer group', async ({
    woPage,
  }) => {
    // var
    const newIssuerGroupName = 'NewWOIssuerGroup';
    const descriptionText = "Test WO Issuergroup";
    const issuerGroup = woPage.managePage.issuerGroupPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();

    // test
    await issuerGroup.AddNewIssuerGroup(newIssuerGroupName, descriptionText);

    // validate
    const editButtonLocator = woPage.page.getByRole('link', { name: 'Edit issuer group' });
    const groupTitleLocator = woPage.page.locator('.title').getByRole('heading');
    const descriptionLocator = woPage.page.locator('.info').locator('p').first();

    await expect(editButtonLocator).toBeVisible();
    await expect(groupTitleLocator).toHaveText(newIssuerGroupName);
    await expect(descriptionLocator).toHaveText(descriptionText)
  });