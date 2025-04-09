import { expect, test } from '../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';
// TODO: add parameterised test to also test with other accounts.
// TODO: bulk award

test('Award requested badge', async ({
  catalogPage,
  woInstitutionAdminPage: woPage,
}) => {
  // var
  const course = 'Psychometrics';
  const institution = 'university-example.org';

  // setup
  await catalogPage.searchForClass(course);
  await catalogPage.filterOn(institution);
  await catalogPage.openEduClass(course);
  await catalogPage.requestEdubadge();

  // test
  await woPage.badgeClassPage.approveRequest(course);

  // validate
  await expect(
    woPage.page.getByText('The request(s) have been awarded.'),
  ).toBeVisible();
});

test('Send badge directly', async ({ woInstitutionAdminPage: woPage }) => {
  // var
  const courseName = 'Cognitive Psychology';

  // test
  await woPage.badgeClassPage.directAwardBadgeToStudent(courseName);

  // validate
  await expect(
    woPage.page.getByText('Direct awards have been sent'),
  ).toBeVisible();
});
