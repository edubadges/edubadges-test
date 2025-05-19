import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { CopyPastePage } from './copyPastePage';
import { institution } from '../util/loginPossibilities';

export class BackpackPage extends BasePage {
  // Navigation locators
  private readonly backpackLink = this.page.getByRole('link', {
    name: 'My backpack',
  });
  private readonly requestsLink = this.page.getByRole('link', {
    name: 'Edubadge requests',
  });
  private readonly collectionsLink = this.page.getByRole('link', {
    name: 'Collections',
  });
  private readonly importedLink = this.page.getByRole('link', {
    name: 'Imported',
  });
  private readonly archiveLink = this.page.getByRole('link', {
    name: 'Archive',
  });
  private readonly accountLink = this.page.getByRole('link', {
    name: 'Account',
  });
  private readonly claimLink = this.page.getByRole('link', {
    name: 'Claim & Add to your backpack',
  });
  private readonly reacceptLink = this.page.getByRole('link', {
    name: 'Accept this edubadge',
  });
  private readonly rejectLink = this.page.getByRole('link', { name: 'Reject' });

  private readonly usernameField = this.page.getByPlaceholder(
    'e.g. user@gmail.com',
  );
  private readonly passwordField = this.page.getByPlaceholder('Password');
  private readonly nextButton = this.page.locator('[href*="/next"]');
  private readonly loggedInMenu = this.page.locator('.expand-menu');

  // misc
  private readonly confirmButton = this.page.getByRole('link', {
    name: 'Confirm',
  });

  public async login(
    institution: institution = 'WO',
    accountNr: number = this.testdata.retryCount,
  ) {
    const account = await this.getStudentAccount(institution, accountNr);

    await this.usernameField.fill(account.email);
    await this.nextButton.click();

    await this.passwordField.waitFor();
    await this.passwordField.fill(account.password);
    await this.nextButton.click();

    await this.handleTermsAndConditions(this.loggedInMenu);
  }

  public async getBadgeLocator(badgeName: string): Promise<Locator> {
    return this.page
      .locator('.card.badge')
      .getByText(badgeName)
      .first()
      .locator('../../..');
  }

  public async claimReceivedBadge(badgeName: string) {
    const badgeLocator = this.page
      .locator('.name')
      .getByText(badgeName)
      .locator('../../..');

    await badgeLocator
      .getByText('View details to claim this edubadge')
      .waitFor();
    await badgeLocator.click();

    await this.claimLink.click();
    await this.handleTermsAndConditions(this.confirmButton);

    await this.confirmButton.click();
    await this.waitForLoadingToStop();
  }

  public async rejectReceivedBadge(badgeName: string) {
    const badgeLocator = await this.getBadgeLocator(badgeName);

    await this.page.goto('');
    await badgeLocator.click();

    await this.rejectLink.click();
    await this.confirmButton.click();
    await this.waitForLoadingToStop();

    await this.page
      .getByText(
        'This edubadge has been removed. You can no longer download or share this edubadge',
      )
      .or(this.page.getByText('Edubadge is rejected'))
      .waitFor();
  }

  public async reacceptRejectedBadge(badgeName: string) {
    const badgeLocator = await this.getBadgeLocator(badgeName);
    await badgeLocator.getByText('Rejected').waitFor();
    await badgeLocator.click();
    await this.confirmButton.click();

    await this.page
      .getByText(
        'This edubadge has been accepted. You can share this edubadge now',
      )
      .waitFor();
  }

  //#region navigation
  async openBackpack() {
    await this.backpackLink.click();
    await this.waitForLoadingToStop();
  }

  async openBadgeRequests() {
    await this.requestsLink.click();
    await this.waitForLoadingToStop();
  }

  async openCollections() {
    await this.collectionsLink.click();
    await this.waitForLoadingToStop();
  }

  async openImported() {
    await this.importedLink.click();
    await this.waitForLoadingToStop();
  }

  async openArchive() {
    await this.archiveLink.click();
    await this.waitForLoadingToStop();
  }

  async openAccount() {
    await this.accountLink.click();
    await this.waitForLoadingToStop();
  }

  async openBadge(badgeName: string) {
    await this.page.locator('.card.badge').getByText(badgeName).first().click();
    await this.waitForLoadingToStop();
  }

  async clickBadgeBreadcrumb() {
    await this.page
      .locator('div.student-bread-crumb')
      .getByText('Your edubadges')
      .click();
    await this.waitForLoadingToStop();
  }
  //#endregion

  //#region share
  async makeEdubadgePublic(badgeName: string) {
    // navigate
    await this.page.goto('');
    await this.waitForLoadingToStop();
    await this.openBadge(badgeName);
    await this.waitForLoadingToStop();
    await this.page.waitForTimeout(250); // reduce flakyness

    // make public
    await this.page.locator('.slider').click({ force: true });
    await this.page.getByText('Confirm').click();
    await this.waitForLoadingToStop();

    // validate
    await this.page
      .getByText(
        'This edubadge has been made publicly visible. You can share this edubadge now',
      )
      .waitFor();
  }

  async getShareLink(): Promise<string> {
    const copyPastePage = new CopyPastePage(this.page, this.testdata);
    await this.page.getByRole('link', { name: 'Share' }).click();
    await this.page.getByRole('link', { name: 'Copy the link' }).click();

    return copyPastePage.retrieveValueFromClipboard();
  }

  async validateBadge(url: string) {
    await this.page.goto(url);
    await this.page.getByRole('link', { name: 'Verify' }).click();
    // If this test fails, it is because the verify functionality is not running correctly
    await expect
      .poll(async () => this.page.locator('.check').count())
      .toBeGreaterThanOrEqual(9);
  }
  //#endregion
}
