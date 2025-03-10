import { expect, test } from '../../fixtures/catalogFixture';

test('Search for non existing badge', async ({
    catalogPage,
}) => {
    // var
    const course = "I do not exist` this course is not real?";

    // test
    await catalogPage.SearchForClass(course);
    await expect(catalogPage.page).toHaveScreenshot("emptyCatalogPage.png");
});