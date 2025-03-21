import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Delete WO issuer group', async ({
    woPage,
  }) => {
    // var
    const existingGroupName = "Science";
    const issuerGroup = woPage.managePage.issuerGroupPage;
    const maskDate = woPage.page
        .getByText('Created ')
        .locator('..')
        .locator('..');

    // test
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();
    await issuerGroup.searchWithText(existingGroupName);
    await issuerGroup.page.locator('td').getByText(existingGroupName, { exact: true }).click();

    await expect(woPage.page).toHaveScreenshot('See existing group', { mask: [maskDate] });
  });