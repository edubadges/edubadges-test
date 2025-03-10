import { expect, test } from '../../fixtures/catalogFixture';

test('Look at a badge', async ({
    catalogPage,
}) => {
// var
  const course = "Group dynamics";
  const institution = "university-example.org";

  // test
  await catalogPage.SearchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(1000);
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeRequested.png');
});