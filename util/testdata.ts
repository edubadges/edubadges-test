import { BasePageMultiLanguage } from '../pages/basePageMultiLanguage';

export class Testdata {
  private _testCaseName: string = '';
  private _institutionAdminUsername: string;
  private _institutionAdminPassword: string;
  private _issuerGroupAdminUsername: string;
  private _issuerGroupAdminPassword: string;
  private _issuerGroupAdminIssuerGroup: string;
  private _IssuerAdminUsername: string;
  private _IssuerAdminPassword: string;
  private _badgeClassAdminUsername: string;
  private _badgeClassAdminPassword: string;
  private _language: Language = Language.en;
  private _pagesForLanguageChangeNotification: BasePageMultiLanguage[] = [];

  constructor(
    institutionAdminUsername: string,
    institutionAdminPassword: string,
    issuerGroupAdminUsername: string,
    issuerGroupAdminPassword: string,
    issuerGroupAdminIssuerGroup: string,
    issuerAdminUsername: string,
    issuerAdminPassword: string,
    badgeClassAdminUsername: string,
    badgeClassAdminPassword: string
  ) {
    this._institutionAdminUsername = institutionAdminUsername;
    this._institutionAdminPassword = institutionAdminPassword;
    this._issuerGroupAdminUsername = issuerGroupAdminUsername;
    this._issuerGroupAdminPassword = issuerGroupAdminPassword;
    this._issuerGroupAdminIssuerGroup = issuerGroupAdminIssuerGroup;
    this._IssuerAdminUsername = issuerAdminUsername;
    this._IssuerAdminPassword = issuerAdminPassword;
    this._badgeClassAdminUsername = badgeClassAdminUsername;
    this._badgeClassAdminPassword = badgeClassAdminPassword;
  }

  get testCaseName(): string {
    return this._testCaseName;
  }

  set testCaseName(name: string) {
    this._testCaseName = name;
  }

  get institutionAdminUsername(): string {
    return this._institutionAdminUsername;
  }

  get institutionAdminPassword(): string {
    return this._institutionAdminPassword;
  }

  get issuerGroupAdminUsername(): string {
    return this._issuerGroupAdminUsername;
  }

  get issuerGroupAdminPassword(): string {
    return this._issuerGroupAdminPassword;
  }

  get issuerGroupAdminIssuerGroup(): string {
    return this._issuerGroupAdminIssuerGroup;
  }

  get issuerAdminUsername(): string {
    return this._IssuerAdminUsername;
  }

  get issuerAdminPassword(): string {
    return this._IssuerAdminPassword;
  }

  get badgeClassAdminUsername(): string {
    return this._badgeClassAdminUsername;
  }

  get badgeClassAdminPassword(): string {
    return this._badgeClassAdminPassword;
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
