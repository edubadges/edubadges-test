export abstract class AccountsBase{
    abstract readonly institutionAdminLogin: staffDetails;
    abstract readonly issuerGroupAdmin: staffDetails;
    abstract readonly badgeClassAdminLogin: staffDetails;
    abstract readonly student: studentDetails[];
}

export class staffDetails{
    readonly username: string;
    readonly password: string;
    
    constructor(username: string, password: string){
        this.username = username;
        this.password = password
    }
}

export class studentDetails{
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly EPPN: string;


    constructor(email: string, password: string, name: string, EPPN: string){
        this.email = email;
        this.password = password
        this.name = name;
        this.EPPN = EPPN;
    }
}