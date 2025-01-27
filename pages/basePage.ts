import { Page } from 'playwright/test';
import { Testdata } from '../util/testdata';

export abstract class BasePage {
  public page: Page;
  protected testdata: Testdata;

  constructor(page: Page, testdata: Testdata) {
    this.page = page;
    this.testdata = testdata;
  }
}
