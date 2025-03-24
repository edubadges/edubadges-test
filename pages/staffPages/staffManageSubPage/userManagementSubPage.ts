import { BaseStaffSubPage } from "../baseStaffSubPage";

export class UserManagementSubPage extends BaseStaffSubPage {

    async addNewUser(emailAdress: string)
    {
        await this.page.getByRole('link', { name: 'Invite new user' }).click();
        await this.fillNewUserForm(emailAdress);
        await this.page.getByRole('link', { name: 'Add', exact: true}).click();
        await this.page.getByText(`Successfully invited ${emailAdress}`).waitFor();
    }

    async fillNewUserForm(emailAdress: string,
        inputNumber: number = 0 ){
            const emailAdressForm = this.page.getByPlaceholder("e.g. john.doe@example.com").nth(inputNumber);
            
            await emailAdressForm.fill(emailAdress);
    }

    async removeExistingPermissions(nameOrEmail: string){
        const rowLocator = this.page.getByRole('row', { name: nameOrEmail });
        const removeButton = this.page.getByText('Remove permissions');

        await rowLocator.locator('.checkmarked').click();
        await removeButton.waitFor();
        await removeButton.click();
        await this.page.getByRole('link', { name: 'Confirm' }).click();
        
        // validate
        await this.page.getByText('Successfully removed invite')
            .or(this.page.getByText('Successfully removed rights'))
            .waitFor();
    }
}