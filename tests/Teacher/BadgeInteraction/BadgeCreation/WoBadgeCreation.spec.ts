import { expect, test } from '../../../../fixtures/eduBadges/eduBadgesFixture';

// TODO: institution admin folder -> create badges
test('Validate error messages empty microcredential form', async ({
  issuerPortalPageManage,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createNewMicroCredential();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyMicrocredentialForm.png',
    {
      fullPage: true,
    },
  );
  await issuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  issuerPortalPageManage,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createRegularEduBadge();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyRegularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await issuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  issuerPortalPageManage,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createExtraCurricularEduBadge();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await issuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});


// following tests are skipped because of a known issue in publishing badges
test.skip('Validate microcredention badge class creation', async ({
  issuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'Microcredential Test automation';
  testdata.badgeData.criteria = 'hffgcgvf';
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createNewMicroCredential();
  await issuerPortalPageManage.fillInMicrocredentialForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    issuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [
    await issuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'microBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test.skip('Validate regular edu badge creation', async ({
  issuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'Regular edu badge';
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createRegularEduBadge();
  await issuerPortalPageManage.fillInRegularForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    issuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [
    await issuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'regularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test.skip('Validate extra curricular edu badge creation', async ({
  issuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'Extra curricular badge';
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createExtraCurricularEduBadge();
  await issuerPortalPageManage.fillInExtraCurricularForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    issuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [
    await issuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(issuerPortalPageManage.page).toHaveScreenshot(
    'extraCurricularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});