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
  }

  async loginWithInstitutionAdmin() {
    await this.login(
      this.testdata.institutionAdminUsername,
      this.testdata.institutionAdminPassword,
    );
  }

  async loginWithIssuerGroupAdmin() {
    await this.login(
      this.testdata.issuerGroupAdminUsername,
      this.testdata.issuerGroupAdminPassword,
    );
  }

  async loginWithIssuerAdmin() {
    await this.login(
      this.testdata.issuerAdminUsername,
      this.testdata.issuerAdminPassword,
    );
  }

  async loginWithBadgeClassAdmin() {
    await this.login(
      this.testdata.badgeClassAdminUsername,
      this.testdata.badgeClassAdminPassword,
    );
  }

  async loginWithStudent() {
    await this.login(this.testdata.studentName, this.testdata.studentPassword);
  }

  private async login(username: string, password: string) {
    await this.searchFieldLocator.fill('test idp');
    await expect(this.surfConextLocator).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.surfConextLocator.click();
    await this.page.waitForTimeout(2000);

    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.page.waitForTimeout(500);
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
}
