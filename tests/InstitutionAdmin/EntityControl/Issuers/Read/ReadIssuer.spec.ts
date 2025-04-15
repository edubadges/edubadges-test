import { expect, test } from '../../../../../fixtures/staffFixture';
import { institutions } from '../../../../../util/loginPossibilities';

institutions.forEach(institution => {
test(`See ${institution} issuer`, async ({ adminPage }) => {
  // var
  const issuer = adminPage.managePage.issuersPage;
  const existingGroupName = 'Computer Science';
  const badgeInfoMask = adminPage.page.locator('div.info');
  const crumbMask = adminPage.page.locator('div.bread-crumb');

  // test
  await adminPage.loginTestIdp(institution, 'Institution');
  await adminPage.goToManage();
  await adminPage.managePage.goToIssuers();
  await issuer.openIssuer(existingGroupName);
  await adminPage.waitForLoadingToStop();

  await expect(adminPage.page).toHaveScreenshot('SeeExistingIssuer.png', {
    mask: [badgeInfoMask, crumbMask],
  });
});
});