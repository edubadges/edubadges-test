import { expect, test } from '../../fixtures/catalogFixture';

test.skip('Make edubadge public', async ({
  catalogPage,
  issuerPortalPage,
  copyPastePage,
}) => {
  await catalogPage.SearchForClass('Introduction to Political Science');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Introduction to Political Science');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(2000);

  await issuerPortalPage.SearchForClass('Introduction to Political Science');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage(
    'Introduction to Political Science',
  );
  await issuerPortalPage.rewardBadgeToStudent();

  await catalogPage.OpenBackpack();
  var maskedElement = [await catalogPage.page.locator('.card > .header')];
  // TODO: screenshot is different if it is parallel, first testcase, and other variables
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png', {
    mask: maskedElement,
  });

  await catalogPage.page.getByText('Introduction to Political Science').click();
  await catalogPage.page.waitForTimeout(2000);

  await expect(
    catalogPage.page
      // not persistent? vgm zorgt parallel ervoor dat de New weggaat
      //.getByText('New')
      //.locator('..')
      .getByText('Introduction to Political Science').first(),
  ).toBeVisible();

  await catalogPage.ShareEdubadge();

  const url = await copyPastePage.retreiveValueFromClipboard();

  await catalogPage.ValidateBadge(url);
});

/* replaced by InstitutionAdmin -> BadgeAward -> Direct award badge

test('Teacher can enroll student', async ({
  backpackPage,
  issuerPortalPage,
}) => {
  const courseName = 'Digestion and Defense';
  await issuerPortalPage.directAwardBadgeToStudent(courseName);
  await backpackPage.reloadPage();
  await backpackPage.page.waitForTimeout(2000);
  await expect(
    backpackPage.page
      .getByText('Unclaimed')
      .locator('..')
      .getByText('Digestion and Defense'),
  ).toBeVisible();
  await backpackPage.AcceptBadge('Digestion and Defense');
  await expect(backpackPage.page).toHaveScreenshot('badgeAccepted.png');
});
*/
