import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { CopyPastePage } from './copyPastePage';

export class BackpackPage extends BasePage {
  public async Login(email: string = this.testdata.accounts.studentEmail,
    password: string = this.testdata.accounts.studentPassword,
  ) {
    const searchFieldLocator = this.page.getByPlaceholder('Search...');
    const usernameFieldLocator = this.page.getByPlaceholder('e.g. user@gmail.com');
    const passwordFielLocator = this.page.getByPlaceholder('Password');
    const eduIdButtonLocator = this.page.getByRole('heading', { name: 'Login with eduID (NL) test' });
    const nextButton = this.page.locator('[href*="/next"]');
    const termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
    const loggedInMenu = this.page.locator('.expand-menu');

    await searchFieldLocator.or(usernameFieldLocator).waitFor();

    if ((await searchFieldLocator.isVisible())) {
      await searchFieldLocator.fill('test idp');
      await eduIdButtonLocator.waitFor();
      await eduIdButtonLocator.click();
      await usernameFieldLocator.waitFor();
    }

    await usernameFieldLocator.fill(email);
    await nextButton.click();

    await passwordFielLocator.waitFor();
    await passwordFielLocator.fill(password);
    await nextButton.click();
    
    await termsAndConditions.or(loggedInMenu).waitFor();
    if (await termsAndConditions.isVisible()) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }

    await loggedInMenu.waitFor();
  }

  //#region open categories
  async OpenBackpack() {
    await this.page.getByRole('link', { name: 'My backpack' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenBadgeRequests() {
    await this.page.getByRole('link', { name : 'Edubadge requests' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenCollections() {
    await this.page.getByRole('link', { name : 'Collections' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenImported()
  {
    await this.page.getByRole('link', { name : 'Imported' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenArchive()
  {
    await this.page.getByRole('link', { name : 'Archive' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenAccount(){
    await this.page.getByRole('link', { name : 'Account' }).click();
    await this.waitForLoadingToStop();
  }

  async OpenBadge(badgeName: string){
    await this.page
    .locator('.card.badge')
    .getByText(badgeName)
    .first()
    .click();
    await this.waitForLoadingToStop();
  }

  //#endregion

  async AcceptBadge(badgeName: string) {
    await this.page.getByText(badgeName).click();
    await this.page
      .getByRole('link', { name: 'Claim & Add to your backpack' })
      .click();

    await this.waitForLoadingToStop();
    
    if ((await this.page.getByRole('link', { name: 'I agree' }).isVisible())) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
    await this.page.getByRole('link', { name: 'Confirm' }).click();
    await this.waitForLoadingToStop();
  }


//#region Share badge

  async MakeEdubadgePublic(courseName : string){
    const eduBadgeCard = this.page
        .locator('.card.badge')
        .getByText(courseName)
        .first();

    // open badge
    await this.page.goto('');
    await eduBadgeCard.waitFor();
    await eduBadgeCard.click();  
    await eduBadgeCard.waitFor();
    await this.page.waitForTimeout(500);
    // if the badge is loaded the first time the buttons need time to load correctly

    // make public
    await this.page.locator('.slider').click({ force: true });
    await this.page.getByText('Confirm').click();

    // assert success
    await expect(
      this.page.getByText('This edubadge has been made publicly visible. You can share this edubadge now')
    ).toBeVisible();
  }

  async getShareLink(): Promise<string>{
    let copyPastePage = new CopyPastePage(this.page, this.testdata);
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
