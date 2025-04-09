import { AccountsBase, staffDetails, studentDetails } from './accountBase';

export class MBOAccounts extends AccountsBase {
  institutionAdminLogin: staffDetails;
  issuerGroupAdmin: staffDetails;
  issuerAdmin: staffDetails;
  badgeClassAdminLogin: staffDetails;
  student: studentDetails[];

  constructor() {
    super();
    this.institutionAdminLogin = new staffDetails(
      process.env.MBO_INSTITUTION_ADMIN_USERNAME || '',
      process.env.MBO_INSTITUTION_ADMIN_PASSWORD || '',
    );
    this.issuerGroupAdmin = new staffDetails(
      process.env.MBO_ISSUERGROUP_ADMIN_USERNAME || '',
      process.env.MBO_ISSUERGROUP_ADMIN_PASSWORD || '',
    );
    this.issuerAdmin = new staffDetails(
        process.env.MBO_ISSUER_ADMIN_USERNAME || '',
        process.env.MBO_ISSUER_ADMIN_PASSWORD || '',
    )
    this.badgeClassAdminLogin = new staffDetails(
      process.env.MBO_BADGECLASS_ADMIN_USERNAME || '',
      process.env.MBO_BADGECLASS_ADMIN_PASSWORD || '',
    );

    this.student = [
      new studentDetails(
        process.env.MBO_STUDENT_1_EMAIL || '',
        process.env.MBO_STUDENT_1_PASSWORD || '',
        process.env.MBO_STUDENT_1_NAME || '',
        process.env.MBO_STUDENT_1_EPPN || '',
      ),
      new studentDetails(
        process.env.MBO_STUDENT_2_EMAIL || '',
        process.env.MBO_STUDENT_2_PASSWORD || '',
        process.env.MBO_STUDENT_2_NAME || '',
        process.env.MBO_STUDENT_2_EPPN || '',
      ),
    ];
  }
}
