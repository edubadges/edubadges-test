import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
    test(`Make ${institution} edubadge public`, async ({
        catalogPage,
        backpackPage,
        adminPage,
    }) => {
        // fail if correct account is missing. SHOULD BE CHANGED
        await test.fail(institution == 'MBO');
        expect(institution != 'MBO').toBeTruthy();

        //var
        const badgeName = 'Psychometrics';
        const studentInfo = await adminPage.getStudentAccount(institution);

        // setup
        await backpackPage.login(institution);
        await adminPage.loginTestIdp(institution, 'Institution');

        await catalogPage.searchWithText(badgeName);
        await catalogPage.filterOn(institution);
        await catalogPage.openBadge(badgeName);
        await catalogPage.requestEdubadge(institution);


        await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

        await backpackPage.page.waitForTimeout(5000);
        await backpackPage.reloadPage();
        await backpackPage.openBackpack();

        // create collection
        await backpackPage.page.getByRole('link', { name: 'Collections' }).click();
        await backpackPage.page.getByRole('link', { name: 'Create a new collection' }).click();
        await backpackPage.page.getByRole('textbox', { name: 'Name of the collection' }).fill('testcollection');
        await backpackPage.page.getByRole('textbox', { name: 'Description of the collection' }).fill('testdescript');
        await backpackPage.page.getByRole('textbox').nth(2).click();
        await backpackPage.page.getByText(badgeName).click();
        await backpackPage.page.getByRole('link', { name: 'Save' }).click();
        await backpackPage.page.waitForTimeout(4000);

        //At least one badge should be in the collection to open it public, so we add the badge to the collection first, then we can open the collection public
        await backpackPage.openBackpack();
        await backpackPage.openBadge(badgeName);
        await expect(
            backpackPage.page.getByRole('link', { name: 'Share' }),
        ).toHaveAttribute('disabled', 'true');
        await expect(backpackPage.page.locator('.slider')).toBeChecked();
        await backpackPage.makeEdubadgePublic(badgeName);
        await backpackPage.page.waitForTimeout(4000);

        //Open collection set Public
        await backpackPage.page.getByRole('link', { name: 'Your edubadges' }).click();
        await backpackPage.page.getByRole('link', { name: 'Collections' }).click();
        await backpackPage.page.locator('.pencil').first().click({ force: true });
        await backpackPage.page.locator('.checkmarked').check({ force: true });
        await backpackPage.page.waitForTimeout(2000);
        await backpackPage.page.getByRole('link', { name: 'Save changes' }).click();
        await backpackPage.page.waitForTimeout(4000);

        // test
     
        await backpackPage.page.getByRole('link', { name: 'Share' }).click();
        const context = backpackPage.page.context();
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);


  ``    // 1. Press button copy link
        await backpackPage.page.getByRole('link', { name: 'Copy the link' }).click();

        // 2. Retrieve the clioboard content
        const clipboardText = await backpackPage.page.evaluate(() => navigator.clipboard.readText());
        console.log('Clipboard Content', clipboardText);

     //3. Navigate only if the link is valid
        if (clipboardText) {
            await backpackPage.page.goto(clipboardText);
            await backpackPage.page.waitForTimeout(4000);

        } else {
            throw new Error('Link "href" attribute is null or missing.');
        }

         await expect(backpackPage.page.getByText('testcollection')).toBeVisible();
        await backpackPage.page.waitForTimeout(4000);




    });

});

