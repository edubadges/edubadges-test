import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';

export class IssuerPortalPage extends BasePage {
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

  async validateLoginSuccesfull() {
    await expect(
      this.page.getByRole('link', { name: 'Badge classes' }),
    ).toBeVisible();
  }

  async goToManage() {
    await this.page.getByRole('link', { name: 'Manage' }).click();
    await expect(
      this.page.getByRole('link', { name: 'Edit educational institution' }),
    ).toBeVisible();
  }

  async validateLoginFailed() {
    this.page
      .getByRole('heading', { name: "Sorry, you don't have access" })
      .isVisible();
  }

  async SearchForClass(name: string) {
    await this.page.getByPlaceholder('Search...').fill(name);
  }

  async openBadgeClassWithNameFromMainPage(name: string) {
    await this.page.getByText(name).click();
  }

  async rewardBadgeToStudent() {
    await this.page.getByRole('link', { name: 'Open requests ' }).click();
    await this.page
      .getByRole('row', { name: 'Petra Penttilä' })
      .locator('label span')
      .click();
    await this.page.getByRole('link', { name: 'Award', exact: true }).click();
    await expect(this.page.getByText('Are you sure you want to')).toBeVisible();
    await this.page
      .getByText('Cancel Award')
      .getByRole('link', { name: 'Award', exact: true })
      .click();
    await this.page.waitForTimeout(5000);
  }

  async loginWithInstitutionAdmin() {
    await this.login(
      this.testdata.accounts.institutionAdminUsername,
      this.testdata.accounts.institutionAdminPassword,
    );
  }

  async loginWithIssuerGroupAdmin() {
    await this.login(
      this.testdata.accounts.issuerGroupAdminUsername,
      this.testdata.accounts.issuerGroupAdminPassword,
    );
  }

  async loginWithIssuerAdmin() {
    await this.login(
      this.testdata.accounts.issuerAdminUsername,
      this.testdata.accounts.issuerAdminPassword,
    );
  }

  async loginWithBadgeClassAdmin() {
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

  private async login(username: string, password: string) {
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

    await this.page.waitForTimeout(5000);
    const proceedToEdubadgesFound = await this.page
      .getByRole('button', { name: 'Proceed to Edubadges [' })
      .count();
    if (proceedToEdubadgesFound > 0) {
      await this.page
        .getByRole('button', { name: 'Proceed to Edubadges [' })
        .click();
    }
    await this.page.waitForTimeout(5000);
  }

  async awardBadgeToStudent(studentEmail: string, studentNumber: string) {
    await this.page.getByRole('link', { name: 'Award edubadge(s)' }).click();
    await this.page.getByRole('textbox').first().fill(studentEmail);
    await this.page.getByRole('textbox').nth(1).fill(studentNumber);
    await this.page.getByRole('link', { name: 'Award' }).click();
  }
}
