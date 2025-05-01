import { AccountsBase, staffDetails, studentDetails } from './accountBase';

export class HBOAccounts extends AccountsBase {
  institutionAdmin: staffDetails;
  issuerGroupAdmin: staffDetails;
  issuerAdmin: staffDetails;
  badgeClassAdmin: staffDetails;
  student: studentDetails[];

  constructor() {
    super();
    this.institutionAdmin = new staffDetails(
      process.env.HBO_INSTITUTION_ADMIN_USERNAME || '',
      process.env.HBO_INSTITUTION_ADMIN_PASSWORD || '',
    );
    this.issuerGroupAdmin = new staffDetails(
      process.env.HBO_ISSUERGROUP_ADMIN_USERNAME || '',
      process.env.HBO_ISSUERGROUP_ADMIN_PASSWORD || '',
    );
    this.issuerAdmin = new staffDetails(
      process.env.HBO_ISSUER_ADMIN_USERNAME || '',
      process.env.HBO_ISSUER_ADMIN_PASSWORD || '',
    );
    this.badgeClassAdmin = new staffDetails(
      process.env.HBO_BADGECLASS_ADMIN_USERNAME || '',
      process.env.HBO_BADGECLASS_ADMIN_PASSWORD || '',
    );

    this.student = [
      new studentDetails(
        process.env.HBO_STUDENT_1_EMAIL || '',
        process.env.HBO_STUDENT_1_PASSWORD || '',
        process.env.HBO_STUDENT_1_NAME || '',
        process.env.HBO_STUDENT_1_EPPN || '',
      ),
      new studentDetails(
        process.env.HBO_STUDENT_2_EMAIL || '',
        process.env.HBO_STUDENT_2_PASSWORD || '',
        process.env.HBO_STUDENT_2_NAME || '',
        process.env.HBO_STUDENT_2_EPPN || '',
      ),
    ];
  }
}
