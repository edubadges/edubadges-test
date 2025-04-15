import { expect, test } from '../../../../../fixtures/staffFixture';
import { institutions } from '../../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit ${institution} issuer`, async ({ adminPage }) => {
    // var
    const initialIssuerName = 'Initial issuer name';
    const initialIssuerDesc = 'Initial description';
    const editedIssuerName = 'Edited issuer name';
    const editedIssuerDesc = 'Second description';

    const issuers = adminPage.managePage.issuersPage;
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await issuers.createNewIssuer(initialIssuerName, initialIssuerDesc);

    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();
    await adminPage.waitForLoadingToStop();

    // test
    await issuers.editExistingIssuer(
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
