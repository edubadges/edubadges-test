import { AccountsBase, staffDetails, studentDetails } from "./accountsBase";

export class MBOAccounts extends AccountsBase{
    institutionAdminLogin: staffDetails;
    issuerGroupAdmin: staffDetails;
    badgeClassAdminLogin: staffDetails;
    student: studentDetails[];
    
    constructor(){
        super();
        this.institutionAdminLogin = new staffDetails(
            process.env.MBO_INSTITUTION_ADMIN_USERNAME || '',
            process.env.MBO_INSTITUTION_ADMIN_PASSOWRD || '',
        )
        this.issuerGroupAdmin = new staffDetails(
            process.env.MBO_ISSUERGROUP_ADMIN_USERNAME || '',
            process.env.MBO_ISSUERGROUP_ADMIN_PASSOWRD || '',
        )
        this.badgeClassAdminLogin = new staffDetails(
            process.env.MBO_BADGECLASS_ADMIN_USERNAME || '',
            process.env.MBO_BADGECLASS_ADMIN_PASSOWRD || '',
        )

        this.student= [
            new studentDetails(
                process.env.MBO_STUDENT_1_EMAIL || '',
                process.env.MBO_STUDENT_1_PASSWORD || '',
                process.env.MBO_STUDENT_1_NAME || '',
                process.env.MBO_STUDENT_1_EPPN || ''
            ),
            new studentDetails(
                process.env.MBO_STUDENT_2_EMAIL || '',
                process.env.MBO_STUDENT_2_PASSWORD || '',
                process.env.MBO_STUDENT_2_NAME || '',
                process.env.MBO_STUDENT_2_EPPN || ''
            ),
        ]
    }
}