import { BaseStaffSubPage } from '../baseStaffSubPage';

export class UserManagementSubPage extends BaseStaffSubPage {
    // Action locators
    private readonly inviteNewUserButton = this.page.getByRole('link', { name: 'Invite new user' });
    private readonly addButton = this.page.getByRole('link', { name: 'Add', exact: true });
    private readonly removePermissionsButton = this.page.getByText('Remove permissions');
    private readonly confirmButton = this.page.getByRole('link', { name: 'Confirm' });

  // Form locators
  private readonly emailField = this.page.getByPlaceholder(
    'e.g. john.doe@example.com',
  );

  async addNewUser(emailAddress: string) {
    await this.inviteNewUserButton.click();
    await this.fillNewUserForm(emailAddress);
    await this.addButton.click();
    await this.page.getByText(`Successfully invited ${emailAddress}`).waitFor();
  }

  async fillNewUserForm(emailAddress: string, inputNumber: number = 0) {
    const emailAddressForm = this.emailField.nth(inputNumber);
    await emailAddressForm.fill(emailAddress);
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
