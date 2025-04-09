import { expect, test } from '../../../../fixtures/staffFixtures/staffHboFixture';

test('Validate error messages empty microcredential form', async ({
  hboPage,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;

  // setup
  await hboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();
  await expect(hboPage.page).toHaveScreenshot('emptyMicrocredentialForm.png', {
    fullPage: true,
  });
  await hboPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    {
      fullPage: true,
    },
  );
});

test('Validate error messages empty regular badge form', async ({
  hboPage,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;

  // setup
  await hboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickRegularBadge();
  await expect(hboPage.page).toHaveScreenshot('emptyRegularEdubadgeForm.png', {
    fullPage: true,
  });
  await hboPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    {
      fullPage: true,
    },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  hboPage,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;

  // setup
  await hboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await hboPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboPage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    {
      fullPage: true,
    },
  );
});

test('Validate regular HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;
  const creationInformation = hboPage.page.locator('div.list');

  // var
  testdata.badgeData.title = 'Regular Test automation HBO';
  const manage = issuers;

  // setup
  await hboPage.goToManage();
  await manage.searchWithText('Medicine');
  await manage.openIssuer('Medicine');

  // test
  await manage.clickNewBadgeClass();
  await manage.clickRegularBadge();
  await manage.fillInExtraCurricularForm();
  await manage.publishBadge();

  await hboPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(hboPage.page).toHaveScreenshot('regularHBOBadgeCreated.png', {
    mask: [creationInformation],
  });
});

test('Validate micro credential HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;
  const creationInformation = hboPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = 'Micro Test automation HBO';
  await hboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();

  // test
  await issuers.fillInExtraCurricularForm();
  await issuers.publishBadge();

  await hboPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(hboPage.page).toHaveScreenshot('microHBOBadgeCreated.png', {
    mask: [creationInformation],
  });
});

test('Validate extra curricular HBO edu badge creation', async ({
  hboPage,
  testdata,
}) => {
  // var
  const issuers = hboPage.managePage.issuersPage;
  const creationInformation = hboPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = 'Extra Test automation HBO';
  await hboPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();

  // test
  await issuers.fillInExtraCurricularForm();
  await issuers.publishBadge();

  await hboPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(hboPage.page).toHaveScreenshot(
    'extraCurricularHBOBadgeCreated.png',
    {
      mask: [creationInformation],
    },
  );
});
