import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Create new ${institution} issuer`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'WO' || institution == 'HBO' || institution == 'MBO');
    expect(institution != 'WO' && institution != 'HBO' && institution != 'MBO').toBeTruthy();
  
    // var
    const newIssuerName = 'New WO Issuer';
    const descriptionText = 'Test WO Issuergroup';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
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
