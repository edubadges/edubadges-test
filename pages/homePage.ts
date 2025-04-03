import { expect, Locator, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePageMultiLanguage } from './basePageMultiLanguage';

export class HomePage extends BasePageMultiLanguage {
  // Navigation locators
  private readonly catalogLink = this.page.getByRole('link', { name: 'Open the catalog' });
  private readonly backpackLink = this.page.getByRole('link', { name: 'Open your backpack' });
  private readonly dutchLink = this.page.getByRole('link', { name: 'NL' });
  private readonly englishLink = this.page.getByRole('link', { name: 'EN' });

  // Language-specific locators
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
    await this.catalogLink.click();
  }

  async OpenBackpack() {
    await this.backpackLink.click();
  }

  async expectHomePageOpened() {
    const snapshotName = this.testdata.language === Language.en
      ? 'expectedLoginPageOpened-eng.png'
      : 'expectedLoginPageOpened-nl.png';

    const maskedLocators = [
      this.page
        .getByText(' Badge Classes')
        .first()
        .locator('..')
        .locator('..')
        .locator('..')
    ];

    await expect(this.page).toHaveScreenshot(snapshotName, {
      fullPage: true,
      mask: maskedLocators,
    });
  }

  async openIssuerPortal() {
    await this.openIssuerPortalLocator.click();
  }

  async switchToDutch() {
    await this.dutchLink.click();
    this.testdata.language = Language.nl;
  }

  async switchToEnglish() {
    await this.englishLink.click();
    this.testdata.language = Language.en;
  }
}
