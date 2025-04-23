import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit ${institution} issuer group`, async ({ adminPage }) => {
    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const initialIssuerGroupName = 'FirstIssuerGroupName';
    const initialIssuerGroupDesc = 'First description';
    const editedIssuerGroupName = 'SecondIssuerGroupName';
    const editedIssuerGroupDesc = 'Second description';

    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer group',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await issuerGroup.addNewIssuerGroup(
      initialIssuerGroupName,
      initialIssuerGroupDesc,
    );
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.waitForLoadingToStop();

    // test
    await issuerGroup.editExistingIssuerGroup(
      initialIssuerGroupName,
      editedIssuerGroupName,
      editedIssuerGroupDesc,
    );

    // validate
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(editedIssuerGroupName);
    await expect(description).toHaveText(editedIssuerGroupDesc);
  });
});
