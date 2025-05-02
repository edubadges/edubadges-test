import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

institutions.forEach((institution) => {
  test(`See badge in ${institution} staff page`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const dateMask = adminPage.page.getByText('Created').locator('../..');
    const course = 'Growth and Development';

    // setup
    await adminPage.loginTestIdp(institution, 'Issuer');
    await adminPage.badgeClassPage.searchWithText(course);
    await adminPage.badgeClassPage.openBadge(course);

    // validate
    await expect(adminPage.page).toHaveScreenshot(
      `SeeBadgeAs${institution}IssuerAdmin.png`,
      {
        fullPage: true,
        mask: [dateMask],
      },
    );
  });
});
