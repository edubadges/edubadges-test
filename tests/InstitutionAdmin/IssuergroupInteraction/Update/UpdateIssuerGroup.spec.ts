import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit ${institution} issuer group`,{annotation: [{type: 'Edit issuer group', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to Issuer groups and select an existing group. Click "edit" and update the details. Verify the updated information.'}]}, async ({ adminPage }) => {
    // var
    var initialIssuerGroupName = 'InitialIssuerGroupName';
    var editedIssuerGroupName = 'SecondIssuerGroupName';
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const initialIssuerGroupDesc = 'First description';
    const editedIssuerGroupDesc = 'Second description';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    initialIssuerGroupName = await issuerGroup.addNewIssuerGroup(
      initialIssuerGroupName,
      initialIssuerGroupDesc,
    );
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await adminPage.waitForLoadingToStop();

    // test
    editedIssuerGroupName = await issuerGroup.editExistingIssuerGroup(
      initialIssuerGroupName,
      editedIssuerGroupName,
      editedIssuerGroupDesc,
    );

    // validate
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(groupTitle).toBeVisible();
    await expect(groupTitle).toHaveText(editedIssuerGroupName);
    await expect(description).toHaveText(editedIssuerGroupDesc);
  });
});
