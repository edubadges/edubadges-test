import { expect, Locator, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePageMultiLanguage } from './basePageMultiLanguage';

export class HomePage extends BasePageMultiLanguage {
  // Navigation locators
  private readonly catalogLink = this.page.getByRole('link', {
    name: 'Open the catalog',
  });
  private readonly backpackLink = this.page.getByRole('link', {
    name: 'Open your backpack',
  });
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

  async openCatalog() {
    await this.catalogLink.click();
    await this.waitForLoadingToStop();
  }

  async openBackpack() {
    await this.backpackLink.click();
    await this.waitForLoadingToStop();
  }

  async expectHomePageOpened() {
    const snapshotName =
      'expectedLoginPageOpened-' +
      (this.testdata.language === Language.en ? 'eng' : 'nl') +
      '.png';

    const maskBadge = this.page
      .getByText(' Badge Classes')
      .first()
      .locator('../../..');

    await expect(this.page).toHaveScreenshot(snapshotName, {
      mask: [maskBadge],
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
