import { expect, test } from '../../../fixtures/studentFixture';

test('Make edubadge public', async ({
    catalogPage,
    backpackPage,
    woTeacherPage,
  }) => {
    //var
    const course = "Introduction to Political Science";
    const institution = "university-example.org";

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();

    await woTeacherPage.badgeClassPage.approveRequest(course);
    
    await backpackPage.OpenBackpack();
    await backpackPage.reloadPage();
    await backpackPage.OpenBadge(course);
  
    // test
    await expect(backpackPage.page
      .getByRole('link', { name: 'Share' }))
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
  test.skip('Share public edubadge', async ({
    catalogPage,
    backpackPage,
    woTeacherPage,
  }) => {
    //var
    const course = "History of Political Thought";
    const institution = "university-example.org";

    //setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.RequestEdubadge();

    await woTeacherPage.badgeClassPage.approveRequest(course);
    
    await backpackPage.OpenBackpack();
    await backpackPage.reloadPage();
    await backpackPage.MakeEdubadgePublic(course);

    await backpackPage.page
      .getByRole('link', { name: 'Share' })
      .waitFor();
    await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
  
    // test
    const url = await backpackPage.getShareLink();
    await backpackPage.ValidateBadge(url);
  });
  