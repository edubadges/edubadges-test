import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Copy existing regular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = 'A new Medicine regular badge';
    const badgeDesc = 'The original description';
    const badgeOutcome = 'The original outcome';
    const badgeCriterium = 'The original criterium';
    const badgeEQF = 'EQF 7';
    const badgeIdentifier = '1931';
    const badgeFormOfPart = 'Blended';
    const badgeAssesment = 'Behavioural assessment';

    const copiedBadgeName = 'A copied Medicine regular badge';
    const issuers = adminPage.managePage.issuersPage;
    const badgeInfo = adminPage.page
      .locator('.info')
      .or(adminPage.page.locator('.group_items'));

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createRegularBadge(
      initialBadgeName,
      issuerGroupName,
      badgeDesc,
      badgeOutcome,
      badgeCriterium,
      badgeEQF,
      badgeIdentifier,
      badgeFormOfPart,
      badgeAssesment,
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
    await expect(badgeInfo.getByText(badgeIdentifier)).toBeVisible();
    await expect(badgeInfo.getByText(badgeFormOfPart)).toBeVisible();
    await expect(badgeInfo.getByText(badgeAssesment)).toBeVisible();
  });
});
