import { expect, test } from '../../../../fixtures/staffFixtures/staffMboFixture';

test('Validate error messages empty microcredential form', async ({
  mboPage,
}) => {
  // var
  const issuers = mboPage.managePage.issuersPage;

  // setup
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();

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
  // var
  const issuers = mboPage.managePage.issuersPage;

  // setup
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickRegularBadge();

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
  // var
  const issuers = mboPage.managePage.issuersPage;

  // setup
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();

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
  // var
  const issuers = mboPage.managePage.issuersPage;
  const creationInformation = mboPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = "test regular MBO badge";
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();

  // test
  await issuers.clickRegularBadge();
  await issuers.fillInMBOExtraCurricularForm();
  await issuers.publishBadge();

  // validate
  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();

  await expect(mboPage.page).toHaveScreenshot(
    'regularMBOBadgeCreated.png',
    {
      mask: [creationInformation],
    },
  );
});

test('Validate micro credential MBO edu badge creation', async ({
  mboPage,
  testdata
}) => {
  // var
  const issuers = mboPage.managePage.issuersPage;
  const creationInformation = mboPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = "test micro MBO badge";
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();

  // test
  await issuers.clickMicroCredential();
  await issuers.fillInMBOExtraCurricularForm();
  await issuers.publishBadge();

  // validate
  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();

  await expect(mboPage.page).toHaveScreenshot(
    'microMBOBadgeCreated.png',
    {
      mask: [creationInformation],
    },
  );
});

test('Validate extra curricular MBO edu badge creation', async ({
  mboPage,
  testdata,
}) => {
  // var
  const issuers = mboPage.managePage.issuersPage;
  const creationInformation = mboPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = "test extra curricular MBO badge";
  await mboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();

  // test
  await issuers.clickExtraCurricularEduBadge();
  await issuers.fillInMBOExtraCurricularForm();
  await issuers.publishBadge();

  await  mboPage.page
    .getByRole('link', { name: 'Edit badge class' })
    .waitFor();
    
  await expect(mboPage.page).toHaveScreenshot(
    'extraCurricularBMBOadgeCreated.png',
    {
      mask: [creationInformation],
    },
  );
});
