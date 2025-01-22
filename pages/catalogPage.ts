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
    await expect(this.page.getByRole('heading', { name: 'The programme' })).toBeVisible();
  }

  async RequestEdubadge() {
    const isLoginButtonVisible = await this.page.getByRole('link', { name: 'Login to request this edubadge' }).count();
    if(isLoginButtonVisible > 0) {
      await this.page.getByRole('link', { name: 'Login to request this edubadge' }).click();
      await this.Login();
    }
    await this.page.getByRole('link', { name: 'Request' , exact: true }).click();
    await this.page.waitForTimeout(2000);
    const termsAndConditionsPageShown = await this.page.getByRole('link', { name: 'I agree' }).count();
    if(termsAndConditionsPageShown > 0) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
    await this.page.getByRole('link', { name: 'Confirm' }).click();
  }

  private async Login() {
    await this.page.getByPlaceholder('e.g. user@gmail.com').fill(this.testdata.studentEmail);
    await this.page.getByRole('link', { name: 'Next' }).click();
    await this.page.getByPlaceholder('Password').fill(this.testdata.studentPassword);
    await this.page.getByRole('link', { name: 'Login' }).click();
    await this.page.waitForTimeout(2000);
    const termsAndConditionsPageShown = await this.page.getByRole('link', { name: 'I agree' }).count();
    if(termsAndConditionsPageShown > 0) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }
  }
}
