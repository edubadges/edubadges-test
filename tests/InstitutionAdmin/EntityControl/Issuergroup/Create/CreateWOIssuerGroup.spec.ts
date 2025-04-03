import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Create new WO issuer group', async ({
    woInstitutionAdminPage: woPage,
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
    const editButton = woPage.page.getByRole('link', { name: 'Edit issuer group' });
    const groupTitle = woPage.page.locator('.title').getByRole('heading');
    const description = woPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(newIssuerGroupName);
    await expect(description).toHaveText(descriptionText);
  });