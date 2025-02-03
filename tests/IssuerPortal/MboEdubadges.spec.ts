import { expect, test } from '../../fixtures/eduBadgesFixture';

test('Validate error messages empty microcredential form', async ({
  mboIssuerPortalPageManage,
  page,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createNewMicroCredential();
  await expect(page).toHaveScreenshot('emptyMicrocredentialForm.png', {
    fullPage: true,
  });
  await page.getByRole('link', { name: 'Publish' }).click();
  await expect(page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  mboIssuerPortalPageManage,
  page,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createRegularEduBadge();
  await expect(page).toHaveScreenshot('emptyRegularEdubadgeForm.png', {
    fullPage: true,
  });
  await page.getByRole('link', { name: 'Publish' }).click();
  await expect(page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  mboIssuerPortalPageManage,
  page,
}) => {
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await expect(page).toHaveScreenshot('emptyExtraCurricularEdubadgeForm.png', {
    fullPage: true,
  });
  await page.getByRole('link', { name: 'Publish' }).click();
  await expect(page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate regular MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
  page,
}) => {
  testdata.badgeData.title = 'MBO regular curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createRegularEduBadge();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('regularMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate micro credential MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
  page,
}) => {
  testdata.badgeData.title = 'MBO micro curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createNewMicroCredential();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('microMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate extra curricular MBO edu badge creation', async ({
  mboIssuerPortalPageManage,
  testdata,
  page,
}) => {
  testdata.badgeData.title = 'MBO extra curricular badge';
  await mboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await mboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await mboIssuerPortalPageManage.createNewBadgeClass();
  await mboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await mboIssuerPortalPageManage.fillInMBOExtraCurricularForm();
  await mboIssuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('extraMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});
