import { expect, test } from '../../fixtures/studentFixture';

test('Search for non existing badge', async ({
    catalogPage,
}) => {
    // var
    const course = "I do not exist` this course is not real?";

    // test
    await catalogPage.SearchForClass(course);
    await expect(catalogPage.page).toHaveScreenshot("emptyCatalogPage.png");
});

test('Look at existing badge', async ({
    catalogPage,
}) => {
    // var
    const course = "Group Dynamics";
    const institution = "harvard-example.edu";

    // test
    await catalogPage.SearchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await expect(catalogPage.page).toHaveScreenshot('edubadgeAnonymous.png');
});