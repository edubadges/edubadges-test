import { AccountsBase, staffDetails, studentDetails } from './accountBase';

export class WOAccounts extends AccountsBase {
  institutionAdminLogin: staffDetails;
  issuerGroupAdmin: staffDetails;
  issuerAdmin: staffDetails;
  badgeClassAdminLogin: staffDetails;
  student: studentDetails[];

  constructor() {
    super();
    this.institutionAdminLogin = new staffDetails(
      process.env.WO_INSTITUTION_ADMIN_USERNAME || '',
      process.env.WO_INSTITUTION_ADMIN_PASSWORD || '',
    );
    this.issuerGroupAdmin = new staffDetails(
      process.env.WO_ISSUERGROUP_ADMIN_USERNAME || '',
      process.env.WO_ISSUERGROUP_ADMIN_PASSWORD || '',
    );
    this.issuerAdmin = new staffDetails(
      process.env.WO_ISSUER_ADMIN_USERNAME || '',
      process.env.WO_ISSUER_ADMIN_PASSWORD || '',
    );
    this.badgeClassAdminLogin = new staffDetails(
      process.env.WO_BADGECLASS_ADMIN_USERNAME || '',
      process.env.WO_BADGECLASS_ADMIN_PASSWORD || '',
    );

    this.student = [
      new studentDetails(
        process.env.WO_STUDENT_1_EMAIL || '',
        process.env.WO_STUDENT_1_PASSWORD || '',
        process.env.WO_STUDENT_1_NAME || '',
        process.env.WO_STUDENT_1_EPPN || '',
      ),
      new studentDetails(
        process.env.WO_STUDENT_2_EMAIL || '',
        process.env.WO_STUDENT_2_PASSWORD || '',
        process.env.WO_STUDENT_2_NAME || '',
        process.env.WO_STUDENT_2_EPPN || '',
      ),
      new studentDetails(
        process.env.WO_STUDENT_3_EMAIL || '',
        process.env.WO_STUDENT_3_PASSWORD || '',
        process.env.WO_STUDENT_3_NAME || '',
        process.env.WO_STUDENT_3_EPPN || '',
      ),
    ];
  }
}
