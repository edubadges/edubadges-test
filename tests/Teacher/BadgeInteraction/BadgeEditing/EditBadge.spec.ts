import { expect, test } from '../../../../fixtures/staffFixture';

test('Edit existing Regular WO edubadge', async ({
  adminPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const initialBadgeName = 'Original regular WO Badge';
  const editedBadgeName = 'Second name regular WO badge';
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
  await adminPage.loginTestIdp('WO', 'Institution');
  await adminPage.goToManage();
  await issuers.createRegularBadge(issuerGroupName, initialBadgeName);

  // test
  await issuers.editExistingBadge(
    editedBadgeName, editedBadgeDesc, editedBadgeOutcome,
    editedBadgeCriterium, editedBadgeEQF, editedBadgeIdentifier,
    editedBadgeFormOfPart, editedBadgeAssesment,
  );

  // validation
  await expect(adminPage.page).toHaveScreenshot('EditedWORegularBadgeclass.png', {
    fullPage: true,
    mask: [creationInformation],
  });
});

test('Edit existing WO micro credential', async ({
  adminPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const initialBadgeName = 'Original name micro credential badge';
  const editedBadgeName = 'SecondName micro credential EditBadge';
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
  await adminPage.loginTestIdp('WO', 'Institution');
  await adminPage.goToManage();
  await issuers.createMicroBadge(issuerGroupName, initialBadgeName);

  // test
  await issuers.editExistingBadge(
    editedBadgeName, editedBadgeDesc, editedBadgeOutcome,
    editedBadgeCriterium, editedBadgeEQF, editedBadgeIdentifier,
    editedBadgeFormOfPart, editedBadgeAssesment,
  );

  // validation
  await expect(adminPage.page).toHaveScreenshot(
    'EditedWOMicrocredentialBadgeclass.png',
    { fullPage: true, mask: [creationInformation] },
  );
});

test('Edit existing extra curricular WO edubadge', async ({
  adminPage,
}) => {
  // var
  const issuerGroupName = 'Medicine';
  const initialBadgeName = 'Original extra curricular EditBadge';
  const editedBadgeName = 'Second name extra curricular EditBadge';
  const editedBadgeDesc = 'new extra curricular description';
  const editedBadgeOutcome = 'The new outcome';
  const editedBadgeCriterium = 'The new criterium';
  const editedBadgeEQF = 'EQF 7';
  const editedBadgeIdentifier = '1934';
  const editedBadgeFormOfPart = 'Work experience';
  const editedBadgeAssesment = 'Portfolio / portfolio assessment';
  const issuers = adminPage.managePage.issuersPage;
  const creationInformation = adminPage.page.locator('div.list');

  // setup
  await adminPage.loginTestIdp('WO', 'Institution');
  await adminPage.goToManage();
  await issuers.createExtracurricularBadge(issuerGroupName, initialBadgeName);

  // test
  await issuers.editExistingBadge(
    editedBadgeName, editedBadgeDesc, editedBadgeOutcome,
    editedBadgeCriterium, editedBadgeEQF, editedBadgeIdentifier,
    editedBadgeFormOfPart, editedBadgeAssesment,
  );

  // validation
  await expect(adminPage.page).toHaveScreenshot(
    'EditedWOExtraCurricularBadgeclass.png',
    { fullPage: true, mask: [creationInformation] },
  );
});
