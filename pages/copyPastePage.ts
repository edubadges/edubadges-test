import { Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export class CopyPastePage extends BasePage {
  private readonly searchField = this.page.getByPlaceholder('Search...');

  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  async retrieveValueFromClipboard(): Promise<string> {
    await this.page.goto('/catalog');
    await this.searchField.click();
    await this.page.keyboard.press('Control+V');
    return await this.searchField.inputValue();
  }
}
