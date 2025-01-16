export class Testdata {
    private _institutionAdminUsername: string;
    private _institutionAdminPassword: string;

    constructor(institutionAdminUsername : string, institutionAdminPassword: string) {
        this._institutionAdminUsername = institutionAdminUsername;
        this._institutionAdminPassword = institutionAdminPassword;
    }

    get institutionAdminUsername(): string {
        return this._institutionAdminUsername;
    }
    
    get institutionAdminPassword(): string {
        return this._institutionAdminPassword;
    }
}