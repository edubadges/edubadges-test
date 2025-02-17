export class Accounts {
  private _institutionAdminUsername: string = '';
  private _institutionAdminPassword: string = '';
  private _hboInstitutionAdminUsername: string = '';
  private _hboInstitutionAdminPassword: string = '';
  private _mboInstitutionAdminUsername: string = '';
  private _mboInstitutionAdminPassword: string = '';

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
  private _studentEPPN: string = '';

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
    this._studentEPPN = process.env.STUDENT_EPPN || '';
    this._mboInstitutionAdminUsername =
      process.env.BADGE_CLASS_ADMIN_MBO_USERNAME || '';
    this._mboInstitutionAdminPassword =
      process.env.BADGE_CLASS_ADMIN_MBO_PASSWORD || '';
    this._hboInstitutionAdminUsername =
      process.env.BADGE_CLASS_ADMIN_HBO_USERNAME || '';
    this._hboInstitutionAdminPassword =
      process.env.BADGE_CLASS_ADMIN_HBO_PASSWORD || '';
  }

  get institutionAdminUsername(): string {
    return this._institutionAdminUsername;
  }

  get institutionAdminPassword(): string {
    return this._institutionAdminPassword;
  }

  get hboInstitutionAdminUsername(): string {
    return this._hboInstitutionAdminUsername;
  }

  get hboInstitutionAdminPassword(): string {
    return this._hboInstitutionAdminPassword;
  }

  get mboInstitutionAdminUsername(): string {
    return this._mboInstitutionAdminUsername;
  }

  get mboInstitutionAdminPassword(): string {
    return this._mboInstitutionAdminPassword;
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

  get studentEPPN(): string {
    return this._studentEPPN;
  }
}
