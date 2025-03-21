import { expect } from '@playwright/test';
import { BaseStaffSubPage } from '../baseStaffSubPage';
import path from 'path';

export class IssuerGroupSubPage extends BaseStaffSubPage {
    // var
    async AddNewIssuerGroup(nameGroup: string){
        await this.page.getByRole('link', { name: 'Add new issuer group'}).click();
        await this.waitForLoadingToStop();

        await this.page.getByRole('link', { name: 'Save' }).click();
        
        // validate
        await this.page.getByRole('link', { name: 'Edit issuer group' }).waitFor();   
    }

    private async FillIssuerGroupForm(
        groupName: string,
        groupDesc: string = 'Test issuer group description',
        isEnglish: boolean = false,
        issueOnBehalf: boolean= false,
        organisationURL: string = '',
        linkedInURL: string = '',
    ){
        //var
        const titleField = this.page.getByPlaceholder('(Required field) e.g. History');
        const descField = this.page.getByPlaceholder('(Required field) e.g. all History related studies');
        const issueButton = this.page.locator('.slider');
        const fileChooser = await this.page.waitForEvent('filechooser');
        const virtOrgField = this.page.getByPlaceholder('(Optional) e.g. URL of the other organisation');
        const linkedInField = this.page.getByPlaceholder('(Optional) e.g. the linkedin identifier of the other organisation');

        // fill
        await this.page.getByRole('link', { name: isEnglish? 'English' : 'Dutch' }).click();
        await titleField.fill(groupName);
        await descField.fill(groupDesc);

        if(issueOnBehalf){ 
            issueButton.click({ force: true });
            await this.page.getByText('Upload image').click();
            await fileChooser.setFiles(
            path.join(__dirname + '../images/', 'edubadge.png'),
            );
            virtOrgField.fill(organisationURL);
            linkedInField.fill(linkedInURL);
        }
    }
}