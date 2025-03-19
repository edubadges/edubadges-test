import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { staffBadgeClassesPage } from './staffBadgeClassesPage';
import { staffInsightsPage } from './staffInsightsPage';
import { staffManagePage } from './staffManagePage';
import { staffUsersPage } from './staffUsersPage';

export class StaffMainPage extends BasePage {
  private searchFieldLocator: Locator = this.page.getByPlaceholder('Search...');
  private surfConextLocator: Locator = this.page.getByRole('heading', {
    name: 'Login with SURFconext Test IdP',
  });
  private usernameLocator: Locator = this.page.getByLabel('Username');
  private passwordLocator: Locator = this.page.getByLabel('Password');
  private loginButtonLocator: Locator = this.page.getByRole('button', {
    name: 'Login',
  });

  switchToDutch() {
    this.page.getByRole('link', { name: 'NL' }).click();
  }
  
  //#region sub pages
  badgeClassPage: staffBadgeClassesPage = new staffBadgeClassesPage(this.page, this.testdata);
  managePage: staffManagePage = new staffManagePage(this.page, this.testdata);
  usersPage: staffUsersPage = new staffUsersPage(this.page, this.testdata);
  insightsPage: staffInsightsPage = new staffInsightsPage(this.page, this.testdata);
  //#endregion

  //#region login

  async validateLoginSuccesfull() {
    await expect(
      this.page.getByRole('link', { name: 'Badge classes' }),
    ).toBeVisible();
  }

  async validateLoginFailed() {
    this.page
      .getByRole('heading', { name: "Sorry, you don't have access" })
      .isVisible();
  }

  async loginWithWoInstitutionAdmin() {
    await this.login(
      this.testdata.accounts.institutionAdminUsername,
      this.testdata.accounts.institutionAdminPassword,
    );
  }

  async loginWithWoIssuerGroupAdmin() {
    await this.login(
      this.testdata.accounts.issuerGroupAdminUsername,
      this.testdata.accounts.issuerGroupAdminPassword,
    );
  }

  async loginWithWoIssuerAdmin() {
    await this.login(
      this.testdata.accounts.issuerAdminUsername,
      this.testdata.accounts.issuerAdminPassword,
    );
  }

  async loginWithWoBadgeClassAdmin() {
    await this.login(
      this.testdata.accounts.badgeClassAdminUsername,
      this.testdata.accounts.badgeClassAdminPassword,
    );
  }

  async loginWithStudent() {
    await this.login(
      this.testdata.accounts.studentName,
      this.testdata.accounts.studentPassword,
    );
  }

  async loginWithMBOInstitutionAdmin() {
    await this.login(
      this.testdata.accounts.mboInstitutionAdminUsername,
      this.testdata.accounts.mboInstitutionAdminPassword,
    );
  }

  async loginWithHBOInstitutionAdmin() {
    await this.login(
      this.testdata.accounts.hboInstitutionAdminUsername,
      this.testdata.accounts.hboInstitutionAdminPassword,
    );
  }

  async login(username: string, password: string) {
    await this.searchFieldLocator.fill('test idp');
    await this.page.waitForTimeout(1000);
    await expect(this.surfConextLocator).toBeVisible();
    await this.page.waitForTimeout(1000);
    await this.surfConextLocator.click();
    await this.page.waitForTimeout(1000);

    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.page.waitForTimeout(1000);
    await this.loginButtonLocator.click();

    await this.page.waitForTimeout(500);
    const proceedToEdubadgesFound = await this.page
      .getByRole('button', { name: 'Proceed to Edubadges [' })
      .isVisible();
    if (proceedToEdubadgesFound) {
      await this.page
        .getByRole('button', { name: 'Proceed to Edubadges [' })
        .click();
    }
    await this.page.waitForTimeout(500);
  }

  //#endregion

}
