import { expect, test } from '../../../fixtures/staffFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Award requested badge from ${institution}`, async ({
    catalogPage,
    adminPage,
  }) => {
    // var
    const course = 'Growth and Development';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    // test
    await adminPage.badgeClassPage.approveRequest(course, studentInfo.name);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been awarded.'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution}`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    test.fail(institution == 'WO' || institution == 'HBO' || institution == 'MBO');
    expect(institution != 'WO' && institution != 'HBO' && institution != 'MBO').toBeTruthy();

    // var
    const courseName = 'Cognitive Psychology';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      courseName,
      studentInfo.email,
      studentInfo.EPPN,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution} through mail`, async ({ adminPage }) =>{
    // fail if correct account is missing. SHOULD BE CHANGED
   await  test.fail(institution == 'MBO');
    await expect(institution != 'MBO').toBeTruthy();

    // var
    const courseName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      courseName,
      studentInfo.email,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();

    // fail if correct account is missing. SHOULD BE CHANGED
    test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();
  });
});
