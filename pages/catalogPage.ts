import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export class CatalogPage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  async SearchForClass(name: string) {
    await this.page.getByPlaceholder('Search...').fill(name);
  }

  async filterOn(filterText: string) {
    await this.page.getByText(filterText).click();
  }

  async openEduClass(name: string) {
    await this.page.getByText(name).click();
    await expect(
      this.page.getByRole('heading', { name: 'The programme' }),
    ).toBeVisible();
  }

  async RequestEdubadge() {
    const isLoginButtonVisible = await this.page
      .getByRole('link', { name: 'Login to request this edubadge' })
      .count();
    if (isLoginButtonVisible > 0) {
      await this.page
        .getByRole('link', { name: 'Login to request this edubadge' })
        .click();
      await this.Login();
    }
    await this.page.getByRole('link', { name: 'Request', exact: true }).click();
    await this.page.waitForTimeout(2000);
    const termsAndConditionsPageShown = await this.page
      .getByRole('link', { name: 'I agree' })
      .count();
    if (termsAndConditionsPageShown > 0) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }

    const confirm = await this.page
      .getByRole('link', { name: 'Confirm' })
      .count();
    if (confirm > 0) {
      await this.page.getByRole('link', { name: 'Confirm' }).click();
    }
  }

  private async Login() {
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

  async ShareEdubadge() {
    await this.page.locator('label span').click({ force: true });
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Confirm' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Share' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Copy the link' }).click();
    await this.page.waitForTimeout(2000);
  }

  async ValidateBadge(url: string) {
    await this.page.goto(url);
    await this.page.getByRole('link', { name: 'Verify' }).click();
    await this.page.waitForTimeout(20000);
    await expect(this.page.locator('.check')).toHaveCount(9);
  }
}
