import { expect, Locator, Page } from '@playwright/test';
import { Testdata, Language } from '../util/testdata';
import { BasePageMultiLanguage } from './basePageMultiLanguage';

export class LoginPage extends BasePageMultiLanguage {
  private openIssuerPortalLocator: Locator = this.page.getByRole('link', {
    name: 'Open the issuer portal',
  });
  private searchFieldLocator: Locator = this.page.getByPlaceholder('Search...');
  private surfConextLocator: Locator = this.page.getByRole('heading', {
    name: 'Login with SURFconext Test IdP',
  });
  private usernameLocator: Locator = this.page.getByLabel('Username');
  private passwordLocator: Locator = this.page.getByLabel('Password');
  private loginButtonLocator: Locator = this.page.getByRole('button', {
    name: 'Login',
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
    this.searchFieldLocator = this.page.getByPlaceholder('Search...');
    this.surfConextLocator = this.page.getByRole('heading', {
      name: 'Login with SURFconext Test IdP',
    });
  }

  private changeLocatorsToDutch() {
    this.openIssuerPortalLocator = this.page.getByRole('link', {
      name: 'Open het issuer portaal',
    });
    this.searchFieldLocator = this.page.getByPlaceholder('Zoeken...');
    this.surfConextLocator = this.page.getByRole('heading', {
      name: 'Inloggen met SURFconext Test IdP',
    });
  }

  async navigateToLoginPage() {
    await this.page.goto('');
  }

  async expectLoginPageOpened() {
    var snapshotName = '';

    if (this.testdata.language === Language.en) {
      snapshotName = 'expectedLoginPageAfterLoginIn-eng.png';
    } else {
      snapshotName = 'expectedLoginPageAfterLoginIn-nl.png';
    }
    await expect(this.page).toHaveScreenshot(snapshotName, { fullPage: true });
  }

  async loginWithInstitutionAdmin() {
    await this.openIssuerPortalLocator.click();

    await this.searchFieldLocator.fill('test idp');
    await expect(this.surfConextLocator).toBeVisible();
    await this.surfConextLocator.click();

    await this.usernameLocator.fill(this.testdata.institutionAdminUsername);
    await this.passwordLocator.fill(this.testdata.institutionAdminPassword);
    await this.loginButtonLocator.click();
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
