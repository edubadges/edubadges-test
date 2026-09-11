import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Create ${institution} issuer group`,{annotation: [{type: 'Create issuer group', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to User management and select the Issuer groups tab. Click "add new issuer groep". Fill in the details and save it. Verify the "Edit issuer group" button.'}]}, async ({ adminPage }) => {
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
