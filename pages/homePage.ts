import { expect, Locator, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePageMultiLanguage } from './basePageMultiLanguage';

export class HomePage extends BasePageMultiLanguage {
  private openIssuerPortalLocator: Locator = this.page.getByRole('link', {
    name: 'Open the issuer portal',
  });

  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
    this.languageChange();
  }

  public languageChange(): void {
    if (this.testdata.language === Language.en) {
      this.changeLocatorsToEnglish();
    } else {
      this.changeLocatorsToDutch();
    }
  }

  private changeLocatorsToEnglish() {
    this.openIssuerPortalLocator = this.page.getByRole('link', {
      name: 'Open the issuer portal',
    });
  }

  private changeLocatorsToDutch() {
    this.openIssuerPortalLocator = this.page.getByRole('link', {
      name: 'Open het issuer portaal',
    });
  }

  async navigateToHomePage() {
    await this.page.goto('');
  }

  async OpenCatalog() {
    await this.page.getByRole('link', { name: 'Open the catalog' }).click();
  }

  async expectHomePageOpened() {
    var snapshotName = '';
    var maskedLocators: Locator[] = [];
    maskedLocators.push(await this.page.getByText(' Badge Classes').first());
    maskedLocators.push(
      await this.page.getByRole('heading', { name: 'At this moment ' }).first(),
    );

    if (this.testdata.language === Language.en) {
      snapshotName = `expectedLoginPageOpened-eng.png`;
    } else {
      snapshotName = `expectedLoginPageOpened-nl.png`;
    }
    await expect(this.page).toHaveScreenshot(snapshotName, {
      fullPage: true,
      mask: maskedLocators,
    });
  }

  async openIssuerPortal() {
    await this.openIssuerPortalLocator.click();
  }

  async switchToDutch() {
    await this.page.getByRole('link', { name: 'NL' }).click();
    this.testdata.language = Language.nl;
  }

  async switchToEnglish() {
    await this.page.getByRole('link', { name: 'EN' }).click();
    this.testdata.language = Language.nl;
  }
}
