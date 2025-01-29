import { BasePageMultiLanguage } from '../pages/basePageMultiLanguage';
import { BadgeData } from './badgeData';

export class Testdata {
  private _testCaseName: string = '';
  private _institutionAdminUsername: string = '';
  private _institutionAdminPassword: string = '';
  private _issuerGroupAdminUsername: string = '';
  private _issuerGroupAdminPassword: string = '';
  private _issuerGroupAdminIssuerGroup: string = '';
  private _issuerAdminUsername: string = '';
  private _issuerAdminPassword: string = '';
  private _badgeClassAdminUsername: string = '';
  private _badgeClassAdminPassword: string = '';
  private _studentName: string = '';
  private _studentPassword: string = '';
  private _studentEmail: string = '';
  private _language: Language = Language.en;
  private _pagesForLanguageChangeNotification: BasePageMultiLanguage[] = [];
  private _badgeData: BadgeData = new BadgeData();

  constructor() {
    this._institutionAdminUsername =
      process.env.INSTUTUTION_ADMIN_USERNAME || '';
    this._institutionAdminPassword =
      process.env.INSTUTUTION_ADMIN_PASSWORD || '';
    this._issuerGroupAdminUsername =
      process.env.ISSUER_GROUP_ADMIN_USERNAME || '';
    this._issuerGroupAdminPassword =
      process.env.ISSUER_GROUP_ADMIN_PASSWORD || '';
    this._issuerGroupAdminIssuerGroup =
      process.env.ISSUER_GROUP_ADMIN_ISSUERGROUP || '';
    this._issuerAdminUsername = process.env.ISSUER_ADMIN_USERNAME || '';
    this._issuerAdminPassword = process.env.ISSUER_ADMIN_PASSWORD || '';
    this._badgeClassAdminUsername =
      process.env.BADGE_CLASS_ADMIN_USERNAME || '';
    this._badgeClassAdminPassword =
      process.env.BADGE_CLASS_ADMIN_PASSWORD || '';
    this._studentName = process.env.STUDENT_USERNAME || '';
    this._studentPassword = process.env.STUDENT_PASSWORD || '';
    this._studentEmail = process.env.STUDENT_EMAIL || '';
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
    return this._issuerAdminUsername;
  }

  get issuerAdminPassword(): string {
    return this._issuerAdminPassword;
  }

  get badgeClassAdminUsername(): string {
    return this._badgeClassAdminUsername;
  }

  get badgeClassAdminPassword(): string {
    return this._badgeClassAdminPassword;
  }

  get studentName(): string {
    return this._studentName;
  }

  get studentPassword(): string {
    return this._studentPassword;
  }

  get studentEmail(): string {
    return this._studentEmail;
  }

  get badgeData(): BadgeData {
    return this._badgeData;
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
