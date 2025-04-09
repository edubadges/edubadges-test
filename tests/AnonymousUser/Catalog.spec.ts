import { expect, test } from '../../fixtures/studentFixture';

test('See homepage', async ({ catalogPage }) => {
  // var
  const maskedLocators = [
    catalogPage.page
      .getByText(' Badge Classes')
      .first()
      .locator('../../..'),
  ];

  // test
  await catalogPage.page.goto('');

  // validate
  await expect(catalogPage.page).toHaveScreenshot(
    'expectedHomePageOpened-eng.png',
    {
      fullPage: true,
      mask: maskedLocators,
    },
  );
});

test('Search for non existing badge', async ({ catalogPage }) => {
  // var
  const course = 'I do not exist` this course is not real?';

  // test
  await catalogPage.searchForClass(course);

  // validate
  await expect(catalogPage.page).toHaveScreenshot('emptyCatalogPage.png');
});

test('Look at existing badge', async ({ catalogPage }) => {
  // var
  const course = 'Group Dynamics';
  const institution = 'harvard-example.edu';

  // test
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);

  // validate
  await expect(catalogPage.page).toHaveScreenshot('edubadgeAnonymous.png');
});
