import { expect, test } from '../../../fixtures/catalogFixture';

// TODO: improve locator for unclaimed badge (see Teacher -> Award badge)

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

test('Accept received badge', async ({
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
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.waitForTimeout(500);
    await backpackPage.page.getByRole('link', {name: 'Confirm'}).click();
    await expect(backpackPage.page.getByText('Successfully claimed edubadge')).toBeVisible();
});