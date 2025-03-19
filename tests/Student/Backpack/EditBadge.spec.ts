import { expect, test } from '../../../fixtures/studentFixture';

// TODO: Make public, Share, Make private

test('Reject accepted badge', async ({
    backpackPage,
    woTeacherPage
}) => {
    // var
    const course = "Circulation and Breathing";

    //setup
    await woTeacherPage.badgeClassPage.directAwardBadgeToStudent(course);

    await backpackPage.reloadPage();
    await backpackPage.OpenBackpack();
    await backpackPage.page
        .getByText(course)
        .locator('../../..')
        .getByText('View details to claim this edubadge')
        .click();
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    // TODO: first time accepting fix, maybe function it away
    await backpackPage.page.waitForTimeout(1000);
    if(await backpackPage.page.getByRole('link', { name: 'I agree' }).isVisible())
        { backpackPage.page.getByRole('link', { name: 'I agree' }).click(); }
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();
    await expect(backpackPage.page.getByText('Successfully claimed edubadge')).toBeVisible();

    // test
    await backpackPage.page.getByRole('link', { name: 'Reject this edubadge' }).click();
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();
    await expect(backpackPage.page.getByText('Rejected')).toBeVisible();
});