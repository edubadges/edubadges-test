import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Delete ${institution} issuer group`,{annotation: [{type: 'Delete issuer group', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to Issuer groups and select an existing group. Click "delete" and confirm. Verify the message "Successfully deleted issuer group".'}]}, async ({ adminPage }) => {
    // var
    var issuerGroupName = 'GroupToRemove';
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const newIssuerGroupDesc = 'This group was made to be removed';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    issuerGroupName = await issuerGroup.addNewIssuerGroup(
      issuerGroupName,
      newIssuerGroupDesc,
    );
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
