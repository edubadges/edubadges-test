import { expect, test } from '../../fixtures/eduBadgesFixture';

//Need to make this more flexable so that we can perform these tests with accounts with different roles

test('Validate error messages empty microcredential form', async ({
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createNewMicroCredential();
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
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createRegularEduBadge();
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
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createExtraCurricularEduBadge();
  await expect(page).toHaveScreenshot('emptyExtraCurricularEdubadgeForm.png', {
    fullPage: true,
  });
  await page.getByRole('link', { name: 'Publish' }).click();
  await expect(page).toHaveScreenshot(
    'emptyExtraCurricularFormWithValidationErrors.png',
    { fullPage: true },
  );
});

test('Validate microcredention badge class creation', async ({
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createNewMicroCredential();
  await issuerPortalPageManage.fillInMicrocredentialForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('microBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate regular edu badge creation', async ({
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createRegularEduBadge();
  await issuerPortalPageManage.fillInRegularForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('regularBadgeCreated.png', {
    mask: maskedLocators,
  });
});

test('Validate extra curricular edu badge creation', async ({
  issuerPortalPageManage,
  page,
}) => {
  await issuerPortalPageManage.searchForBadgeClass('Medicine');
  await issuerPortalPageManage.openBadgeClassWithName('Medicine');
  await issuerPortalPageManage.createNewBadgeClass();
  await issuerPortalPageManage.createExtraCurricularEduBadge();
  await issuerPortalPageManage.fillInExtraCurricularForm();
  await issuerPortalPageManage.publishBadge();

  await expect(
    page.getByRole('link', { name: 'Edit badge class' }),
  ).toBeVisible();
  var maskedLocators = [await page.getByText('Created ').locator('..')];
  await expect(page).toHaveScreenshot('extraCurricularBadgeCreated.png', {
    mask: maskedLocators,
  });
});
