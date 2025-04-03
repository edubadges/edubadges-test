import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { StaffBadgeClassesPage } from './staffBadgeClassesPage';
import { StaffInsightsPage } from './staffInsightsPage';
import { StaffManagePage } from './staffManagePage';
import { StaffUsersPage } from './staffUsersPage';

export class StaffMainPage extends BasePage {
  // Login locators
  private readonly searchField = this.page.getByPlaceholder('Search...');
  private readonly usernameField = this.page.getByLabel('Username');
  private readonly passwordField = this.page.getByLabel('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly dutchLink = this.page.getByRole('link', { name: 'NL' });
  private readonly expandMenu = this.page.locator('.expand-menu');

  // Navigation locators
  private readonly badgeClassesLink = this.page.getByRole('link', { name: 'Badge classes', exact: true });
  private readonly manageLink = this.page.getByRole('link', { name: 'Manage', exact: true });
  private readonly usersLink = this.page.getByRole('link', { name: 'Users', exact: true });
  private readonly catalogLink = this.page.getByRole('link', { name: 'Catalog', exact: true });
  private readonly insightsLink = this.page.getByRole('link', { name: 'Insights', exact: true });

  // Page instances
  readonly badgeClassPage = new StaffBadgeClassesPage(this.page, this.testdata);
  readonly managePage = new StaffManagePage(this.page, this.testdata);
  readonly usersPage = new StaffUsersPage(this.page, this.testdata);
  readonly insightsPage = new StaffInsightsPage(this.page, this.testdata);

  private idpButtonLocator(idpName: string): Locator {
    const idpButtons = this.page.locator('.idp__content').locator('..');
    return idpButtons.getByText(idpName).locator('../../..');
  }

  async switchToDutch() {
    await this.dutchLink.click();
  }

  // Login validation
  async validateLoginSuccessful() {
    await expect(this.badgeClassesLink).toBeVisible();
  }

  async validateLoginFailed() {
    await expect(this.page.getByRole('heading', { name: "Sorry, you don't have access" })).toBeVisible();
  }

  // Login methods
  async loginWithWoInstitutionAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.institutionAdminUsername,
      this.testdata.accounts.institutionAdminPassword,
    );
  }

  async loginWithWoIssuerGroupAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.issuerGroupAdminUsername,
      this.testdata.accounts.issuerGroupAdminPassword,
    );
  }

  async loginWithWoIssuerAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.issuerAdminUsername,
      this.testdata.accounts.issuerAdminPassword,
    );
  }

  async loginWithWoBadgeClassAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.badgeClassAdminUsername,
      this.testdata.accounts.badgeClassAdminPassword,
    );
  }

  async loginWithStudent() {
    await this.loginTestIdp(
      this.testdata.accounts.studentName,
      this.testdata.accounts.studentPassword,
    ); 
  }

  async loginWithMBOInstitutionAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.mboInstitutionAdminUsername,
      this.testdata.accounts.mboInstitutionAdminPassword,
    );
  }

  async loginWithHBOInstitutionAdmin() {
    await this.loginTestIdp(
      this.testdata.accounts.hboInstitutionAdminUsername,
      this.testdata.accounts.hboInstitutionAdminPassword,
    );
  }

  async loginTestIdp(username: string, password: string) {
    const testIdpName = 'test idp';
    await this.searchField.fill(testIdpName);
    await this.idpButtonLocator(testIdpName).locator('img').waitFor();
    await this.page.waitForTimeout(100);
    await this.idpButtonLocator(testIdpName).click();

    await this.usernameField.waitFor();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();

    const proceedToEdubadgesFound = await this.page
      .getByRole('button', { name: 'Proceed to Edubadges [' })
      .isVisible();
    if (proceedToEdubadgesFound) {
      await this.page
        .getByRole('button', { name: 'Proceed to Edubadges [' })
        .click();
    }

    await this.expandMenu.waitFor();
  }

  async loginDummyIdp(username: string, email: string, orgName: string = 'university-example.org') {
    const dummyName = 'SURFconext Dummy IdP';
    const dummyLocator = this.page.getByText(dummyName + ' (previously SURFconext Mujina IdP)').first();

    await this.searchField.fill(dummyName);
    await dummyLocator.waitFor();
    await dummyLocator.click();

    await this.page.getByText('Mujina Identity Provider').waitFor();
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.selectOption('select#authn-context-class-ref', 'https://eduid.nl/trust/linked-institution');

    const attributeAddLocator = this.page.locator('select#add-attribute');
    const mailTitle = 'urn:mace:dir:attribute-def:mail';
    const orgTitle = 'urn:mace:terena.org:attribute-def:schacHomeOrganization';

    await attributeAddLocator.selectOption(mailTitle);
    await this.page.getByText(mailTitle).locator('..').getByRole('textbox').fill(email);

    await attributeAddLocator.selectOption(orgTitle);
    await this.page.getByText(orgTitle).locator('..').getByRole('textbox').fill(orgName);

    await this.page.getByText('Log in').click();

    const consentButtonLocator = this.page.getByRole('button', { name: 'Proceed to Edubadges' });
    await consentButtonLocator.or(this.expandMenu).waitFor();

    if (await consentButtonLocator.isVisible()) {
      await consentButtonLocator.click();
      await this.expandMenu.waitFor();
    }
  }

  // Navigation methods
  async goToBadgeClasses() {
    await this.badgeClassesLink.click();
    await this.waitForLoadingToStop();
  }

  async goToManage() {
    await this.manageLink.click();
    await this.waitForLoadingToStop();
  }

  async goToUsers() {
    await this.usersLink.click();
    await this.waitForLoadingToStop();
  }

  async goToCatalog() {
    await this.catalogLink.click();
    await this.waitForLoadingToStop();
  }

  async goToInsights() {
    await this.insightsLink.click();
    await this.waitForLoadingToStop();
  }
}
