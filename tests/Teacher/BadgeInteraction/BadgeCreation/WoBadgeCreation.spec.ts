import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';

test('Validate error messages empty microcredential form', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();

  // test
  await expect(woPage.page).toHaveScreenshot('emptyMicrocredentialForm.png', {
    fullPage: true,
  });
  await woPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;

  // setup
  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickRegularBadge();

  // test
  await expect(woPage.page).toHaveScreenshot('emptyRegularEdubadgeForm.png', {
    fullPage: true,
  });
  await woPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    {
      fullPage: true,
    },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;

  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();

  // test
  await expect(woPage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await woPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(woPage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

// following tests are skipped because of a known issue in publishing badges
test('Validate microcredention badge class creation', async ({
  woInstitutionAdminPage: woPage,
  testdata,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;
  const creationInformation = woPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = 'Microcredential Test automation';
  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();

  // test
  await issuers.fillInMicrocredentialForm();
  await issuers.publishBadge();

  await woPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(woPage.page).toHaveScreenshot('microBadgeCreated.png', {
    mask: [creationInformation],
  });
});

test('Validate regular edu badge creation', async ({
  woInstitutionAdminPage: woPage,
  testdata,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;
  const creationInformation = woPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = 'Regular edu badge';
  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickRegularBadge();

  // test
  await issuers.fillInRegularForm();
  await issuers.publishBadge();

  await woPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(woPage.page).toHaveScreenshot('regularBadgeCreated.png', {
    mask: [creationInformation],
  });
});

test('Validate extra curricular edu badge creation', async ({
  woInstitutionAdminPage: woPage,
  testdata,
}) => {
  // var
  const issuers = woPage.managePage.issuersPage;
  const creationInformation = woPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = 'Extra curricular badge';
  await woPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();

  // test
  await issuers.fillInExtraCurricularForm();
  await issuers.publishBadge();

  await woPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(woPage.page).toHaveScreenshot(
    'extraCurricularBadgeCreated.png',
    {
      mask: [creationInformation],
    },
  );
});
