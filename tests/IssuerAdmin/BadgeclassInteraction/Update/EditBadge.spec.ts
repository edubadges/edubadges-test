import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Edit existing Regular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = `Original regular ${institution} badge`;
    const editedBadgeName = `Second name regular ${institution} badge`;
    const editedBadgeDesc = 'newDescription';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1932';
    const editedBadgeFormOfPart = 'On-site';
    const editedBadgeAssesment = 'Development report / reflection report';
    const issuers = adminPage.managePage.issuersPage;
    const creationInformation = adminPage.page.locator('div.list');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createRegularBadge(issuerGroupName, initialBadgeName);

    // test
    await issuers.editExistingBadge(
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
    await expect(adminPage.page).toHaveScreenshot(
      `Edited${institution}RegularBadgeclass.png`,
      {
        fullPage: true,
        mask: [creationInformation],
      },
    );
  });

  test(`Edit existing ${institution} micro credential`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = 'Original name micro credential badge';
    const editedBadgeName = 'SecondName micro credential Editbadge';
    const editedBadgeDesc = 'new micro credential description';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1933';
    const editedBadgeFormOfPart = 'Online';
    const editedBadgeAssesment = 'Personalized type of assessment';
    const issuers = adminPage.managePage.issuersPage;
    const creationInformation = adminPage.page.locator('div.list');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createMicroBadge(issuerGroupName, initialBadgeName);

    // test
    await issuers.editExistingBadge(
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
    await expect(adminPage.page).toHaveScreenshot(
      `Edited${institution}MicrocredentialBadgeclass.png`,
      { fullPage: true, mask: [creationInformation] },
    );
  });

  test(`Edit existing extra curricular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = 'Original extra curricular Editbadge';
    const editedBadgeName = 'Second name extra curricular Editbadge';
    const editedBadgeDesc = 'new extra curricular description';
    const editedBadgeOutcome = 'The new outcome';
    const editedBadgeCriterium = 'The new criterium';
    const editedBadgeEQF = 'EQF 7';
    const editedBadgeIdentifier = '1934';
    const editedBadgeFormOfPart = 'work experience';
    const editedBadgeAssesment = 'Portfolio / portfolio assessment';
    const issuers = adminPage.managePage.issuersPage;
    const creationInformation = adminPage.page.locator('div.list');

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createExtracurricularBadge(issuerGroupName, initialBadgeName);

    // test
    await issuers.editExistingBadge(
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
    await expect(adminPage.page).toHaveScreenshot(
      `Edited${institution}ExtraCurricularBadgeclass.png`,
      { fullPage: true, mask: [creationInformation] },
    );
  });
});
