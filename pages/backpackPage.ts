import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

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
    await this.page.waitForTimeout(5000);
    const termsAndConditionsPageShown = await this.page
      .getByRole('link', { name: 'I agree' })
      .isVisible();
    if (termsAndConditionsPageShown) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
    await this.page.waitForTimeout(5000);
  }

  async OpenBackpack() {
    await this.page.getByRole('link', { name: 'My backpack' }).click();
  }

  async OpenBadgeRequests() {
    await this.page.getByRole('link', { name : 'Edubadge requests' }).click();
  }

  async OpenAccount(){
    await this.page.getByRole('link', { name : 'Account' }).click();
  }

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
}
