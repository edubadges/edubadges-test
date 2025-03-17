import { expect, test } from '../../../fixtures/catalogFixture';

test('Make edubadge public', async ({
    catalogPage,
    backpackPage,
    issuerPortalPage,
  }) => {
    //var
    const course = "Introduction to Political Science";
    const institution = "university-example.org";

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();

    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardRequestedBadgeToStudent();
    
    await backpackPage.OpenBackpack();
    await backpackPage.reloadPage();
    await backpackPage.OpenBadge(course);
  
    // test
    await expect(backpackPage.page
      .getByRole('link', { name: 'Share' }))
      // disabled is an attribute, not a property. locator.isDisabled() returns false
      .toHaveAttribute('disabled', 'true');
    await expect(backpackPage.page.locator('.slider')).toBeChecked();
    
    await backpackPage.MakeEdubadgePublic(course);

    await expect(backpackPage.page
      .getByRole('link', { name: 'Share' }))
      .toHaveAttribute('disabled', 'false');
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
    await expect(backpackPage.page).toHaveScreenshot('Successfully made badge public.png');
  });

  // known issue on the verification of the public badge
  test('Share public edubadge', async ({
    catalogPage,
    backpackPage,
    issuerPortalPage,
  }) => {
    //var
    const course = "History of Political Thought";
    const institution = "university-example.org";

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();

    await issuerPortalPage.SearchForClass(course);
    await issuerPortalPage.openBadgeClassWithNameFromMainPage(course);
    await issuerPortalPage.rewardRequestedBadgeToStudent();
    
    await backpackPage.OpenBackpack();
    await backpackPage.reloadPage();
    await backpackPage.MakeEdubadgePublic(course);
    await expect(backpackPage.page
      .getByRole('link', { name: 'Share' }))
      .toHaveAttribute('disabled', 'false');
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
  
    // test
    const url = await backpackPage.getShareLink();
    await backpackPage.ValidateBadge(url);
  });
  