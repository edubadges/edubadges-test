import { expect, test } from '../../fixtures/catalogFixture';

test('Make edubadge public', async ({ catalogPage, issuerPortalPage }) => {
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
  await issuerPortalPage.page.waitForTimeout(5000);

  await catalogPage.OpenBackpack();
  var maskedElement = [await catalogPage.page.locator('.card > .header')];
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png', {
    mask: maskedElement,
  });

  await catalogPage.page.getByText('Introduction to Political Science').click();
  await catalogPage.page.waitForTimeout(2000);

  await expect(
    catalogPage.page
      .getByText('New')
      .locator('..')
      .getByText('Introduction to Political Science'),
  ).toBeVisible();
  await catalogPage.page.locator('label span').click({ force: true });
  await catalogPage.page.waitForTimeout(2000);
  await catalogPage.page.getByRole('link', { name: 'Confirm' }).click();
  await catalogPage.page.waitForTimeout(2000);
  await catalogPage.page.getByRole('link', { name: 'Share' }).click();
  await catalogPage.page.waitForTimeout(2000);
  await catalogPage.page.getByRole('link', { name: 'Copy the link' }).click();
  await catalogPage.page.waitForTimeout(2000);

  await catalogPage.page.goto('http://google.com');
  await catalogPage.page
    .getByRole('button', { name: 'Alles afwijzen' })
    .click();
  await catalogPage.page.getByLabel('Zoek', { exact: true }).click();
  await catalogPage.page.keyboard.press('ControlOrMeta+v');
  const url: string = await catalogPage.page
    .getByLabel('Zoek', { exact: true })
    .inputValue();

  await catalogPage.page.goto(url);
  //snapshot toevoegen
  await catalogPage.page.getByRole('link', { name: 'Verify' }).click();
  await catalogPage.page.waitForTimeout(20000);
  //snapshot toevoegen
  await expect(catalogPage.page.locator('.check')).toHaveCount(9);
});

test('Teacher can enroll student', async ({
  backpackPage,
  issuerPortalPage,
  testdata,
}) => {
  await issuerPortalPage.SearchForClass('Digestion and Defense');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage(
    'Digestion and Defense',
  );
  await issuerPortalPage.awardBadgeToStudent(
    testdata.accounts.studentEmail,
    testdata.accounts.studentEPPN,
  );
  await issuerPortalPage.page.waitForTimeout(5000);
  await backpackPage.releadPage();
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
