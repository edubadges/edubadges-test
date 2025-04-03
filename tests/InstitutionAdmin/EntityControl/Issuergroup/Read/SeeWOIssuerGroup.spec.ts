import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('See WO issuer group', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const existingGroupName = "Science";
    const issuerGroup = woPage.managePage.issuerGroupPage;
    const badgeclassMask = woPage.page.locator('th').getByText('Badge Classes');
    const dateMask = woPage.page.getByText('Created ').locator('../..');

    // test
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.searchWithText(existingGroupName);
    await issuerGroup.page.locator('td').getByText(existingGroupName, { exact: true }).click();
    await woPage.waitForLoadingToStop();

    await expect(woPage.page).toHaveScreenshot('See existing issuer group.png', { mask: [dateMask, badgeclassMask] });
  });