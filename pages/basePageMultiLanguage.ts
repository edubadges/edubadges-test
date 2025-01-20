import { Page } from 'playwright';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export abstract class BasePageMultiLanguage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
    this.testdata.addPageForLanguageChangeNotification(this);
  }

  public abstract languageChange(): void;
}
