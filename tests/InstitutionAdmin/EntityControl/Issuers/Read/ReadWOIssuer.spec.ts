import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('See WO issuer', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const existingGroupName = "Computer Science";
    const issuer = woPage.managePage.issuersPage;
    const badgeclassMask = woPage.page.locator('th').getByText('Badge Classes');
    const dateMask = woPage.page.getByText('Created ').locator('../..');

    // test
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await issuer.openIssuer(existingGroupName);
    await woPage.waitForLoadingToStop();

    await expect(woPage.page).toHaveScreenshot('SeeExistingWOIssuer.png', { mask: [dateMask, badgeclassMask] });
  });