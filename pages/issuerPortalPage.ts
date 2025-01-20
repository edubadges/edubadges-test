import { expect, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePage } from './basePage';

export class IssuerPortalPage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  switchToDutch() {
    this.page.getByRole('link', { name: 'NL' }).click();
  }

  public languageChange(): void {
    if (this.testdata.language === Language.en) {
      this.changeLocatorsToEnglish();
    } else {
      this.changeLocatorsToDutch();
    }
  }

  private changeLocatorsToEnglish() {
    //throw new Error('Method not implemented.');
  }

  private changeLocatorsToDutch() {
    //throw new Error('Method not implemented.');
  }

  async validateLoginSuccesfull() {
    await expect(
      this.page.getByRole('link', { name: 'Badge classes' }),
    ).toBeVisible();

    var snapshotName = '';

    if (this.testdata.language === Language.en) {
      snapshotName = 'expectedIssuerPortalPageAfterLoginIn-eng.png';
    } else {
      snapshotName = 'expectedIssuerPortalPageAfterLoginIn-nl.png';
    }

    await expect(this.page).toHaveScreenshot(snapshotName, { fullPage: true });
  }
}
