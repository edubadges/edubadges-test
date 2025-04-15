import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { StaffBadgeClassesPage } from './staffBadgeClassesPage';
import { StaffInsightsPage } from './staffInsightsPage';
import { StaffManagePage } from './staffManagePage';
import { StaffUsersPage } from './staffUsersPage';
import { AccountsBase, staffDetails } from '../../util/accountBase';
import { institution, adminLevel } from '../../util/loginPossibilities';

export class StaffMainPage extends BasePage {
  // Login locators
  private readonly searchField = this.page.getByPlaceholder('Search...');
  private readonly usernameField = this.page.getByLabel('Username');
  private readonly passwordField = this.page.getByLabel('Password');
  private readonly loginButton = this.page.getByRole('button', {
    name: 'Login',
  });
  private readonly dutchLink = this.page.getByRole('link', { name: 'NL' });
  private readonly expandMenu = this.page.locator('.expand-menu');

  // Navigation locators
  private readonly badgeClassesLink = this.page.getByRole('link', {
    name: 'Badge classes',
    exact: true,
  });
  private readonly manageLink = this.page.getByRole('link', {
    name: 'Manage',
    exact: true,
  });
  private readonly usersLink = this.page.getByRole('link', {
    name: 'Users',
    exact: true,
  });
  private readonly catalogLink = this.page.getByRole('link', {
    name: 'Catalog',
    exact: true,
  });
  private readonly insightsLink = this.page.getByRole('link', {
    name: 'Insights',
    exact: true,
  });

  // Page instances
  readonly badgeClassPage = new StaffBadgeClassesPage(this.page, this.testdata);
  readonly managePage = new StaffManagePage(this.page, this.testdata);
  readonly usersPage = new StaffUsersPage(this.page, this.testdata);
  readonly insightsPage = new StaffInsightsPage(this.page, this.testdata);

  private async idpButtonLocator(idpName: string): Promise<Locator> {
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
    await expect(
      this.page.getByRole('heading', { name: "Sorry, you don't have access" }),
    ).toBeVisible();
  }

  // Login methods

  async loginTestIdp(institution: institution, level: adminLevel) {
    const idp = 'test idp';
    await this.searchField.fill(idp);
    const idpButton = await this.idpButtonLocator(idp);
    await this.page.waitForTimeout(500);
    await idpButton.click();
    await this.usernameField.waitFor();

    let instititutionAccounts: AccountsBase;

    switch (institution) {
      case 'WO':
        instititutionAccounts = this.testdata.WOAccounts;
        break;
      case 'HBO':
        instititutionAccounts = this.testdata.HBOAccounts;
        break;
      case 'MBO':
        instititutionAccounts = this.testdata.MBOAccounts;
        break;
    }

    let account: staffDetails;
    switch (level) {
      case 'Institution':
        account = instititutionAccounts.institutionAdminLogin;
        break;
      case 'Issuergroup':
        account = instititutionAccounts.issuerGroupAdmin;
        break;
      case 'Issuer':
        account = instititutionAccounts.issuerAdmin;
        break;
      case 'Badgeclass':
        account = instititutionAccounts.badgeClassAdminLogin;
        break;
    }

    await this.usernameField.fill(account.username);
    await this.passwordField.fill(account.password);
    await this.loginButton.click();

    const proceedButton = this.page.getByRole('button', {
      name: 'Proceed to Edubadges [',
    });

    await proceedButton.or(this.expandMenu).waitFor();
    if (await proceedButton.isVisible()) {
      await proceedButton.click();
    }

    await this.expandMenu.waitFor();
    await this.waitForLoadingToStop();
  }

  async loginDummyIdp(username: string, email: string, orgName: string) {
    const dummyName = 'SURFconext Dummy IdP';
    const dummyLocator = this.page
      .getByText(dummyName + ' (previously SURFconext Mujina IdP)')
      .first();

    await this.searchField.fill(dummyName);
    await dummyLocator.waitFor();
    await dummyLocator.click();

    await this.page.getByText('Mujina Identity Provider').waitFor();
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.selectOption(
      'select#authn-context-class-ref',
      'https://eduid.nl/trust/linked-institution',
    );

    const attributeAddLocator = this.page.locator('select#add-attribute');
    const mailTitle = 'urn:mace:dir:attribute-def:mail';
    const orgTitle = 'urn:mace:terena.org:attribute-def:schacHomeOrganization';

    await attributeAddLocator.selectOption(mailTitle);
    await this.page
      .getByText(mailTitle)
      .locator('..')
      .getByRole('textbox')
      .fill(email);

    await attributeAddLocator.selectOption(orgTitle);
    await this.page
      .getByText(orgTitle)
      .locator('..')
      .getByRole('textbox')
      .fill(orgName);

    await this.page.getByText('Log in').click();

    const consentButtonLocator = this.page.getByRole('button', {
      name: 'Proceed to Edubadges',
    });
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
