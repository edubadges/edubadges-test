import { expect, test } from '../../../../fixtures/eduBadges/eduBadgesMboFixture';

test('Validate error messages empty microcredential form', async ({
  mboIssuerPortalPageManage,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createNewMicroCredential();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyMicrocredentialForm.png',
    {
      fullPage: true,
    },
  );
  await mboIssuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  mboIssuerPortalPageManage,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createRegularEduBadge();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyRegularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await mboIssuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  mboIssuerPortalPageManage,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyExtraCurricularEdubadgeForm.png',
    {
      fullPage: true,
    },
  );
  await mboIssuerPortalPageManage.page
    .getByRole('link', { name: 'Publish' })
    .click();
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test.skip('Validate regular MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'MBO regular curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createRegularEduBadge();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    mboIssuerPortalPageManage.page.getByRole('link', {
      name: 'Edit badge class',
    }),
  ).toBeVisible();
  var maskedLocators = [
    await mboIssuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'regularMBOCurricularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test.skip('Validate micro credential MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'MBO micro curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createNewMicroCredential();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    mboIssuerPortalPageManage.page.getByRole('link', {
      name: 'Edit badge class',
    }),
  ).toBeVisible();
  var maskedLocators = [
    await mboIssuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'microMBOCurricularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});

test.skip('Validate extra curricular MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'MBO extra curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    mboIssuerPortalPageManage.page.getByRole('link', {
      name: 'Edit badge class',
    }),
  ).toBeVisible();
  var maskedLocators = [
    await mboIssuerPortalPageManage.page
      .getByText('Created ')
      .locator('..')
      .locator('..'),
  ];
  await expect(mboIssuerPortalPageManage.page).toHaveScreenshot(
    'extraMBOCurricularBadgeCreated.png',
    {
      mask: maskedLocators,
    },
  );
});
