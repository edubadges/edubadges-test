import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';


test('Edit existing edubadge', async ({
    woPage,
  }) => {
    // var
    const issuerGroupName = "Medicine";
    const initialBadgeName = "FirstNameEditBadge";
    const editedBadgeName = "SecondNameEditBadge";
    const editedBadgeDesc = "newDescription";
    const editedBadgeOutcome = "The new outcome";
    const editedBadgeCriterium = "The new criterium";
    const editedBadgeEQF = "EQF 7";
    const editedBadgeIdentifier = "1928";
    const editedBadgeFormOfPart = "Blended";
    const editedBadgeAssesment = "Behavioural assessment";
    const issuers = woPage.managePage.issuersPage;
  
    // setup
    await woPage.goToManage();
    await issuers.createRegularBadge(issuerGroupName, initialBadgeName);
  
    // test
    await issuers.editExistingBadge(editedBadgeName, editedBadgeDesc,
        editedBadgeOutcome, editedBadgeCriterium,
        editedBadgeEQF, editedBadgeIdentifier,
        editedBadgeFormOfPart, editedBadgeAssesment,
    );
    
    // validation
  let maskedLocators = [
    woPage.page
      .getByText('Created ')
      .locator('..'),
  ];
    await expect(woPage.page).toHaveScreenshot('EditedWOBadgeclass.png', { fullPage: true, mask: maskedLocators });
  });