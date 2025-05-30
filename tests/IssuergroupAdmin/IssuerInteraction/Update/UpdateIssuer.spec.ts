import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit ${institution} issuer`, async ({ adminPage }) => {
    // var
    var initialIssuerName = 'Initial issuer name';
    var editedIssuerName = 'Edited issuer name';
    const issuergroupName = 'Medicine';
    const initialIssuerDesc = 'Initial description';
    const editedIssuerDesc = 'Second description';

    const issuers = adminPage.managePage.issuersPage;
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(issuergroupName);
    initialIssuerName = await issuers.createNewIssuer(
      initialIssuerName,
      initialIssuerDesc,
    );

    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await adminPage.waitForLoadingToStop();

    // test
    editedIssuerName = await issuers.editExistingIssuer(
      initialIssuerName,
      editedIssuerName,
      editedIssuerDesc,
    );

    // validate
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(editedIssuerName);
    await expect(description).toHaveText(editedIssuerDesc);
  });
});
