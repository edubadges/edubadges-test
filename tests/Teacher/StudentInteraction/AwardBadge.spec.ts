import { expect, test } from '../../../fixtures/catalogFixture';

// TODO: add parameterised test to also test with other accounts.
// TODO: bulk award

test('Award requested badge', async ({
    catalogPage,
    issuerPortalPage,
  }) => {
    // var
    const course = "Psychometrics";
    const institution = "university-example.org";
    
    // setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();
  
    // test
    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardBadgeToStudent();
    await expect(issuerPortalPage.page.getByText('The request(s) have been awarded.')).toBeVisible();
  });

test('Direct award badge', async ({
    backpackPage,
    issuerPortalPage,
  }) => {
    // var
    const courseName = "Cognitive Psychology";
    const receivedBadgeLocator = backpackPage.page
        .getByText('Unclaimed')
        .locator('..')
        .getByText(courseName)
        .locator('../../..')    // coursename is 3 sub classes deep
        .getByText('View details to claim this edubadge');

    // setup
    await backpackPage.OpenBackpack();
    await expect(receivedBadgeLocator).not.toBeVisible();

    // test
    await issuerPortalPage.directAwardBadgeToStudent(courseName);
    await backpackPage.reloadPage();
    await expect(receivedBadgeLocator).toBeVisible();
  });
  