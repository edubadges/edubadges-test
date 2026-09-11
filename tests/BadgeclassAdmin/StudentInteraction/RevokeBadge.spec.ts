import { expect, test } from '../../../fixtures/staffFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Have received ${institution} badge revoked`,{annotation: [{type: 'Have revoked badge', description: 'The test calls staffFixture.ts in the fixture folder. Use adminPage, which contains a browser context to navigate to the homepage, and click the button Open the issuer portaal. This navigates to the Issuer portal page. Log in with user. Search for Need extra badge name. Request badge and revoke request The request(s) have been revoked.'}]}, async ({
    catalogPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Need extra badge name';
    await test.fail(badgeName == 'Need extra badge name');
    expect(badgeName != 'Need extra badge name').toBeTruthy();

    const reason = 'A valid reason for revocation';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Institution');

    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    await catalogPage.requestEdubadge(institution);

    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    // test
    await adminPage.goToBadgeClasses();
    await adminPage.badgeClassPage.revokeAwardedBadge(
      badgeName,
      studentInfo.name,
      reason,
    );

    // validate
    await expect(
      adminPage.page.getByText('The edubadge(s) have been revoked.'),
    ).toBeVisible();
  });
});
