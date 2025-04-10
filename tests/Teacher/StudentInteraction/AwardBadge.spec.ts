import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach(institution => {
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
  await catalogPage.requestEdubadge();

  // test
  await adminPage.badgeClassPage.approveRequest(course);

  // validate
  await expect(adminPage.page.getByText('The request(s) have been awarded.')).toBeVisible();
});

test(`Send badge directly from ${institution}`, async ({ 
  adminPage 
}) => {
  // var
  const courseName = 'Cognitive Psychology';

  // test
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.badgeClassPage.directAwardBadgeToStudent(courseName);

  // validate
  await expect(adminPage.page.getByText('Direct awards have been sent')).toBeVisible();
});
});
