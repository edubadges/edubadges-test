import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Create ${institution} issuer group`, async ({ adminPage }) => {
    // var
    var issuergroupName = 'IssuerGroupName';
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const issuergroupDesc = 'The description';

    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer group',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    issuergroupName = await issuerGroup.addNewIssuerGroup(
      issuergroupName,
      issuergroupDesc,
    );

    // validate
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(issuergroupName);
    await expect(description).toHaveText(issuergroupDesc);
  });
});
