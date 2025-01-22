import { BasePageMultiLanguage } from '../pages/basePageMultiLanguage';

export class Testdata {
  private _institutionAdminUsername: string;
  private _institutionAdminPassword: string;
  private _language: Language = Language.en;
  private _pagesForLanguageChangeNotification: BasePageMultiLanguage[] = [];

  constructor(
    institutionAdminUsername: string,
    institutionAdminPassword: string,
  ) {
    this._institutionAdminUsername = institutionAdminUsername;
    this._institutionAdminPassword = institutionAdminPassword;
  }

  get institutionAdminUsername(): string {
    return this._institutionAdminUsername;
  }

  get institutionAdminPassword(): string {
    return this._institutionAdminPassword;
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
