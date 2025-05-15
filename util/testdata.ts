import { BasePageMultiLanguage } from '../pages/basePageMultiLanguage';
import { BadgeData } from './badgeData';
import { WOAccounts } from './WOAccounts';
import { HBOAccounts } from './HBOAccounts';
import { MBOAccounts } from './MBOAccounts';

export class Testdata {
  public testCaseName: string = '';
  public retryCount: number = 0;

  private _language: Language = Language.en;
  private _pagesForLanguageChangeNotification: BasePageMultiLanguage[] = [];
  readonly badgeData: BadgeData = new BadgeData();

  readonly WOAccounts = new WOAccounts();
  readonly HBOAccounts = new HBOAccounts();
  readonly MBOAccounts = new MBOAccounts();

  get language(): Language {
    return this._language;
  }

  set language(value: Language) {
    this._language = value;
    for (var page of this._pagesForLanguageChangeNotification) {
      page.languageChange();
    }
  }

  public addPageForLanguageChangeNotification(page: BasePageMultiLanguage) {
    this._pagesForLanguageChangeNotification.push(page);
  }
}

export enum Language {
  en = 'en',
  nl = 'nl',
}
