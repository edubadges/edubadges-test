import { expect, test } from '../../../fixtures/studentFixture';

test('Make edubadge public', async ({
  catalogPage,
  backpackPage,
  woTeacherPage,
}) => {
  //var
  const course = 'Introduction to Political Science';
  const institution = 'university-example.org';

  //setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);
  await catalogPage.requestEdubadge();

  await woTeacherPage.badgeClassPage.approveRequest(course);

  await backpackPage.openBackpack();
  await backpackPage.reloadPage();
  await backpackPage.openBadge(course);

  // test
  await expect(
    backpackPage.page.getByRole('link', { name: 'Share' }),
  ).toHaveAttribute('disabled', 'true');
  await expect(backpackPage.page.locator('.slider')).toBeChecked();

  await backpackPage.makeEdubadgePublic(course);

  await expect(
    backpackPage.page.getByRole('link', { name: 'Share' }),
  ).toHaveAttribute('disabled', 'false');
  await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
  await expect(backpackPage.page).toHaveScreenshot(
    'Successfully made badge public.png',
  );
});

// known issue on the verification of the public badge
test.skip('Share public edubadge', async ({
  catalogPage,
  backpackPage,
  woTeacherPage,
}) => {
  //var
  const course = 'History of Political Thought';
  const institution = 'university-example.org';

  //setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);
  await catalogPage.requestEdubadge();

  await woTeacherPage.badgeClassPage.approveRequest(course);

  await backpackPage.openBackpack();
  await backpackPage.reloadPage();
  await backpackPage.makeEdubadgePublic(course);

  await backpackPage.page.getByRole('link', { name: 'Share' }).waitFor();
  await expect(backpackPage.page.locator('.slider')).not.toBeChecked();

  // test
  const url = await backpackPage.getShareLink();
  await backpackPage.validateBadge(url);
});
