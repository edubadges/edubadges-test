import { expect, test } from '../../../../fixtures/staffFixtures/staffMboFixture';

test('Validate error messages empty microcredential form', async ({
  mboPage,
}) => {
  // setup
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();
  await mboPage.managePage.clickMicroCredential();

  // test
  await expect(mboPage.page).toHaveScreenshot(
    'emptyMicrocredentialForm.png',
    {
      fullPage: true,
    },
  );
  await mboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboPage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  mboPage,
}) => {
  // setup
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();
  await mboPage.managePage.clickRegularBadge();

  // test
  await expect(mboPage.page).toHaveScreenshot(
    'emptyRegularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await mboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboPage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  mboPage,
}) => {
  // setup
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();
  await mboPage.managePage.clickExtraCurricularEduBadge();

  // test
  await expect(mboPage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await mboPage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboPage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate regular MBO edu badge creation', async ({
  mboPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = "test regular MBO badge";
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();

  // test
  await mboPage.managePage.clickRegularBadge();
  await mboPage.managePage.fillInMBOExtraCurricularForm();
  await mboPage.managePage.publishBadge();

  // validate
  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();

  var maskedLocators = [
    mboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboPage.page).toHaveScreenshot(
    'regularMBOBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate micro credential MBO edu badge creation', async ({
  mboPage,
  testdata
}) => {
  // setup
  testdata.badgeData.title = "test micro MBO badge";
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();

  // test
  await mboPage.managePage.clickMicroCredential();
  await mboPage.managePage.fillInMBOExtraCurricularForm();
  await mboPage.managePage.publishBadge();

  // validate
  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();

  var maskedLocators = [
    mboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboPage.page).toHaveScreenshot(
    'microMBOBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test('Validate extra curricular MBO edu badge creation', async ({
  mboPage,
  testdata,
}) => {
  // setup
  testdata.badgeData.title = "test extra curricular MBO badge";
  await mboPage.managePage.goToManage();
  await mboPage.managePage.searchWithText('Medicine');
  await mboPage.managePage.openIssuerGroup('Medicine');
  await mboPage.managePage.clickNewBadgeClass();

  // test
  await mboPage.managePage.clickExtraCurricularEduBadge();
  await mboPage.managePage.fillInMBOExtraCurricularForm();
  await mboPage.managePage.publishBadge();

  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  var maskedLocators = [
    mboPage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboPage.page).toHaveScreenshot(
    'extraCurricularBMBOadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});
