import { Locator, Page } from 'playwright/test';
import { Testdata } from '../util/testdata';

export abstract class BasePage {
  public page: Page;
  protected testdata: Testdata;

  constructor(page: Page, testdata: Testdata) {
    this.page = page;
    this.testdata = testdata;
  }

  async reloadPage() {
    await this.page.reload();
  }

  async waitForLoadingToStop() {
    await this.page.locator('.lds-roller').waitFor({ state: 'hidden' });
  }

  /**
   * Handles the possible popup of the terms and conditions page.
   * @param nextLocator a locator that should be visible on the next screen
   */
  async handleTermsAndConditions(nextLocator: Locator) {
    const termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
    await this.waitForLoadingToStop();
    await termsAndConditions.or(nextLocator).waitFor();
    if (await termsAndConditions.isVisible()) {
      await termsAndConditions.click();
    }
    await this.waitForLoadingToStop();
    await nextLocator.waitFor();
  }
}
