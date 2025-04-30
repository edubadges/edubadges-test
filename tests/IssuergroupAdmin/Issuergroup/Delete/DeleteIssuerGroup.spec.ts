import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer group`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'WO' || institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'WO' && institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const issuerGroupName = 'GroupToRemove';
    const newIssuerGroupDesc = 'This group was made to be removed';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await issuerGroup.addNewIssuerGroup(issuerGroupName, newIssuerGroupDesc);
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
