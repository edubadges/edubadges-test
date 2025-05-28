import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { institution } from '../util/loginPossibilities';

export class CatalogPage extends BasePage {
  // Search locators
  private readonly searchField = this.page.getByPlaceholder('Search...');

  // Login locators
  private readonly usernameField = this.page.getByPlaceholder(
    'e.g. user@gmail.com',
  );
  private readonly eduIdButton = this.page.getByRole('heading', {
    name: 'Login with eduID (NL) test',
  });
  private readonly nextButton = this.page.locator('[href*="/next"]');
  private readonly passwordField = this.page.getByPlaceholder('Password');
  private readonly loggedInMenu = this.page.locator('.expand-menu');

  // Request badge locators
  private readonly loginButton = this.page.getByRole('link', {
    name: 'Login to request this edubadge',
  });
  private readonly requestButton = this.page.getByRole('link', {
    name: 'Request',
    exact: true,
  });
  private readonly confirmButton = this.page.getByRole('link', {
    name: 'Confirm',
  });
  private readonly successBar = this.page.getByText('Successfully requested');

  async searchWithText(name: string) {
    await this.searchField.fill(name);
  }

  async filterOn(institution: institution = 'WO') {
    let institutionName: string;
    switch (institution) {
      case 'WO':
        institutionName = 'university-example.org';
        break;
      case 'HBO':
        institutionName = 'yale-uni-example.edu';
        break;
      case 'MBO':
        institutionName = 'harvard-example.edu';
        break;
    }

    await this.page.getByText(institutionName).click();
  }

  async openBadge(name: string) {
    await this.page.getByText(name).first().click();
    await expect(
      this.page.getByRole('heading', { name: 'The programme' }),
    ).toBeVisible();
  }

  async requestEdubadge(
    institution: institution,
    accountNr: number = this.testdata.retryCount,
  ) {
    if (await this.loginButton.isVisible()) {
      await this.loginButton.click();
      await this.loginStudentIdp(institution, accountNr);
    }

    await this.requestButton.waitFor({ timeout: 10000 });
    await this.requestButton.click();
    await this.waitForLoadingToStop();

    await this.handleTermsAndConditions(this.confirmButton.or(this.successBar));
    await this.confirmButton.or(this.successBar).click();

    await this.successBar.waitFor();
  }

  public async loginStudentIdp(
    institution: institution,
    accountNr: number = this.testdata.retryCount,
  ) {
    await this.searchField.or(this.usernameField).waitFor();

    if (await this.searchField.isVisible()) {
      await this.searchField.fill('test idp');
      await this.eduIdButton.click();
      await this.usernameField.waitFor();
    }

    const account = await this.getStudentAccount(institution, accountNr);

    await this.usernameField.fill(account.email);
    await this.page.waitForTimeout(100);
    await this.nextButton.click();

    await this.passwordField.waitFor();
    await this.page.waitForTimeout(100);
    await this.passwordField.fill(account.password);
    await this.nextButton.click();

    await this.handleTermsAndConditions(this.loggedInMenu);
  }
}
