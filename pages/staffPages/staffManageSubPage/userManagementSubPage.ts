import { BaseStaffSubPage } from "../baseStaffSubPage";

export class UserManagementSubPage extends BaseStaffSubPage {

    async addNewUser(emailAdress: string, role: string = "Institution admin"
    ){
        await this.fillNewUserForm(emailAdress, role);
        await this.page.getByRole('link', { name: "Add"}).click();
        await this.page.getByText(`Successfully invited ${emailAdress}`).waitFor();
    }

    async fillNewUserForm(emailAdress: string,
        role: string,
        inputNumber: number = 0 ){
            const emailAdressForm = this.page.getByPlaceholder("e.g. john.doe@example.com").nth(inputNumber);
            
            await emailAdressForm.fill(emailAdress);

            if(role != "Institution admin"){
                // WHEN DOES THIS HAPPEN
            }
    }

    async removeExistingPermissions(nameOrEmail: string){
        const rowLocator = this.page.getByText(nameOrEmail).locator('../..');
        const removeButton = this.page.getByText('Remove permissions');

        await rowLocator.locator('.checkboxed').click();
        await removeButton.waitFor();
        await removeButton.click();
        await this.page.getByRole('link', { name: 'Confirm' }).click();
        
        // validate
        await this.page.getByText('Successfully removed invite')
            .or(this.page.getByText('Successfully removed rights'))
            .waitFor();
    }
}