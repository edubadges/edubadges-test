import { expect, test } from '../../../../../fixtures/staffFixture';
import { institutions } from '../../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Create new ${institution} issuer group`, async ({ adminPage }) => {
    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const newIssuerGroupName = 'NewWOIssuerGroup';
    const descriptionText = 'Test WO Issuergroup';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    await issuerGroup.addNewIssuerGroup(newIssuerGroupName, descriptionText);

    // validate
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer group',
    });
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(newIssuerGroupName);
    await expect(description).toHaveText(descriptionText);
  });
});
