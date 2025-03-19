import { expect, test } from '../../fixtures/studentFixture';

/* replaced by Student -> Catalog -> Request badge
test('Student can enroll in batch class', async ({ catalogPage }) => {
  await catalogPage.SearchForClass('Psychometrics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Psychometrics');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(500);
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeRequested.png');
});
*/

/* replaced by Teacher -> Student interaction -> Award badge
test('Teacher approve enrollment', async ({
  catalogPage,
  issuerPortalPage,
}) => {
  await catalogPage.SearchForClass('Group Dynamics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Group Dynamics');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(2000);

  await issuerPortalPage.SearchForClass('Group Dynamics');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage('Group Dynamics');
  await issuerPortalPage.rewardBadgeToStudent();
  await issuerPortalPage.page.waitForTimeout(5000);

  await catalogPage.OpenBackpack();
  await expect(
    catalogPage.page.getByText('New').locator('..').getByText('Group Dynamics'),
  ).toBeVisible();
});
*/