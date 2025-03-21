import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

// TODO: institution admin folder -> create badges
test('Validate error messages empty microcredential form', async ({
  woPage,
}) => {
  // setup
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickMicroCredential();

  // test
  await expect(woPage.page).toHaveScreenshot(
    'emptyMicrocredentialForm.png',
    {
      fullPage: true,
    },
  );
  await woPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  woPage,
}) => {
  // setup
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickRegularBadge();

  // test
  await expect(woPage.page).toHaveScreenshot(
    'emptyRegularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await woPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { 
      fullPage: true 
    },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  woPage,
}) => {
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickExtraCurricularEduBadge();

  // test
  await expect(woPage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await woPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});


// following tests are skipped because of a known issue in publishing badges
test('Validate microcredention badge class creation', async ({
  woPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = 'Microcredential Test automation';
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickMicroCredential();

  // test
  await woPage.managePage.fillInMicrocredentialForm();
  await woPage.managePage.publishBadge();

  await woPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    woPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(woPage.page).toHaveScreenshot(
    'microBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate regular edu badge creation', async ({
  woPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = 'Regular edu badge';
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickRegularBadge();

  // test
  await woPage.managePage.fillInRegularForm();
  await woPage.managePage.publishBadge();

  await woPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    woPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(woPage.page).toHaveScreenshot(
    'regularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate extra curricular edu badge creation', async ({
  woPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = 'Extra curricular badge';
  await woPage.goToManage();
  await woPage.managePage.searchWithText('Medicine');
  await woPage.managePage.openIssuerGroup('Medicine');
  await woPage.managePage.clickNewBadgeClass();
  await woPage.managePage.clickExtraCurricularEduBadge();

  // test
  await woPage.managePage.fillInExtraCurricularForm();
  await woPage.managePage.publishBadge();

  await woPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    woPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(woPage.page).toHaveScreenshot(
    'extraCurricularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});