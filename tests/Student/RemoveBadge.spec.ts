import { expect, test } from '../../fixtures/catalogFixture';

test('Reject received badge', async ({
    backpackPage,
    issuerPortalPage,
}) => {
    // var
    const course = "Law and Politics";

    // setup
    await issuerPortalPage.directAwardBadgeToStudent(course);
    
    // test
    await backpackPage.OpenBackpack();
    await backpackPage.page.getByText('View details to claim this edubadge').click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', { name: 'Reject' }).click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', {name: 'Confirm'}).click();
    await expect(backpackPage.page.getByText('Edubadge is rejected')).toBeVisible();
});

test('Reject accepted badge', async ({
    backpackPage,
    issuerPortalPage,
}) => {
    // var
    const course = "Circulation and Breathing";

    //setup
    await issuerPortalPage.directAwardBadgeToStudent(course);
    await backpackPage.OpenBackpack();
    await backpackPage.page.getByText('View details to claim this edubadge').click();
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