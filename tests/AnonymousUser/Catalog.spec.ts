import { expect, test } from '../../fixtures/studentFixture';
import { institution } from '../../util/loginPossibilities';


//test('title est',{annotation: [{type: 'title documenatation', description: 'short description of the test'}]}, async ({ catalogPage }) => {
test('See homepage',{annotation: [{type: 'Open catalog page and verify it with a screenshot UI', description: 'The test calls `studentFixture.ts` from the `fixture` folder. It uses `catalogusPage`—which holds a browser context—to navigate to the home page and click the "Open the catalog" button, navigating to the catalog page. It captures a new screenshot and validates it against the existing screenshot in `Catalog.spec.ts-snapshots`, comparing them to check for differences.'}]}, async ({ catalogPage }) => {


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

test('Search for non existing badge',{annotation: [{type: 'Open catalog page and search for not existing badge and verify it with a screenshot UI', description: 'The test calls `studentFixture.ts` from the `fixture` folder. It uses `catalogusPage`—which holds a browser context—to navigate to the home page and click the "Open the catalog" button, navigating to the catalog page. Search “I do not exist’ this badge does not exist. It captures a new screenshot and validates it against the existing screenshot in `Catalog.spec.ts-snapshots`, comparing them to check for differences.'}]},  async ({ catalogPage }) => {
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

test('Look at existing badge',{annotation: [{type: 'Open catalog page, search Group Dynamics filter on MBO and verify it with a screenshot UI', description: 'The test calls `studentFixture.ts` from the `fixture` folder. It uses `catalogusPage`—which holds a browser context—to navigate to the home page and click the "Open the catalog" button, navigating to the catalog page. Search Group dynamics and filter on MBO. It captures a new screenshot and validates it against the existing screenshot in `Catalog.spec.ts-snapshots`, comparing them to check for differences.'}]},  async ({ catalogPage }) => {
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
