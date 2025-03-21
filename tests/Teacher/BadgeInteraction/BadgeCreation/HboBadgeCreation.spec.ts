import { expect, test } from '../../../../fixtures/staffFixtures/staffHboFixture';

test('Validate error messages empty microcredential form', async ({
  hboPage,
}) => {
  // setup
  await hboPage.goToManage();
  await hboPage.managePage.searchWithText('Medicine');
  await hboPage.managePage.openIssuerGroup('Medicine');

  // test
  await hboPage.managePage.clickNewBadgeClass();
  await hboPage.managePage.clickMicroCredential();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyMicrocredentialForm.png',
    {
      fullPage: true,
    },
  );
  await hboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { 
      fullPage: true 
    },
  );
});

test('Validate error messages empty regular badge form', async ({
  hboPage,
}) => {
  // setup
  await hboPage.goToManage();
  await hboPage.managePage.searchWithText('Medicine');
  await hboPage.managePage.openIssuerGroup('Medicine');

  // test
  await hboPage.managePage.clickNewBadgeClass();
  await hboPage.managePage.clickRegularBadge();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyRegularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await hboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { 
      fullPage: true 
    },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  hboPage,
}) => {
  // setup
  await hboPage.goToManage();
  await hboPage.managePage.searchWithText('Medicine');
  await hboPage.managePage.openIssuerGroup('Medicine');

  // test
  await hboPage.managePage.clickNewBadgeClass();
  await hboPage.managePage.clickExtraCurricularEduBadge();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await hboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { 
      fullPage: true 
    },
  );
});

test('Validate regular HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // var
  testdata.badgeData.title = 'Regular Test automation HBO';
  const manage = hboPage.managePage;

  // setup
  await hboPage.goToManage();
  await manage.searchWithText('Medicine');
  await manage.openIssuerGroup('Medicine');

  // test
  await manage.clickNewBadgeClass();
  await manage.clickRegularBadge();
  await manage.fillInExtraCurricularForm();
  await manage.publishBadge();

  await hboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();

  var maskedLocators = [
    hboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(hboPage.page).toHaveScreenshot(
    'regularHBOBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate micro credential HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = 'Micro Test automation HBO';
  await hboPage.goToManage();
  await hboPage.managePage.searchWithText('Medicine');
  await hboPage.managePage.openIssuerGroup('Medicine');
  await hboPage.managePage.clickNewBadgeClass();
  await hboPage.managePage.clickMicroCredential();

  // test
  await hboPage.managePage.fillInExtraCurricularForm();
  await hboPage.managePage.publishBadge();

  await hboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    hboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(hboPage.page).toHaveScreenshot(
    'microHBOBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate extra curricular HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = 'Extra Test automation HBO';
  await hboPage.goToManage();
  await hboPage.managePage.searchWithText('Medicine');
  await hboPage.managePage.openIssuerGroup('Medicine');
  await hboPage.managePage.clickNewBadgeClass();
  await hboPage.managePage.clickExtraCurricularEduBadge();

  // test
  await hboPage.managePage.fillInExtraCurricularForm();
  await hboPage.managePage.publishBadge();

  await hboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    hboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(hboPage.page).toHaveScreenshot(
    'extraCurricularHBOBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});
