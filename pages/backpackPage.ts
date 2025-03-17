import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';
import { CopyPastePage } from './copyPastePage';

export class BackpackPage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

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
  }

  async OpenBadgeRequests() {
    await this.page.getByRole('link', { name : 'Edubadge requests' }).click();
  }

  async OpenCollections() {
    await this.page.getByRole('link', { name : 'Collections' }).click();
  }

  async OpenImported()
  {
    await this.page.getByRole('link', { name : 'Imported' }).click();
  }

  async OpenArchive()
  {
    await this.page.getByRole('link', { name : 'Archive' }).click();
  }

  async OpenAccount(){
    await this.page.getByRole('link', { name : 'Account' }).click();
  }

  async OpenBadge(badgeName: string){
    await this.page
    .locator('.card.badge')
    .getByText(badgeName)
    .first()
    .click();
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
  }


//#region Share badge

  async MakeEdubadgePublic(courseName : string){
    const eduBadgeCard = this.page
        .locator('.card.badge')
        .getByText(courseName)
        .first();

    // open badge
    await this.page.goto('');
    await expect(eduBadgeCard).toBeVisible();
    await eduBadgeCard.click();  
    await expect(eduBadgeCard).toBeVisible();
    await this.page.waitForTimeout(500); 
    // if the badge is loaded the first time the buttons need time to load correctly

    // make public
    await this.page.locator('.slider').click({ force: true });
    await this.page.getByText('Confirm').click();

    // assert success
    await expect(
      this.page.getByText('This edubadge has been made publicly visible. You can share this edubadge now')
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Share' }))
      .toHaveAttribute('disabled', 'false');
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
    await this.page.waitForTimeout(20000);
    // If this test fails, it is because the verify functionality is not running correctly
    await expect(this.page.locator('.check')).toHaveCount(9);
  }

  //#endregion

}
