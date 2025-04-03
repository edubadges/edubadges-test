import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { CopyPastePage } from './copyPastePage';

export class BackpackPage extends BasePage {
  // Navigation locators
  private readonly backpackLink = this.page.getByRole('link', { name: 'My backpack' });
  private readonly requestsLink = this.page.getByRole('link', { name: 'Edubadge requests' });
  private readonly collectionsLink = this.page.getByRole('link', { name: 'Collections' });
  private readonly importedLink = this.page.getByRole('link', { name: 'Imported' });
  private readonly archiveLink = this.page.getByRole('link', { name: 'Archive' });
  private readonly accountLink = this.page.getByRole('link', { name: 'Account' });

  // Login locators
  private readonly searchField = this.page.getByPlaceholder('Search...');
  private readonly usernameField = this.page.getByPlaceholder('e.g. user@gmail.com');
  private readonly passwordField = this.page.getByPlaceholder('Password');
  private readonly eduIdButton = this.page.getByRole('heading', { name: 'Login with eduID (NL) test' });
  private readonly nextButton = this.page.locator('[href*="/next"]');
  private readonly termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
  private readonly loggedInMenu = this.page.locator('.expand-menu');

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

  //#region open categories
  async OpenBackpack() {
    await this.backpackLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenBadgeRequests() {
    await this.requestsLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenCollections() {
    await this.collectionsLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenImported() {
    await this.importedLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenArchive() {
    await this.archiveLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenAccount() {
    await this.accountLink.click();
    await this.waitForLoadingToStop();
  }

  async OpenBadge(badgeName: string) {
    await this.page.locator('.card.badge').getByText(badgeName).first().click();
    await this.waitForLoadingToStop();
  }
  //#endregion

  async AcceptBadge(badgeName: string) {
    await this.page.getByText(badgeName).click();
    await this.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await this.waitForLoadingToStop();
    
    if (await this.page.getByRole('link', { name: 'I agree' }).isVisible()) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
    await this.page.getByRole('link', { name: 'Confirm' }).click();
    await this.waitForLoadingToStop();
  }

  //#region Share badge
  async MakeEdubadgePublic(courseName: string) {
    const eduBadgeCard = this.page.locator('.card.badge').getByText(courseName).first();

    await this.page.goto('');
    await eduBadgeCard.waitFor();
    await eduBadgeCard.click();  
    await this.page.waitForTimeout(500);
    // if the badge is loaded the first time the buttons need time to load correctly

    // make public
    await this.page.locator('.slider').click({ force: true });
    await this.page.getByText('Confirm').click();

    // validate
    await expect(
      this.page.getByText('This edubadge has been made publicly visible. You can share this edubadge now')
    ).toBeVisible();
  }

  async getShareLink(): Promise<string> {
    const copyPastePage = new CopyPastePage(this.page, this.testdata);
    await this.page.getByRole('link', { name: 'Share' }).click();
    await this.page.getByRole('link', { name: 'Copy the link' }).click();
    
    return copyPastePage.retreiveValueFromClipboard();
  }

  async ValidateBadge(url: string) {
    await this.page.goto(url);
    await this.page.getByRole('link', { name: 'Verify' }).click();
    // If this test fails, it is because the verify functionality is not running correctly
    await expect.poll(async() => this.page.locator('.check').count()).toBeGreaterThanOrEqual(9);
  }
  //#endregion
}
