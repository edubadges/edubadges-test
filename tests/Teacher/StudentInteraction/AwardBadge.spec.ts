import { expect, test } from '../../../fixtures/staffFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Award requested badge from ${institution}`, async ({
    catalogPage,
    adminPage,
  }) => {
    // var
    const course = 'Psychometrics';

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    // test
    await adminPage.badgeClassPage.approveRequest(course, institution);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been awarded.'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution}`, async ({ adminPage }) => {
    // var
    const courseName = 'Cognitive Psychology';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');

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
    // var
    const courseName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      courseName,
      studentInfo.email,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();

  });
});
