import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Create new WO issuer', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const newIssuerName = 'New WO Issuer';
    const descriptionText = "Test WO Issuergroup";
    const issuers = woPage.managePage.issuersPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();

    // test
    await issuers.createNewIssuer(newIssuerName, descriptionText)

    // validate
    const editButtonLocator = woPage.page.getByRole('link', { name: 'Edit issuer' });
    const groupTitleLocator = woPage.page.locator('.title').getByRole('heading');
    const descriptionLocator = woPage.page.locator('.info').locator('p').first();

    await expect(editButtonLocator).toBeVisible();
    await expect(groupTitleLocator).toHaveText(newIssuerName);
    await expect(descriptionLocator).toHaveText(descriptionText)
  });