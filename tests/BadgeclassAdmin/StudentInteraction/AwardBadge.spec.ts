import { expect, test } from '../../../fixtures/staffFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Award requested badge from ${institution}`, async ({
    catalogPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Growth and Development';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await catalogPage.searchForClass(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(badgeName);
    await catalogPage.requestEdubadge(institution);

    // test
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been awarded.'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution}`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();
    
    // var
    const badgeName = 'Cognitive Psychology';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentInfo.email,
      studentInfo.EPPN,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution} through mail`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();

    // var
    const badgeName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentInfo.email,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });
});
