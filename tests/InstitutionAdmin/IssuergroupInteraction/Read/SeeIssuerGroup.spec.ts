import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See ${institution} issuer group`,{annotation: [{type: 'See issuer group', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context, to navigate to the homepage and click the "Open the issuer portaal" button. The application navigates to the Issuer portal page. Log in with staff1. Navigate to Manage. Go to Issuer groups and select an existing group. Verify the details of the selected group.'}]}, async ({ adminPage }) => {
    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const existingGroupName = 'Science';
    const badgeclassMask = adminPage.page
      .locator('th')
      .getByText('Badge Classes');
    const dateMask = adminPage.page.getByText('Created ').locator('../..');
    const crumbMask = adminPage.page.locator('div.bread-crumb');

    // test
    await adminPage.loginTestIdp(institution, 'Institution');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();
    await issuerGroup.searchWithText(existingGroupName);
    await issuerGroup.page
      .locator('td')
      .getByText(existingGroupName, { exact: true })
      .click();
    await adminPage.waitForLoadingToStop();

    await expect(adminPage.page).toHaveScreenshot(
      'SeeExistingIssuergroup.png',
      {
        mask: [dateMask, badgeclassMask, crumbMask],
        maxDiffPixelRatio: 0.02,
      },
    );
  });
});
