import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Create new ${institution} issuer`, async ({ adminPage }) => {
    // var
    const existingIssuergroupName = 'Medicine';
    const newIssuerName = 'New WO Issuer';
    const descriptionText = 'Test WO Issuer';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.managePage.issuerGroupPage.openIssuerGroup(
      existingIssuergroupName,
    );

    // test
    await issuers.createNewIssuer(newIssuerName, descriptionText);

    // validate
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer',
    });
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(newIssuerName);
    await expect(description).toHaveText(descriptionText);
  });
});
