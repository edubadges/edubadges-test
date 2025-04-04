import { expect, test } from '../../../fixtures/studentFixture';

// TODO: improve locator for unclaimed badge (see Teacher -> Award badge)

test('Reject received badge', async ({
    backpackPage,
    woTeacherPage,
}) => {
    // var
    const badgeName = "Law and Politics";
    const unclaimedBadgeLocator = backpackPage.page
        .getByText(badgeName)
        .locator('../../..')
        .getByText('View details to claim this edubadge');

    // setup
    await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(badgeName);
    
    // test
    await backpackPage.rejectReceivedBadge(badgeName);

    // validate
    await expect(backpackPage.page.getByText('Edubadge is rejected')).toBeVisible();
});

test('Accept received badge', async ({
    backpackPage,
    woTeacherPage,
}) => {
    // var
    const badgeName = "Introduction to Psychology";
    const unclaimedBadgeLocator = backpackPage.page
        .getByText(badgeName)
        .locator('../../..')
        .getByText('View details to claim this edubadge');

    // setup
    await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(badgeName);
    
    // test
    await backpackPage.reloadPage();
    await backpackPage.openBackpack();
    await unclaimedBadgeLocator.click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();

    // validate
    await expect(backpackPage.page.getByText('Successfully claimed edubadge')).toBeVisible();
});