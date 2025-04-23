import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test.fail(`Try to create new ${institution} issuer`, async ({ adminPage }) => {
    // var
    const newIssuerName = 'New WO Issuer';
    const descriptionText = 'Test WO Issuergroup';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuers();

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
