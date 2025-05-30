import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Validate error messages empty ${institution} microcredential form`, async ({
    adminPage,
  }) => {
    // var
    const issuers = adminPage.managePage.issuersPage;
    const breadcrumbs = adminPage.page.locator('div.bread-crumb');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.searchWithText('Medicine');
    await issuers.openIssuer('Medicine');

    // test
    await issuers.clickNewBadgeClass();
    await issuers.clickMicroCredential();
    await expect(adminPage.page).toHaveScreenshot(
      `empty${institution}MicrocredentialForm.png`,
      {
        fullPage: true,
        mask: [breadcrumbs],
      },
    );
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
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.searchWithText('Medicine');
    await issuers.openIssuer('Medicine');

    // test
    await issuers.clickNewBadgeClass();
    await issuers.clickRegularBadge();
    await expect(adminPage.page).toHaveScreenshot(
      `empty${institution}RegularEdubadgeForm.png`,
      {
        fullPage: true,
        mask: [breadcrumbs],
      },
    );
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
    await adminPage.loginTestIdp(institution, 'Issuer');
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
    const badgeTitle = `Regular ${institution} badge ${testdata.browserName}`;
    const issuers = adminPage.managePage.issuersPage;
    const issuergroupName = 'Medicine';
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit badge class',
    });
    const badgeTitleLocator = adminPage.page.locator('.info').locator('h2');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.searchWithText(issuergroupName);
    await issuers.openIssuer(issuergroupName);

    // test
    await issuers.clickNewBadgeClass();
    await issuers.clickRegularBadge();
    await issuers.fillInBadgeForm(badgeTitle);
    await issuers.publishBadge();

    // validate
    await expect(editButton).toBeVisible();
    await expect(badgeTitleLocator).toHaveText(badgeTitle);
  });

  test(`Validate micro credential ${institution} edu badge creation`, async ({
    adminPage,
    testdata,
  }) => {
    // var
    const badgeTitle = `Micro credential ${institution} ${testdata.browserName}`;
    const issuers = adminPage.managePage.issuersPage;
    const issuergroupName = 'Medicine';
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit badge class',
    });
    const badgeTitleLocator = adminPage.page.locator('.info').locator('h2');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.searchWithText(issuergroupName);
    await issuers.openIssuer(issuergroupName);
    await issuers.clickNewBadgeClass();
    await issuers.clickMicroCredential();

    // test
    await issuers.fillInBadgeForm(badgeTitle);
    await issuers.publishBadge();
    await editButton.waitFor();

    // validate
    await expect(editButton).toBeVisible();
    await expect(badgeTitleLocator).toHaveText(badgeTitle);
  });

  test(`Validate extra curricular ${institution} edu badge creation`, async ({
    adminPage,
    testdata,
  }) => {
    /// var
    const badgeTitle = `Extra curricular ${institution} badge ${testdata.browserName}`;
    const issuers = adminPage.managePage.issuersPage;
    const issuergroupName = 'Medicine';
    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit badge class',
    });
    const badgeTitleLocator = adminPage.page.locator('.info').locator('h2');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.searchWithText(issuergroupName);
    await issuers.openIssuer(issuergroupName);
    await issuers.clickNewBadgeClass();
    await issuers.clickExtraCurricularEduBadge();

    // test
    await issuers.fillInBadgeForm(badgeTitle);
    await issuers.publishBadge();

    // validate
    await expect(editButton).toBeVisible();
    await expect(badgeTitleLocator).toHaveText(badgeTitle);
  });
});
