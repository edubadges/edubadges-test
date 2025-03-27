import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { StaffBadgeClassesPage } from './staffBadgeClassesPage';
import { staffInsightsPage } from './staffInsightsPage';
import { StaffManagePage } from './staffManagePage';
import { StaffUsersPage } from './staffUsersPage';

export class StaffMainPage extends BasePage {
  private searchFieldLocator: Locator = this.page.getByPlaceholder('Search...');
  private usernameLocator: Locator = this.page.getByLabel('Username');
  private passwordLocator: Locator = this.page.getByLabel('Password');
  private loginButtonLocator: Locator = this.page.getByRole('button', {
    name: 'Login',
  });
  private idpButtonLocator(idpName: string): Locator{
    let idpButtons = this.page.locator('.idp__content').locator('..');
    return idpButtons.getByText(idpName).locator('../../..')
  } 

  switchToDutch() {
    this.page.getByRole('link', { name: 'NL' }).click();
  }
  
  badgeClassPage: StaffBadgeClassesPage = new StaffBadgeClassesPage(this.page, this.testdata);
  managePage: StaffManagePage = new StaffManagePage(this.page, this.testdata);
  usersPage: StaffUsersPage = new StaffUsersPage(this.page, this.testdata);
  insightsPage: staffInsightsPage = new staffInsightsPage(this.page, this.testdata);

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
    const testIdpName = "test idp";
    await this.searchFieldLocator.fill(testIdpName);
    await this.idpButtonLocator(testIdpName).locator('img').waitFor();
    await this.page.waitForTimeout(100);
    await this.idpButtonLocator(testIdpName).click();

    await this.usernameLocator.waitFor();
    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.loginButtonLocator.click();

    const proceedToEdubadgesFound = await this.page
      .getByRole('button', { name: 'Proceed to Edubadges [' })
      .isVisible();
    if (proceedToEdubadgesFound) {
      await this.page
        .getByRole('button', { name: 'Proceed to Edubadges [' })
        .click();
    }

    await this.page.locator('.expand-menu').waitFor();
  }

  async loginDummyIdp(username: string, email: string, orgName: string = "university-example.org"){
    const dummyName = "SURFconext Dummy IdP";
    const dummyLocator = this.page.getByText(dummyName + ' (previously SURFconext Mujina IdP)').first();

    await this.searchFieldLocator.fill(dummyName);
    await dummyLocator.waitFor();
    await dummyLocator.click();

    await this.page.getByText('Mujina Identity Provider').waitFor();
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.selectOption('select#authn-context-class-ref', 'https://eduid.nl/trust/linked-institution');

    const attributeAddlocator = this.page.locator('select#add-attribute');
    const mailTitle = "urn:mace:dir:attribute-def:mail";
    const orgTitle = "urn:mace:terena.org:attribute-def:schacHomeOrganization";

    await attributeAddlocator.selectOption(mailTitle);
    await this.page.getByText(mailTitle).locator('..').getByRole('textbox').fill(email)

    await attributeAddlocator.selectOption(orgTitle);
    await this.page.getByText(orgTitle).locator('..').getByRole('textbox').fill(orgName)

    await this.page.getByText('Log in').click();

    const consentButtonLocator = this.page.getByRole('button', { name: 'Proceed to Edubadges' });
    const loggedInMenuLocator = this.page.locator('.expand-menu');
    
    await consentButtonLocator.or(loggedInMenuLocator).waitFor();

    if(await consentButtonLocator.isVisible()){
      await consentButtonLocator.click();
      await loggedInMenuLocator.waitFor();
    }
  }

  //#endregion

  //#region Go to categories
  async goToBadgeClasses (){
    await this.page.getByRole('link', { name: 'Badge classes', exact: true  }).click();
    await this.waitForLoadingToStop();
  }

  async goToManage (){
    await this.page.getByRole('link', { name: 'Manage', exact: true }).click();
    await this.waitForLoadingToStop();
  }

  async goToUsers (){
    await this.page.getByRole('link', { name: 'Users', exact: true  }).click();
    await this.waitForLoadingToStop();
  }

  async goToCatalog (){
    await this.page.getByRole('link', { name: 'Catalog', exact: true  }).click();
    await this.waitForLoadingToStop();
  }

  async goToInsights (){
    await this.page.getByRole('link', { name: 'Insights', exact: true  }).click();
    await this.waitForLoadingToStop();
  }
  //#endregion
}
