import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CatalogPage extends BasePage {
  // Search and filter locators
  private readonly searchField = this.page.getByPlaceholder('Search...');
  private readonly filterText = this.page.getByText('university-example.org');

  // Login locators
  private readonly usernameField = this.page.getByPlaceholder('e.g. user@gmail.com');
  private readonly eduIdButton = this.page.getByRole('heading', { name: 'Login with eduID (NL) test' });
  private readonly nextButton = this.page.locator('[href*="/next"]');
  private readonly passwordField = this.page.getByPlaceholder('Password');
  private readonly termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
  private readonly loggedInMenu = this.page.locator('.expand-menu');

  // Request badge locators
  private readonly loginButton = this.page.getByRole('link', { name: 'Login to request this edubadge' });
  private readonly requestButton = this.page.getByRole('link', { name: 'Request', exact: true });
  private readonly confirmButton = this.page.getByRole('link', { name: 'Confirm' });

  async SearchForClass(name: string) {
    await this.searchField.fill(name);
  }

  async filterOn(filterText: string = 'university-example.org') {
    await this.page.getByText(filterText).click();
  }

  async openEduClass(name: string) {
    await this.page.getByText(name).first().click();
    await expect(this.page.getByRole('heading', { name: 'The programme' })).toBeVisible();
  }

  async RequestEdubadge() {
    if (await this.loginButton.isVisible()) {
      await this.loginButton.click();
      await this.Login();
    }

    await this.requestButton.click();

    if (await this.termsAndConditions.isVisible()) {
      await this.termsAndConditions.click();
    }

    if (await this.confirmButton.isVisible()) {
      await this.confirmButton.click();
    }

    await this.page.getByText('Successfully requested').waitFor();
  }

  public async Login(
    email: string = this.testdata.accounts.studentEmail,
    password: string = this.testdata.accounts.studentPassword
  ) {
    await this.searchField.or(this.usernameField).waitFor();

    if (await this.searchField.isVisible()) {
      await this.searchField.fill('test idp');
      await this.eduIdButton.click();
      await this.usernameField.waitFor();
    }

    await this.usernameField.fill(email);
    await this.nextButton.click();
    await this.passwordField.fill(password);
    await this.nextButton.click();
    
    await this.termsAndConditions.or(this.loggedInMenu).waitFor();
    if (await this.termsAndConditions.isVisible()) {
      await this.termsAndConditions.click();
    }

    await this.loggedInMenu.waitFor();
  }
}
