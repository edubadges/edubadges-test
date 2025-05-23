import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Deny ${institution} badge without reason from Badgeclasses`, async ({
    adminPage,
    catalogPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();

    // var
    const badgeName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    await catalogPage.requestEdubadge(institution);

    // test
    await adminPage.badgeClassPage.denyRequest(badgeName, studentInfo.name);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been denied'),
    ).toBeVisible();
  });
});

test('Deny badge with reason from Badgeclasses', async ({
  adminPage,
  catalogPage,
}) => {
  // var
  const badgeName = 'Digestion and Defense';
  const institution = 'WO';
  const reason = 'Legitimate reason to deny the badge';
  const studentInfo = await adminPage.getStudentAccount(institution);

  // setup
  await adminPage.loginTestIdp(institution, 'Badgeclass');

  await catalogPage.searchWithText(badgeName);
  await catalogPage.filterOn(institution);
  await catalogPage.openBadge(badgeName);
  await catalogPage.requestEdubadge(institution);

  // test
  await adminPage.badgeClassPage.denyRequest(
    badgeName,
    studentInfo.name,
    reason,
  );

  // validate
  await expect(
    adminPage.page.getByText('The request(s) have been denied'),
  ).toBeVisible();
});

test('Deny badge with reason from Manage', async ({
  adminPage,
  catalogPage,
}) => {
  // var
  const badgeName = 'Cognitive Psychology';
  const institution = 'WO';
  const reason = 'Legitimate reason to deny the badge';
  const studentInfo = await adminPage.getStudentAccount(institution);

  // setup
  await adminPage.loginTestIdp(institution, 'Badgeclass');
  
  await catalogPage.searchWithText(badgeName);
  await catalogPage.filterOn(institution);
  await catalogPage.openBadge(badgeName);
  await catalogPage.requestEdubadge(institution);

  await adminPage.goToManage();
  await adminPage.managePage.goToRequested();

  // test
  await adminPage.managePage.requestedBadgesPage.denyRequest(
    badgeName,
    studentInfo.name,
    reason,
  );

  // validate
  await expect(
    adminPage.page.getByText('The request(s) have been denied'),
  ).toBeVisible();
});
