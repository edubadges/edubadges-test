import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';


test('Remove existing edubadge', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const issuerGroupName = "Medicine";
    const badgeName = "BadgeName to delete, should be deleted";
    const issuers = woPage.managePage.issuersPage;
  
    // setup
    await woPage.goToManage();
    await issuers.createRegularBadge(issuerGroupName, badgeName);
  
    // test
    await issuers.removeExistingBadge();

    // validation
    await issuers.searchWithText(badgeName);
    await expect(woPage.page.locator('td')).toHaveCount(0);
  });