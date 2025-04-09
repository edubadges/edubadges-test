import { expect } from '@playwright/test';
import { BaseStaffSubPage } from '../baseStaffSubPage';
import path from 'path';

export class IssuerGroupSubPage extends BaseStaffSubPage {
    // Action locators
    private readonly addNewIssuerGroupButton = this.page.getByRole('link', { name: 'Add new issuer group' });
    private readonly editIssuerGroupButton = this.page.getByRole('link', { name: 'Edit issuer group' });
    private readonly saveButton = this.page.getByRole('link', { name: 'Save' });
    private readonly saveChangesButton = this.page.getByRole('link', { name: 'Save changes' });
    private readonly deleteButton = this.page.getByRole('link', { name: 'Delete' });
    private readonly confirmButton = this.page.getByRole('link', { name: 'Confirm' });
    private readonly uploadImageButton = this.page.getByText('Upload image');

    // Form locators
    private readonly titleField = this.page.getByPlaceholder('(Required field) e.g. History');
    private readonly descriptionField = this.page.getByPlaceholder('(Required field) e.g. all History related studies');
    private readonly issueOnBehalfButton = this.page.locator('.slider');
    private readonly virtualOrgField = this.page.getByPlaceholder('(Optional) e.g. URL of the other organisation');
    private readonly linkedInField = this.page.getByPlaceholder('(Optional) e.g. the linkedin identifier of the other organisation');
    private readonly tabChoiceLocator = this.page.locator('.tab-choice');

  /**
   * Adds a new issuer group.
   * Expects to be on the main issuer groups page.
   */
  async addNewIssuerGroup(
    groupName: string,
    groupDesc: string = 'Test issuer group description',
    isEnglish: boolean = false,
    issueOnBehalf: boolean = false,
    organisationURL: string = '',
    linkedInURL: string = '',
  ) {
    await this.addNewIssuerGroupButton.click();
    await this.waitForLoadingToStop();

    await this.fillIssuerGroupForm(
      groupName,
      groupDesc,
      isEnglish,
      issueOnBehalf,
      organisationURL,
      linkedInURL,
    );
    await this.saveButton.click();
    await this.waitForLoadingToStop();

    // validate
    await this.editIssuerGroupButton.waitFor();
  }

  /**
   * Edits an existing issuer group.
   * Expects to be on the main issuer groups page.
   */
  async editExistingIssuerGroup(
    oldGroupName: string,
    newGroupName: string,
    newGroupDesc: string = 'Test issuer group description',
    isEnglish: boolean = false,
    issueOnBehalf: boolean = false,
    organisationURL: string = '',
    linkedInURL: string = '',
  ) {
    await this.openIssuerGroup(oldGroupName);
    await this.clickEditGroup();

    await this.fillIssuerGroupForm(
      newGroupName,
      newGroupDesc,
      isEnglish,
      issueOnBehalf,
      organisationURL,
      linkedInURL,
    );
    await this.saveChangesButton.click();

    await this.editIssuerGroupButton.waitFor();
  }

  async deleteExistingIssuerGroup(groupName: string) {
    await this.openIssuerGroup(groupName);
    await this.clickEditGroup();
    await this.deleteButton.click();
    await this.confirmButton.click();
    await this.page.getByText('Successfully deleted issuer group').waitFor();
  }

  private async clickEditGroup() {
    await this.editIssuerGroupButton.click();
    await this.waitForLoadingToStop();
  }

  private async openIssuerGroup(issuerGroupName: string) {
    await this.searchWithText(issuerGroupName);
    await this.page
      .locator('td')
      .getByText(issuerGroupName, { exact: true })
      .click();
  }

  private async fillIssuerGroupForm(
    groupName: string,
    groupDesc: string,
    isEnglish: boolean,
    issueOnBehalf: boolean,
    organisationURL: string,
    linkedInURL: string,
  ) {
    await this.tabChoiceLocator
      .getByText(isEnglish ? 'English' : 'Dutch')
      .click();
    await this.titleField.fill(groupName);
    await this.descriptionField.fill(groupDesc);

    if (issueOnBehalf) {
      await this.issueOnBehalfButton.click({ force: true });
      await expect(this.uploadImageButton).toHaveAttribute('disabled', 'false');

      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.uploadImageButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname + '../../images/', 'edubadge.png'),
      );
      this.virtualOrgField.fill(organisationURL);
      this.linkedInField.fill(linkedInURL);
    }
  }
}
