import { expect, test } from '../../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('See WO issuer', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const existingGroupName = "Computer Science";
    const issuer = woPage.managePage.issuersPage;
    const maskBadgeClass = woPage.page.locator('th').getByText('Badge Classes');
    const maskDate = woPage.page.getByText('Created ').locator('../..');

    // test
    await woPage.goToManage();
    await woPage.managePage.goToIssuers();
    await issuer.openIssuer(existingGroupName);
    await woPage.waitForLoadingToStop();

    await expect(woPage.page).toHaveScreenshot('SeeExistingWOIssuer.png', { mask: [maskDate, maskBadgeClass] });
  });