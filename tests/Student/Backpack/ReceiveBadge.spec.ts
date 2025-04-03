import { expect, test } from '../../../fixtures/studentFixture';

// TODO: improve locator for unclaimed badge (see Teacher -> Award badge)

test('Reject received badge', async ({
    backpackPage,
    woTeacherPage,
}) => {
    // var
    const course = "Law and Politics";
    const unclaimedBadgeLocator = backpackPage.page
        .getByText(course)
        .locator('../../..')
        .getByText('View details to claim this edubadge');

    // setup
    await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(course);
    
    // test
    await backpackPage.reloadPage();
    await backpackPage.OpenBackpack();
    await unclaimedBadgeLocator.click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Reject' }).click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

    // validate
    await expect(backpackPage.page.getByText('Edubadge is rejected')).toBeVisible();
});

test('Accept received badge', async ({
    backpackPage,
    woTeacherPage,
}) => {
    // var
    const course = "Introduction to Psychology";
    const unclaimedBadgeLocator = backpackPage.page
        .getByText(course)
        .locator('../../..')
        .getByText('View details to claim this edubadge');

    // setup
    await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(course);
    
    // test
    await backpackPage.reloadPage();
    await backpackPage.OpenBackpack();
    await unclaimedBadgeLocator.click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

    // validate
    await expect(backpackPage.page.getByText('Successfully claimed edubadge')).toBeVisible();
});