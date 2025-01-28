import { expect, test } from '../../fixtures/catalogFixture';

test('Student can enroll in batch class', async ({ catalogPage, page }) => {
  await catalogPage.SearchForClass('Psychometrics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Psychometrics');
  await catalogPage.RequestEdubadge();
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot('eduBadgeRequested.png');
});

test('Teacher approve enrollment', async ({
  catalogPage,
  issuerPortalPage,
}) => {
  //different badge
  await catalogPage.SearchForClass('Group Dynamics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Group Dynamics');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(5000);

  //await issuerPortalPage.refresh();
  await issuerPortalPage.SearchForClass('Group Dynamics');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage('Group Dynamics');
  await issuerPortalPage.rewardBadgeToStudent();
  await issuerPortalPage.page.waitForTimeout(5000);

  await catalogPage.OpenBackpack();
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png');
});
