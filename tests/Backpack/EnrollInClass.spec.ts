import { expect, test } from '../../fixtures/catalogFixture';

test('Make edubadge public', async ({ catalogPage, issuerPortalPage }) => {
  await catalogPage.SearchForClass('Group Dynamics');
  await catalogPage.filterOn('university-example.org');
  await catalogPage.openEduClass('Group Dynamics');
  await catalogPage.RequestEdubadge();
  await catalogPage.page.waitForTimeout(2000);

  await issuerPortalPage.SearchForClass('Group Dynamics');
  await issuerPortalPage.openBadgeClassWithNameFromMainPage('Group Dynamics');
  await issuerPortalPage.rewardBadgeToStudent();
  await issuerPortalPage.page.waitForTimeout(5000);

  await catalogPage.OpenBackpack();
  var maskedElement = [await catalogPage.page.locator('.card > .header')];
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png', {
    mask: maskedElement,
  });

  await catalogPage.page.getByText('Group Dynamics').click();
  await catalogPage.page.waitForTimeout(2000);

  await expect(catalogPage.page).toHaveScreenshot('hallo1.png');

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
