export class Accounts {
  //  //  staff
  // institution
  readonly institutionAdminUsername: string = '';
  readonly institutionAdminPassword: string = '';
  readonly hboInstitutionAdminUsername: string = '';
  readonly hboInstitutionAdminPassword: string = '';
  readonly mboInstitutionAdminUsername: string = '';
  readonly mboInstitutionAdminPassword: string = '';

  // issuer group
  readonly issuerGroupAdminUsername: string = '';
  readonly issuerGroupAdminPassword: string = '';
  readonly issuerGroupAdminIssuerGroup: string = '';
  readonly issuerAdminUsername: string = '';
  readonly issuerAdminPassword: string = '';

  // badgeclass
  readonly badgeClassAdminUsername: string = '';
  readonly badgeClassAdminPassword: string = '';

  //  // Students
  // WO
  readonly studentName: string = '';
  readonly studentUsername: string = '';
  readonly studentPassword: string = '';
  readonly studentEmail: string = '';
  readonly studentEPPN: string = '';

  constructor() {
    this.institutionAdminUsername =
      process.env.INSTUTUTION_ADMIN_USERNAME || '';
    this.institutionAdminPassword =
      process.env.INSTUTUTION_ADMIN_PASSWORD || '';
    this.issuerGroupAdminUsername =
      process.env.ISSUER_GROUP_ADMIN_USERNAME || '';
    this.issuerGroupAdminPassword =
      process.env.ISSUER_GROUP_ADMIN_PASSWORD || '';
    this.issuerGroupAdminIssuerGroup =
      process.env.ISSUER_GROUP_ADMIN_ISSUERGROUP || '';
    this.issuerAdminUsername = process.env.ISSUER_ADMIN_USERNAME || '';
    this.issuerAdminPassword = process.env.ISSUER_ADMIN_PASSWORD || '';
    this.badgeClassAdminUsername = process.env.BADGE_CLASS_ADMIN_USERNAME || '';
    this.badgeClassAdminPassword = process.env.BADGE_CLASS_ADMIN_PASSWORD || '';

    this.studentName = process.env.STUDENT_NAME || '';
    this.studentUsername = process.env.STUDENT_USERNAME || '';
    this.studentPassword = process.env.STUDENT_PASSWORD || '';
    this.studentEmail = process.env.STUDENT_EMAIL || '';
    this.studentEPPN = process.env.STUDENT_EPPN || '';
    this.mboInstitutionAdminUsername =
      process.env.BADGE_CLASS_ADMIN_MBO_USERNAME || '';
    this.mboInstitutionAdminPassword =
      process.env.BADGE_CLASS_ADMIN_MBO_PASSWORD || '';
    this.hboInstitutionAdminUsername =
      process.env.BADGE_CLASS_ADMIN_HBO_USERNAME || '';
    this.hboInstitutionAdminPassword =
      process.env.BADGE_CLASS_ADMIN_HBO_PASSWORD || '';
  }
}
