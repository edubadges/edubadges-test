import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Edit WO issuer', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const initialIssuerName = "Initial issuer name";
    const initialIssuerDesc = "Initial description";
    const editedIssuerName = "Edited issuer name";
    const editedIssuerDesc = "Second description";

    const issuers = woPage.managePage.issuersPage;
    const editButton = woPage.page.getByRole('link', { name: 'Edit issuer' });

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await issuers.createNewIssuer(initialIssuerName, initialIssuerDesc);

    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await woPage.waitForLoadingToStop();

    // test
    await issuers.editExistingIssuer(initialIssuerName, editedIssuerName, editedIssuerDesc);
    
    // validate
    const groupTitle = woPage.page.locator('.title').getByRole('heading');
    const description = woPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(editedIssuerName);
    await expect(description).toHaveText(editedIssuerDesc);
  });