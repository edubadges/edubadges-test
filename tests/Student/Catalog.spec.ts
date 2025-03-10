import { expect, test } from '../../fixtures/catalogFixture';

test('Request badge', async ({
    catalogPage,
}) => {
// var
    const course = "Group Dynamics";
    const institution = "university-example.org";

    // setup
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);

    // test
    await catalogPage.RequestEdubadge();
    await catalogPage.page.waitForTimeout(1000);
    await expect(catalogPage.page.getByText(`successfully requested edubadge ${course}`)).toBeVisible();
    await expect(catalogPage.page).toHaveScreenshot('eduBadgeRequested.png');
});