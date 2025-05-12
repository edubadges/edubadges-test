import { expect, test } from '../../fixtures/studentFixture';
import {
  institution,
  institutionsWithoutHBO,
} from '../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`See existing ${institution} badge logged in`, async ({
    catalogPage,
  }) => {
    // var
    const course = 'Research Methods';
    const breadcrumbs = catalogPage.page.locator('div.bread-crumb');
    const badgeInfo = catalogPage.page.locator('.content');

    // setup
    await catalogPage.searchWithText(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(course);

    // test
    await catalogPage.page
      .getByRole('link', { name: 'Login to request this edubadge' })
      .click();
    await catalogPage.loginStudentIdp(institution);
    await catalogPage.waitForLoadingToStop();

    // validate
    await expect(catalogPage.page).toHaveScreenshot(
      'NotYetRequestedBadge.png',
      { mask: [breadcrumbs, badgeInfo] },
    );
  });

  test(`Request ${institution} badge`, async ({ catalogPage }) => {
    // var
    const course = 'Group Dynamics';
    const succBar = catalogPage.page.getByText(
      `successfully requested edubadge ${course}`,
    );

    // setup
    await catalogPage.searchWithText(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(course);

    // test
    await catalogPage.requestEdubadge(institution);
    await catalogPage.waitForLoadingToStop();

    // validate
    await expect(succBar).toBeVisible();
  });
});

// only runs once because logging in is tested in a previous test
test('Log out from catalog', async ({ catalogPage }) => {
  // var
  const course = 'Introduction to Psychology';
  const institution: institution = 'WO';

  // setup
  await catalogPage.searchWithText(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openBadge(course);
  await catalogPage.page
    .getByRole('link', { name: 'Login to request this edubadge' })
    .click();
  await catalogPage.loginStudentIdp(institution);
  await catalogPage.waitForLoadingToStop();
  await catalogPage.page.goto('/catalog');

  // test
  await catalogPage.page.locator('.expand-menu').click();
  await catalogPage.page.getByText('Logout').click();
  await catalogPage.waitForLoadingToStop();

  // validate
  await expect(catalogPage.page.locator('.expand-menu')).not.toBeVisible();
});
