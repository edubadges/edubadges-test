import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';


test('Copy existing regular edubadge', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const issuerGroupName = "Medicine";
    const initialBadgeName = "A new Medicine regular badge";
    const badgeDesc = "The original description";
    const badgeOutcome = "The original outcome";
    const badgeCriterium = "The original criterium";
    const badgeEQF = "EQF 7";
    const badgeIdentifier = "1931";
    const badgeFormOfPart = "Blended";
    const badgeAssesment = "Behavioural assessment";

    const copiedBadgeName = "A copied Medicine regular badge";
    const issuers = woPage.managePage.issuersPage;
    const badgeInfo = woPage.page.locator('.info').or(woPage.page.locator('.group_items'));
  
    // setup
    await woPage.goToManage();
    await issuers.createRegularBadge(
        issuerGroupName, initialBadgeName, badgeDesc,
        badgeOutcome, badgeCriterium, badgeEQF,
        badgeIdentifier, badgeFormOfPart, badgeAssesment
    );

    // test
    await issuers.copyExistingBadge(copiedBadgeName);
    
    // validation
    await expect(badgeInfo.getByText(copiedBadgeName).first()).toBeVisible();
    await expect(badgeInfo.getByText(initialBadgeName)).not.toBeVisible();
    await expect(badgeInfo.getByText(issuerGroupName).first()).toBeVisible();
    await expect(badgeInfo.getByText(badgeDesc)).toBeVisible();
    await expect(badgeInfo.getByText(badgeOutcome)).toBeVisible();
    await expect(badgeInfo.getByText(badgeCriterium)).toBeVisible();
    //await expect(badgeInfo.getByText(badgeEQF)).toBeVisible();
    await expect(badgeInfo.getByText(badgeIdentifier)).toBeVisible();
    await expect(badgeInfo.getByText(badgeFormOfPart)).toBeVisible();
    await expect(badgeInfo.getByText(badgeAssesment)).toBeVisible();
});
