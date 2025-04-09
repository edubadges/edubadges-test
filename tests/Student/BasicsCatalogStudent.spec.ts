import { expect, test } from '../../fixtures/studentFixture';

test('See existing badge logged in', async ({ catalogPage }) => {
  // var
  const course = 'Introduction to Psychology';
  const institution = 'harvard-example.edu';

  // setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);

  // test
  await catalogPage.page
    .getByRole('link', { name: 'Login to request this edubadge' })
    .click();
  await catalogPage.loginStudentIdp();
  await catalogPage.waitForLoadingToStop();

  // validate
  await expect(catalogPage.page).toHaveScreenshot('NotYetRequestedBadge.png');
});

test('Request badge', async ({ catalogPage }) => {
  // var
  const course = 'Group Dynamics';
  const institution = 'university-example.org';

  // setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);

  // test
  await catalogPage.requestEdubadge();
  await catalogPage.waitForLoadingToStop();

  // validate
  await expect(
    catalogPage.page.getByText(`successfully requested edubadge ${course}`),
  ).toBeVisible();
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeRequested.png');
});

// extends the first test (See existing badge logged in) by logging out
test('Log out from catalog', async ({ catalogPage }) => {
  // var
  const course = 'Introduction to Psychology';
  const institution = 'harvard-example.edu';

  // setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);
  await catalogPage.page
    .getByRole('link', { name: 'Login to request this edubadge' })
    .click();
  await catalogPage.loginStudentIdp();
  await catalogPage.waitForLoadingToStop();
  await expect(catalogPage.page).toHaveScreenshot('NotYetRequestedBadge.png');
  await catalogPage.page.goto('/catalog');

  // test
  await catalogPage.page.locator('.expand-menu').click();
  await catalogPage.page.getByText('Logout').click();
  await catalogPage.waitForLoadingToStop();

  // validate
  await expect(catalogPage.page.locator('.expand-menu')).not.toBeVisible();
});
