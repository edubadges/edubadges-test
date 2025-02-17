import { expect, test } from '../../fixtures/catalogFixture';

test('Make edubadge public', async ({
  catalogPage,
  issuerPortalPage,
  copyPastePage,
}) => {
  await catalogPage.SearchForClass('Group Dynamics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Group Dynamics');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(2000);

  await issuerPortalPage.SearchForClass('Group Dynamics');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage('Group Dynamics');
  await issuerPortalPage.rewardBadgeToStudent();

  await catalogPage.OpenBackpack();
  var maskedElement = [await catalogPage.page.locator('.card > .header')];
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png', {
    mask: maskedElement,
  });

  await catalogPage.page.getByText('Group Dynamics').click();
  await catalogPage.page.waitForTimeout(2000);

  await expect(catalogPage.page).toHaveScreenshot('privateEdubadge.png');

  await catalogPage.ShareEdubadge();

  const url = await copyPastePage.retreiveValueFromClipboard();

  await catalogPage.ValidateBadge(url);
});
