import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach(institution => {
test(`Validate error messages empty ${institution} microcredential form`, async ({
  adminPage,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const breadcrumbs = adminPage.page.locator('div.bread-crumb');

  // setup
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();
  await expect(adminPage.page).toHaveScreenshot(`empty${institution}MicrocredentialForm.png`, {
    fullPage: true,
    mask: [breadcrumbs],
  });
  await adminPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(adminPage.page).toHaveScreenshot(
    `empty${institution}MicrocredentialFormWithValidationErrors.png`,
    {
      fullPage: true,
      mask: [breadcrumbs],
    },
  );
});

test(`Validate error messages empty ${institution} regular badge form`, async ({
  adminPage,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const breadcrumbs = adminPage.page.locator('div.bread-crumb');

  // setup
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickRegularBadge();
  await expect(adminPage.page).toHaveScreenshot(`empty${institution}RegularEdubadgeForm.png`, {
    fullPage: true,
    mask: [breadcrumbs],
  });
  await adminPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(adminPage.page).toHaveScreenshot(
    `empty${institution}RegularFormWithValidationErrors.png`,
    {
      fullPage: true,
      mask: [breadcrumbs],
    },
  );
});

test(`Validate error messages empty ${institution} extra curricular badge form`, async ({
  adminPage,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const breadcrumbs = adminPage.page.locator('div.bread-crumb');

  // setup
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');

  // test
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();
  await expect(adminPage.page).toHaveScreenshot(
    `empty${institution}ExtraCurricularEdubadgeForm.png`,
    {
      fullPage: true,
      mask: [breadcrumbs],
    },
  );
  await adminPage.page.getByRole('link', { name: 'Publish' }).click();
  await expect(adminPage.page).toHaveScreenshot(
    `empty${institution}ExtraCurricularFormWithValidationErrors.png`,
    {
      fullPage: true,
      mask: [breadcrumbs],
    },
  );
});

test(`Validate regular ${institution} edu badge creation`, async ({
  adminPage,
  testdata,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const creationInformation = adminPage.page.locator('div.list');
  const manage = issuers;

  // setup
  testdata.badgeData.title = `Regular Test automation ${institution}`;
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await manage.searchWithText('Medicine');
  await manage.openIssuer('Medicine');

  // test
  await manage.clickNewBadgeClass();
  await manage.clickRegularBadge();
  await manage.fillInExtraCurricularForm();
  await manage.publishBadge();

  await adminPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(adminPage.page).toHaveScreenshot(
    `regular${institution}BadgeCreated.png`, {
    mask: [creationInformation],
  });
});

test(`Validate micro credential ${institution} edu badge creation`, async ({
  adminPage,
  testdata,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const creationInformation = adminPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = `Micro Test automation ${institution}`;
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickMicroCredential();

  // test
  await issuers.fillInExtraCurricularForm();
  await issuers.publishBadge();

  await adminPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(adminPage.page).toHaveScreenshot(
    `micro${institution}BadgeCreated.png`, {
    mask: [creationInformation],
  });
});

test(`Validate extra curricular ${institution} edu badge creation`, async ({
  adminPage,
  testdata,
}) => {
  // var
  const issuers = adminPage.managePage.issuersPage;
  const creationInformation = adminPage.page.locator('div.list');

  // setup
  testdata.badgeData.title = `Extra Test automation ${institution}`;
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await issuers.searchWithText('Medicine');
  await issuers.openIssuer('Medicine');
  await issuers.clickNewBadgeClass();
  await issuers.clickExtraCurricularEduBadge();

  // test
  await issuers.fillInExtraCurricularForm();
  await issuers.publishBadge();

  await adminPage.page.getByRole('link', { name: 'Edit badge class' }).waitFor();

  await expect(adminPage.page).toHaveScreenshot(
    `extraCurricular${institution}BadgeCreated.png`,
    {
      mask: [creationInformation],
    },
  );
});
});