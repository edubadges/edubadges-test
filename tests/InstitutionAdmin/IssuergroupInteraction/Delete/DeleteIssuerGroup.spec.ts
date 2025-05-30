import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer group`, async ({ adminPage }) => {
    // var
    var issuerGroupName = 'GroupToRemove';
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const newIssuerGroupDesc = 'This group was made to be removed';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    issuerGroupName = await issuerGroup.addNewIssuerGroup(issuerGroupName, newIssuerGroupDesc);
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.waitForLoadingToStop();

    // test
    await issuerGroup.deleteExistingIssuerGroup(issuerGroupName);

    // validate
    await expect(
      adminPage.page.getByText('Successfully deleted issuer group'),
    ).toBeVisible();
  });
});
