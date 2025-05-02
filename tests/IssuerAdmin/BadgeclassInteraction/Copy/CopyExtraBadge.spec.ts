import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`Copy existing extracurricular ${institution} edubadge`, async ({
    adminPage,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroupName = 'Medicine';
    const initialBadgeName = 'A new Medicine extra curricular badge';
    const badgeDesc = 'The original description';
    const badgeOutcome = 'The original outcome';
    const badgeCriterium = 'The original criterium';
    const badgeEQF = 'EQF 7';
    const badgeIdentifier = '1929';
    const badgeFormOfPart = 'Blended';
    const badgeAssesment = 'Behavioural assessment';
    const badgeHours = '210';

    const copiedBadgeName = 'A copied Medicine extra curricular badge';
    const issuers = adminPage.managePage.issuersPage;
    const badgeInfo = adminPage.page
      .locator('.info')
      .or(adminPage.page.locator('.group_items'));

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.goToManage();
    await issuers.createExtracurricularBadge(
      issuerGroupName,
      initialBadgeName,
      badgeDesc,
      badgeOutcome,
      badgeCriterium,
      badgeEQF,
      badgeIdentifier,
      badgeFormOfPart,
      badgeAssesment,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined, // skip framework arguments
      badgeHours,
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
    await expect(badgeInfo.getByText(badgeHours)).toBeVisible();
  });
});
