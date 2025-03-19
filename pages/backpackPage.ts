import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';
import { CopyPastePage } from './copyPastePage';

export class BackpackPage extends BasePage {
  
  // if multiple accounts this should have parameters
  public async Login() {
    await expect(
      this.page
        .getByPlaceholder('Search...')
        .or(this.page.getByPlaceholder('e.g. user@gmail.com')),
    ).toBeVisible();

    if ((await this.page.getByPlaceholder('Search...').isVisible())) {
      await this.page.getByPlaceholder('Search...').fill('test idp');
      await expect(
        this.page.getByRole('heading', { name: 'Login with eduID (NL) test' }),
      ).toBeVisible();
      await this.page
        .getByRole('heading', { name: 'Login with eduID (NL) test' })
        .click();
      await this.page.waitForTimeout(2000);
    }

    await this.page
      .getByPlaceholder('e.g. user@gmail.com')
      .fill(this.testdata.accounts.studentEmail);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Next' }).click();

    await this.page
      .getByPlaceholder('Password')
      .fill(this.testdata.accounts.studentPassword);
    await this.page.getByRole('link', { name: 'Login', exact: true }).click();
    await this.page.waitForTimeout(2000);
    const termsAndConditionsPageShown = await this.page
      .getByRole('link', { name: 'I agree' })
      .isVisible();
    if (termsAndConditionsPageShown) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
    await this.page.waitForTimeout(2000);

    await expect(this.page.locator('.expand-menu')).toBeVisible();
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

    await this.page.waitForTimeout(2000);
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
