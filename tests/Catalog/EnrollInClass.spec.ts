import { expect, test } from '../../fixtures/catalogFixture';

test('Student can enroll in batch class', async ({ catalogPage, page }) => {
  await catalogPage.SearchForClass('Psychometrics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Psychometrics');
  await catalogPage.RequestEdubadge();
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot('eduBadgeRequested.png');
});
