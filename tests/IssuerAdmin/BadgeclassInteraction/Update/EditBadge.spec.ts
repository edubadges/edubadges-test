import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit existing Regular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // var
    var initialBadgeName = `Original regular ${institution} badge`;
    var editedBadgeName = `Second name regular ${institution} badge`;
    const issuerGroupName = 'Medicine';
    const editedBadgeDesc = 'newDescription';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1932';
    const editedBadgeFormOfPart = 'On-site';
    const editedBadgeAssesment = 'Development report / reflection report';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createRegularBadge(initialBadgeName, issuerGroupName);

    // test
    editedBadgeName = await issuers.editExistingBadge(
      editedBadgeName,
      editedBadgeDesc,
      editedBadgeOutcome,
      editedBadgeCriterium,
      editedBadgeEQF,
      editedBadgeIdentifier,
      editedBadgeFormOfPart,
      editedBadgeAssesment,
    );

    // validation
    const badgeNameLocator = adminPage.page.locator('div.info').locator('h2');
    const breadcrumbs = adminPage.page.locator('.bread-crumb');
    await expect(badgeNameLocator).toHaveText(editedBadgeName);
    await expect(breadcrumbs.getByText(editedBadgeName)).toBeVisible();
  });

  test(`Edit existing ${institution} micro credential`, async ({
    adminPage,
  }) => {
    // var
    var initialBadgeName = 'Original name micro credential badge';
    var editedBadgeName = 'SecondName micro credential Editbadge';
    const issuerGroupName = 'Medicine';
    const editedBadgeDesc = 'new micro credential description';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1933';
    const editedBadgeFormOfPart = 'Online';
    const editedBadgeAssesment = 'Personalized type of assessment';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createMicroBadge(issuerGroupName, initialBadgeName);

    // test
    editedBadgeName = await issuers.editExistingBadge(
      editedBadgeName,
      editedBadgeDesc,
      editedBadgeOutcome,
      editedBadgeCriterium,
      editedBadgeEQF,
      editedBadgeIdentifier,
      editedBadgeFormOfPart,
      editedBadgeAssesment,
    );

    // validation
    const badgeNameLocator = adminPage.page.locator('div.info').locator('h2');
    const breadcrumbs = adminPage.page.locator('.bread-crumb');
    await expect(badgeNameLocator).toHaveText(editedBadgeName);
    await expect(breadcrumbs.getByText(editedBadgeName)).toBeVisible();
  });

  test(`Edit existing extra curricular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // var
    var initialBadgeName = 'Original extra curricular Editbadge';
    var editedBadgeName = 'Second name extra curricular Editbadge';
    const issuerGroupName = 'Medicine';
    const editedBadgeDesc = 'new extra curricular description';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1934';
    const editedBadgeFormOfPart = 'work experience';
    const editedBadgeAssesment = 'Portfolio / portfolio assessment';
    const issuers = adminPage.managePage.issuersPage;

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createExtracurricularBadge(issuerGroupName, initialBadgeName);

    // test
    editedBadgeName = await issuers.editExistingBadge(
      editedBadgeName,
      editedBadgeDesc,
      editedBadgeOutcome,
      editedBadgeCriterium,
      editedBadgeEQF,
      editedBadgeIdentifier,
      editedBadgeFormOfPart,
      editedBadgeAssesment,
    );

    // validation
    const badgeNameLocator = adminPage.page.locator('div.info').locator('h2');
    const breadcrumbs = adminPage.page.locator('.bread-crumb');
    await expect(badgeNameLocator).toHaveText(editedBadgeName);
    await expect(breadcrumbs.getByText(editedBadgeName)).toBeVisible();
  });
});
