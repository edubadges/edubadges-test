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

  async filterOn(filterText: string = "university-example.org") {
    await this.page.getByText(filterText).click();
  }

  async openEduClass(name: string) {
    await this.page.getByText(name).first().click();
    await expect(
      this.page.getByRole('heading', { name: 'The programme' }),
    ).toBeVisible();
  }

  async RequestEdubadge() {
    const isLoginButtonVisible = await this.page
      .getByRole('link', { name: 'Login to request this edubadge' })
      .isVisible();
    if (isLoginButtonVisible) {
      await this.page
        .getByRole('link', { name: 'Login to request this edubadge' })
        .click();
      await this.Login();
    }
    await this.page.getByRole('link', { name: 'Request', exact: true }).click();
    await this.page.waitForTimeout(2000);

    const termsAndConditionsPageShown = await this.page
      .getByRole('link', { name: 'I agree' })
      .isVisible();
    if (termsAndConditionsPageShown) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }

    const confirm = await this.page
      .getByRole('link', { name: 'Confirm' })
      .isVisible();
    if (confirm) {
      await this.page.getByRole('link', { name: 'Confirm' }).click();
    }
  }

  async Login(
    username: string = this.testdata.accounts.studentEmail,
    password: string = this.testdata.accounts.studentPassword,
  ) {
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
      .fill(username);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Next' }).click();

    await this.page
      .getByPlaceholder('Password')
      .fill(password);
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
    // If this test fails, it is because the verify functionality is not running correctly
    await expect(this.page.locator('.check')).toHaveCount(9);
  }
}
