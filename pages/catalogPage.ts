import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { institution } from '../util/loginPossibilities';
import { AccountsBase } from '../util/accountBase';

export class CatalogPage extends BasePage {
  // Search and filter locators
  private readonly searchField = this.page.getByPlaceholder('Search...');
  private readonly filterText = this.page.getByText('university-example.org');

  // Login locators
  private readonly usernameField = this.page.getByPlaceholder('e.g. user@gmail.com');
  private readonly eduIdButton = this.page.getByRole('heading', { name: 'Login with eduID (NL) test' });
  private readonly nextButton = this.page.locator('[href*="/next"]');
  private readonly passwordField = this.page.getByPlaceholder('Password');
  private readonly loggedInMenu = this.page.locator('.expand-menu');

  // Request badge locators
  private readonly loginButton = this.page.getByRole('link', { name: 'Login to request this edubadge' });
  private readonly requestButton = this.page.getByRole('link', { name: 'Request', exact: true });
  private readonly confirmButton = this.page.getByRole('link', { name: 'Confirm' });

  async searchForClass(name: string) {
    await this.searchField.fill(name);
  }

  async filterOn(institution: institution = 'WO') {
    let institutionName: string;
    switch(institution){
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

  async openEduClass(name: string) {
    await this.page.getByText(name).first().click();
    await expect(this.page.getByRole('heading', { name: 'The programme' })).toBeVisible();
  }

  async requestEdubadge(
    institution: institution = 'WO', 
    accountNr: number = 0,
  ){
    if (await this.loginButton.isVisible()) {
      await this.loginButton.click();
      await this.loginStudentIdp(institution, accountNr);
    }

    await this.requestButton.click();
    await this.waitForLoadingToStop();

    this.handleTermsAndConditions(this.confirmButton);

    await this.confirmButton.click({ force: true });

    await this.page.getByText('Successfully requested').waitFor();
  }

  public async loginStudentIdp(
    institution: institution, 
    accountNr: number = 0,
  ) {
    await this.searchField.or(this.usernameField).waitFor();

    if (await this.searchField.isVisible()) {
      await this.searchField.fill('test idp');
      await this.eduIdButton.click();
      await this.usernameField.waitFor();
    }

    let instititutionAccounts: AccountsBase;

    switch (institution){
      case 'WO':
        instititutionAccounts = this.testdata.WOAccounts;
        break;
      case 'HBO':
        instititutionAccounts = this.testdata.HBOAccounts;
        break;
      case 'MBO':
        instititutionAccounts = this.testdata.MBOAccounts;
        break;
    };
    const account = instititutionAccounts.student[accountNr];

    await this.usernameField.fill(account.email);
    await this.nextButton.click();

    await this.passwordField.waitFor();
    await this.passwordField.fill(account.password);
    await this.nextButton.click();

    this.handleTermsAndConditions(this.loggedInMenu);
  }
}
