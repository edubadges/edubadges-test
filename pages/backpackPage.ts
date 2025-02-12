import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export class BackpackPage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  public async Login() {
    await expect(
      this.page
        .getByPlaceholder('Search...')
        .or(this.page.getByPlaceholder('e.g. user@gmail.com')),
    ).toBeVisible();

    if ((await this.page.getByPlaceholder('Search...').count()) > 0) {
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
      .count();
    if (termsAndConditionsPageShown > 0) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
  }

  async OpenBackpack() {
    await this.page.getByRole('link', { name: 'My backpack' }).click();
  }

  async AcceptBadge() {
    await this.page.getByText('Digestion and Defense').click();
    await this.page
      .getByRole('link', { name: 'Claim & Add to your backpack' })
      .click();
    await this.page.getByRole('link', { name: 'I agree' }).click();
    await this.page.getByRole('link', { name: 'Confirm' }).click();
  }
}
