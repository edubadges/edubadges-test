import { institution } from '../../../util/loginPossibilities';
import { BaseStaffSubPage } from '../baseStaffSubPage';

export class UserManagementSubPage extends BaseStaffSubPage {
  // Action locators
  private readonly inviteNewUserButton = this.page.getByRole('link', {
    name: 'Invite new user',
  });
  private readonly addButton = this.page.getByRole('link', {
    name: 'Add',
    exact: true,
  });
  private readonly removePermissionsButton =
    this.page.getByText('Remove permissions');
  private readonly confirmButton = this.page.getByRole('link', {
    name: 'Confirm',
  });
  private readonly userManagementLink = this.page.getByRole('link', {
    name: 'User management',
  });

  // Form locators
  private readonly emailField = this.page.getByPlaceholder(
    'e.g. john.doe@example.com',
  );
  private readonly roleForm = this.page.getByText('Role')
    .locator('..');

  async getInstitutionServer(institution: institution) {
    switch (institution) {
      case 'WO':
        return 'university-example.org';
      case 'HBO':
        return 'yale-uni-example.edu';
      case 'MBO':
        return 'harvard-example.edu';
    }
  }
  
  async inviteUser(email: string, role?: string){
    await this.userManagementLink.click();
    await this.fillNewUserForm(email, role);
    await this.addButton.click();
    await this.page.getByText(`Successfully invited ${email}`).waitFor();
  }

  private async fillNewUserForm(emailAddress: string, role?: string) {
    await this.emailField.fill(emailAddress);
    if(role){
      await this.roleForm.locator('.indicator').click();
      await this.roleForm.getByText(role).click();
    }
  }

  async removeExistingPermissions(nameOrEmail: string) {
    const rowLocator = this.page.getByRole('row', { name: nameOrEmail });

    await rowLocator.locator('.checkmarked').click();
    await this.removePermissionsButton.waitFor();
    await this.removePermissionsButton.click();
    await this.confirmButton.click();

    // Validate
    await this.page
      .getByText('Successfully removed invite')
      .or(this.page.getByText('Successfully removed rights'))
      .waitFor();
  }
}
