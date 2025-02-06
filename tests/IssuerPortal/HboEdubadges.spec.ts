import { expect, test } from '../../fixtures/eduBadges/eduBadgesHboFixture';

test('Validate error messages empty microcredential form', async ({
  hboIssuerPortalPageManage,
}) => {
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createNewMicroCredential();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('emptyMicrocredentialForm.png', {
    fullPage: true,
  });
  await hboIssuerPortalPageManage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyMicrocredentialFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty regular badge form', async ({
  hboIssuerPortalPageManage,
}) => {
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createRegularEduBadge();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('emptyRegularEdubadgeForm.png', {
    fullPage: true,
  });
  await hboIssuerPortalPageManage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyRegularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate error messages empty extra curricular badge form', async ({
  hboIssuerPortalPageManage,
}) => {
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('emptyExtraCurricularEdubadgeForm.png', {
    fullPage: true,
  });
  await hboIssuerPortalPageManage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate regular HBO edu badge creation', async ({
  hboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'HBO regular curricular badge';
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createRegularEduBadge();
  await hboIssuerPortalPageManage.fillInExtraCurricularForm();
  await hboIssuerPortalPageManage.publishBadge();

  await expect(
    hboIssuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await hboIssuerPortalPageManage.page.getByText('Created ').locator('..')];
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('regularMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate micro credential HBO edu badge creation', async ({
  hboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'HBO micro curricular badge';
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createNewMicroCredential();
  await hboIssuerPortalPageManage.fillInExtraCurricularForm();
  await hboIssuerPortalPageManage.publishBadge();

  await expect(
    hboIssuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await hboIssuerPortalPageManage.page.getByText('Created ').locator('..')];
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('microMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate extra curricular HBO edu badge creation', async ({
  hboIssuerPortalPageManage,
  testdata,
}) => {
  testdata.badgeData.title = 'HBO extra curricular badge';
  await hboIssuerPortalPageManage.searchForBadgeClass('Medicine');
  await hboIssuerPortalPageManage.openBadgeClassWithName('Medicine');
  await hboIssuerPortalPageManage.createNewBadgeClass();
  await hboIssuerPortalPageManage.createExtraCurricularEduBadge();
  await hboIssuerPortalPageManage.fillInExtraCurricularForm();
  await hboIssuerPortalPageManage.publishBadge();

  await expect(
    hboIssuerPortalPageManage.page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await hboIssuerPortalPageManage.page.getByText('Created ').locator('..')];
  await expect(hboIssuerPortalPageManage.page).toHaveScreenshot('extraMBOCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});
