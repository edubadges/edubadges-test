import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Remove existing regular WO badge', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const badgeName = 'Regular badge to delete, should be deleted';
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await issuers.createRegularBadge(issuerGroupName, badgeName);

  // test
  await issuers.removeExistingBadge();

  // validate
  await issuers.searchWithText(badgeName);
  await expect(woPage.page.locator('td')).toHaveCount(0);
});

test('Remove existing WO micro credential', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const badgeName = 'Micro credential badge to delete, should be deleted';
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await issuers.createMicroBadge(issuerGroupName, badgeName);

  // test
  await issuers.removeExistingBadge();

  // validate
  await issuers.searchWithText(badgeName);
  await expect(woPage.page.locator('td')).toHaveCount(0);
});

test('Remove existing extra curricular WO badge', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const badgeName = 'Extra curricular badge to delete, should be deleted';
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await issuers.createExtracurricularBadge(issuerGroupName, badgeName);

  // test
  await issuers.removeExistingBadge();

  // validate
  await issuers.searchWithText(badgeName);
  await expect(woPage.page.locator('td')).toHaveCount(0);
});
