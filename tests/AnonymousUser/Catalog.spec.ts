import { expect, test } from '../../fixtures/studentFixture';
import { institution } from '../../util/loginPossibilities';

test('See homepage', async ({ catalogPage }) => {
  // var
  const maskedLocators = [
    catalogPage.page.getByText(' Badge Classes').first().locator('../../..'),
  ];

  // test
  await catalogPage.page.goto('');

  // validate
  await expect(catalogPage.page).toHaveScreenshot(
    'expectedHomePageOpened-eng.png',
    {
      fullPage: true,
      mask: maskedLocators, maxDiffPixelRatio: 0.05,
      clip: { x: 0, y: 0, width: 1280, height: 963 }
    },
  );
});

test('Search for non existing badge', async ({ catalogPage }) => {
  // var
  const badgeName = 'I do not exist` this badge is not real?';

  // test
  await catalogPage.searchWithText(badgeName);

  // validate
  await expect(catalogPage.page).toHaveScreenshot('emptyCatalogPage.png',{
      maxDiffPixelRatio: 0.02, // Increases tolerance to 2%
  }

  );
});

test('Look at existing badge', async ({ catalogPage }) => {
  // var
  const badgeName = 'Group Dynamics';
  const institution: institution = 'MBO';

  // test
  await catalogPage.searchWithText(badgeName);
  await catalogPage.filterOn(institution);
  await catalogPage.openBadge(badgeName);

  // validate
  await expect(catalogPage.page).toHaveScreenshot('edubadgeAnonymous.png',{
    maxDiffPixelRatio: 0.03, // Increases tolerance to 2%
  });
});
