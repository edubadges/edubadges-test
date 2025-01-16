import { expect, Page } from '@playwright/test';

export class EdubadgesPage {
  private page: Page;
  private currentLanguege = Language.en;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://127.0.0.1:8080');
  }

  async expectLoginPageOpened() {
    var bla = '';

    if (this.currentLanguege === Language.en) {
      bla = 'expectedLoginPageAfterLoginIn-eng.png';
    } else {
      bla = 'expectedLoginPageAfterLoginIn-nl.png';
    }
    await expect(this.page).toHaveScreenshot(bla, { fullPage: true });
  }
}

enum Language {
  en = 'en',
  nl = 'nl',
}
