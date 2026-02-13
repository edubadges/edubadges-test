import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
    test(`Make ${institution} edubadge public`, async ({
        catalogPage,
        backpackPage,
        adminPage,
    }) => {
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
        //await backpackPage.openBadge(badgeName);

        // create collection
        await backpackPage.page.getByRole('link', { name: 'Collections' }).click();
        await backpackPage.page.getByRole('link', { name: 'Create a new collection' }).click();

        await backpackPage.page.getByRole('textbox', { name: 'Name of the collection' }).fill('testcollection');

        await backpackPage.page.getByRole('textbox', { name: 'Description of the collection' }).fill('testdescript');
        await backpackPage.page.getByRole('textbox').nth(2).click();
        await backpackPage.page.getByText(badgeName).click();
        await backpackPage.page.getByRole('link', { name: 'Save' }).click();
        await backpackPage.page.getByRole('link', { name: 'Share' }).click();


        // test
        await backpackPage.openBackpack();
        await backpackPage.openBadge(badgeName);
        await expect(
            backpackPage.page.getByRole('link', { name: 'Share' }),
        ).toHaveAttribute('disabled', 'true');
        await expect(backpackPage.page.locator('.slider')).toBeChecked();

        await backpackPage.makeEdubadgePublic(badgeName);

        await expect(
            backpackPage.page.getByRole('link', { name: 'Share' }),
        ).toHaveAttribute('disabled', 'false');
        await expect(backpackPage.page.locator('.slider')).not.toBeChecked();
        const copyLink = await backpackPage.page.getByRole('link', { name: 'Copy the link' }).click();
        console.log(copyLink + "langelinkkkkkkkkk");
        await backpackPage.page.goto('copyLink');

    });

});

