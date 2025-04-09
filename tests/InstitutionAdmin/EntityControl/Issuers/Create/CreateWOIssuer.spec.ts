import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Create new WO issuer', async ({ woInstitutionAdminPage: woPage }) => {
  // var
  const newIssuerName = 'New WO Issuer';
  const descriptionText = 'Test WO Issuergroup';
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await woPage.managePage.goToIssuers();

  // test
  await issuers.createNewIssuer(newIssuerName, descriptionText);

  // validate
  const editButton = woPage.page.getByRole('link', { name: 'Edit issuer' });
  const groupTitle = woPage.page.locator('.title').getByRole('heading');
  const description = woPage.page.locator('.info').locator('p').first();

  await expect(editButton).toBeVisible();
  await expect(groupTitle).toHaveText(newIssuerName);
  await expect(description).toHaveText(descriptionText);
});
