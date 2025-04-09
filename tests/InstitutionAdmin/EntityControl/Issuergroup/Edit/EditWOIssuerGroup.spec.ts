import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Edit WO issuer group', async ({ woInstitutionAdminPage: woPage }) => {
  // var
  const initialIssuerGroupName = 'FirstWOIssuerGroupName';
  const initialIssuerGroupDesc = 'First description';
  const editedIssuerGroupName = 'SecondWOIssuerGroupName';
  const editedIssuerGroupDesc = 'Second description';

  const issuerGroup = woPage.managePage.issuerGroupPage;
  const editButton = woPage.page.getByRole('link', {
    name: 'Edit issuer group',
  });

  // setup
  await woPage.goToManage();
  await woPage.managePage.goToIssuerGroups();
  await issuerGroup.addNewIssuerGroup(
    initialIssuerGroupName,
    initialIssuerGroupDesc,
  );
  await woPage.goToManage();
  await woPage.managePage.goToIssuerGroups();
  await woPage.waitForLoadingToStop();

  // test
  await issuerGroup.editExistingIssuerGroup(
    initialIssuerGroupName,
    editedIssuerGroupName,
    editedIssuerGroupDesc,
  );

  // validate
  const groupTitle = woPage.page.locator('.title').getByRole('heading');
  const description = woPage.page.locator('.info').locator('p').first();

  await expect(editButton).toBeVisible();
  await expect(groupTitle).toHaveText(editedIssuerGroupName);
  await expect(description).toHaveText(editedIssuerGroupDesc);
});
