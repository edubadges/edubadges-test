import { BasePageMultiLanguage } from '../pages/basePageMultiLanguage';
import { Accounts } from './accounts';
import { BadgeData } from './badgeData';

export class Testdata {
  private _testCaseName: string = '';
  private _language: Language = Language.en;
  private _pagesForLanguageChangeNotification: BasePageMultiLanguage[] = [];
  private _badgeData: BadgeData = new BadgeData();
  private _accounts: Accounts = new Accounts();

  constructor() {}

  get testCaseName(): string {
    return this._testCaseName;
  }

  set testCaseName(name: string) {
    this._testCaseName = name;
  }

  get badgeData(): BadgeData {
    return this._badgeData;
  }

  get accounts(): Accounts {
    return this._accounts;
  }

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
