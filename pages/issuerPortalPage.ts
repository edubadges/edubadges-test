import { expect, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePage } from './basePage';
import path from 'path';

export class IssuerPortalPage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  switchToDutch() {
    this.page.getByRole('link', { name: 'NL' }).click();
  }

  async validateLoginSuccesfull() {
    await expect(
      this.page.getByRole('link', { name: 'Badge classes' }),
    ).toBeVisible();

    var snapshotName = '';

    if (this.testdata.language === Language.en) {
      snapshotName = `expectedIssuerPortalPageAfterLoginIn-eng${this.testdata.testCaseName}.png`;
    } else {
      snapshotName = `expectedIssuerPortalPageAfterLoginIn-nl${this.testdata.testCaseName}.png`;
    }

    await expect(this.page).toHaveScreenshot(snapshotName, { fullPage: true });
  }

  async goToManage(){
    await this.page.getByRole('link', { name: 'Manage' }).click();
    await expect(this.page.getByRole('link', { name: 'Edit educational institution' })).toBeVisible();
  }

  async searchForBadgeClass(badgeClassName: string) {
    await this.page.getByPlaceholder('Search...').fill(badgeClassName);
  }

  async openBadgeClassWithName(name: string) {
    await this.page.getByRole('cell', { name: name }).click();
    await expect(this.page.getByRole('link', { name: 'Add new badge class' })).toBeVisible();
  }

  async createNewBadgeClass() {
    await this.page.getByRole('link', { name: 'Add new badge class' }).click();
    await expect(this.page).toHaveScreenshot("PopupEduBadgeTypes.png", {fullPage: true});
  }

  async createNewMicroCredential() {
    await this.page.getByText('Microcredential A badge class').getByRole('link', { name: 'Create' }).click();
  }

  async createRegularEduBadge() {
    await this.page.getByText('Regular A badge class for').getByRole('link', { name: 'Create' }).click();
  }

  async createExtraCurricularEduBadge() {
    await this.page.getByText('Extra curricular A badge').getByRole('link', { name: 'Create' }).click();
  }

  async fillInMicrocredentialForm() {
    await this.page.getByPlaceholder('(Required field) e.g.').fill('Microcredential Test automation');
    await this.page.locator('.CodeMirror-scroll').first().click();
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.type('Microcredential description');
    await this.page.locator('.CodeMirror-scroll').nth(1).click();    
    await this.page.keyboard.type('Microcredential learning outcomes');
    await this.page.locator('.CodeMirror-scroll').nth(2).click();
    await this.page.keyboard.type('Microcredential criteria');
    await this.page.getByPlaceholder('Please select...').first().click();
    await this.page.getByText("EQF 1").click();
    await this.page.getByPlaceholder('e.g. 12111990').first().fill('11112222');
    await this.page.getByPlaceholder('Please select...').first().click();
    await this.page.getByText("On-site").click();
    await this.page.getByPlaceholder('Please select...').click();
    await this.page.getByText('(Written) Exam').click();
    await this.page.getByPlaceholder('e.g. history').fill('Framework name');
    await this.page.getByPlaceholder('e.g. ESCO').fill('Framework esco');
    await this.page.getByPlaceholder('e.g. http://data.europa.eu/').fill('wwww.surf.nl');
    await this.page.getByPlaceholder('e.g. 2b22f3b1-5de4-43f9-b6d1-').fill('wut');
    await this.page.locator('.CodeMirror-scroll').nth(3).click();    
    await this.page.keyboard.type('iugaiuegfigaef');

    await this.page.getByText('Upload image').click();

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.getByText('Upload image').click();
    const fileChooser = await fileChooserPromise;
    console.log(__dirname);
    await fileChooser.setFiles(path.join(__dirname + '/images/', 'edubadge.png'));
  }

  async publishBadge() {
    await this.page.getByRole('link', { name: 'Publish' }).click();
}
}
