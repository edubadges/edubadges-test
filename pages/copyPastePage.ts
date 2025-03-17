import { Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export class CopyPastePage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  async retreiveValueFromClipboard(): Promise<string> {
    await this.page.goto('/catalog');
    await this.page.getByPlaceholder('Search...').click();
    await this.page.keyboard.press('ControlOrMeta+v');
    const url: string = await this.page
      .getByPlaceholder('Search...')
      .inputValue();
    return url;
  }
}
