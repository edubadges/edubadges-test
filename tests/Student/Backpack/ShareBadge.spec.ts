import { expect, test } from '../../../fixtures/catalogFixture';

test('Make edubadge public', async ({
    catalogPage,
    backpackPage,
    issuerPortalPage,
    copyPastePage,
  }) => {
    //var
    const course = "Introduction to Political Science";
    const institution = "university-example.org";
    const eduBadgeCard = backpackPage.page
        .getByText('New')
        .locator('..')
        .getByText(course);

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();
    await catalogPage.page.waitForTimeout(500);

    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardBadgeToStudent();
    
    // TODO: screenshot is different if it is parallel, first testcase, and other variables
    await expect(eduBadgeCard).toBeVisible();
    await eduBadgeCard.click();  
    await expect(eduBadgeCard).toBeVisible();
  
    // test
    await expect(eduBadgeCard.locator('checked')).toBeVisible();
    await backpackPage.MakeEdubadgePublic();
    await expect(eduBadgeCard.locator('checked')).not.toBeVisible();
  });

  // known issue on the verification of the public badge
  test.skip('Share public edubadge', async ({
    catalogPage,
    backpackPage,
    issuerPortalPage,
    copyPastePage,
  }) => {
    //var
    const course = "History of Political Thought";
    const institution = "university-example.org";
    const eduBadgeCard = backpackPage.page
        .getByText('New')
        .locator('..')
        .getByText(course);

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();
    await catalogPage.page.waitForTimeout(500);

    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardBadgeToStudent();
    
    // TODO: screenshot is different if it is parallel, first testcase, and other variables
    await expect(eduBadgeCard).toBeVisible();
    await eduBadgeCard.click();  
    await expect(eduBadgeCard).toBeVisible();
  
    // test    
    await backpackPage.MakeEdubadgePublic();
  
    const url = await copyPastePage.retreiveValueFromClipboard();
  
    await backpackPage.ValidateBadge(url);
  });
  