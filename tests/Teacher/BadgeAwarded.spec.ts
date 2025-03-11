import { expect, test } from '../../fixtures/catalogFixture';

test('Award requested badge', async ({
    backpackPage,
    catalogPage,
    issuerPortalPage,
  }) => {
    // var
    const course = 'Group Dynamics';
    const institution = 'university-example.org';
    
    // setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();
  
    // test
    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardBadgeToStudent();
    await expect(backpackPage.page.getByText('The request(s) have been awarded.')).toBeVisible();
  });
  