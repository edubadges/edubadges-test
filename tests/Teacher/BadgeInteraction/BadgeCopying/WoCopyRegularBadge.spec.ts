// do last. Is create -> copy -> validate
// TODO: BLOCKING ISSUE: Badge publishing is not possible, so a badge cant be created to copy
import { expect, test } from '../../../../fixtures/staffFixtures/WOFixtures/InstitutionAdminWOFixture';


test('Copy existing regular edubadge', async ({
    woInstitutionAdminPage: woPage,
  }) => {
    // var
    const issuerGroupName = "Medicine";
    const initialBadgeName = "A new Medicine badge";
    const badgeDesc = "The original description";
    const badgeOutcome = "The original outcome";
    const badgeCriterium = "The original criterium";
    const badgeEQF = "EQF 7";
    const badgeIdentifier = "1929";
    const badgeFormOfPart = "Blended";
    const badgeAssesment = "Behavioural assessment";

    const copiedBadgeName = "A copied Medicine badge";
    const issuers = woPage.managePage.issuersPage;
  
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
    await expect(woPage.page.getByText(copiedBadgeName)).toBeVisible();
    await expect(woPage.page.getByText(initialBadgeName)).not.toBeVisible();
    await expect(woPage.page.getByText(issuerGroupName)).toBeVisible();
    await expect(woPage.page.getByText(badgeDesc)).toBeVisible();
    await expect(woPage.page.getByText(badgeOutcome)).toBeVisible();
    await expect(woPage.page.getByText(badgeCriterium)).toBeVisible();
    await expect(woPage.page.getByText(badgeEQF)).toBeVisible();
    await expect(woPage.page.getByText(badgeIdentifier)).toBeVisible();
    await expect(woPage.page.getByText(badgeFormOfPart)).toBeVisible();
    await expect(woPage.page.getByText(badgeAssesment)).toBeVisible();
});
