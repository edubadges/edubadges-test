import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Copy existing micro ${institution} edubadge`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'WO' || institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'WO' && institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = 'A new Medicine micro credential';
    const badgeDesc = 'The original description';
    const badgeOutcome = 'The original outcome';
    const badgeCriterium = 'The original criterium';
    const badgeEQF = 'EQF 7';
    const badgeIdentifier = '1930';
    const badgeFormOfPart = 'Blended';
    const badgeAssesment = 'Behavioural assessment';

    const copiedBadgeName = 'A copied Medicine micro credential';
    const issuers = adminPage.managePage.issuersPage;
    const badgeInfo = adminPage.page
      .locator('.info')
      .or(adminPage.page.locator('.group_items'));

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createMicroBadge(
      issuerGroupName,
      initialBadgeName,
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
