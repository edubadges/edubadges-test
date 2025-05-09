import path from 'path';
import { BaseStaffSubPage } from '../baseStaffSubPage';
import { expect } from '@playwright/test';

export class IssuersSubPage extends BaseStaffSubPage {
  // Action locators
  private readonly editBadgeButton = this.page.getByRole('link', {
    name: 'Edit badge class',
    exact: true,
  });
  private readonly addNewIssuerButton = this.page.getByRole('link', {
    name: 'Add new issuer',
  });
  private readonly editIssuerButton = this.page.getByRole('link', {
    name: 'Edit issuer',
  });
  private readonly saveButton = this.page.getByRole('link', { name: 'Save' });
  private readonly saveChangesButton = this.page.getByRole('link', {
    name: 'Save changes',
  });
  private readonly deleteButton = this.page.getByRole('link', {
    name: 'Delete',
    exact: true,
  });
  private readonly confirmButton = this.page.getByRole('link', {
    name: 'Confirm',
    exact: true,
  });
  private readonly uploadImageButton = this.page.getByText('Upload image');
  private readonly addNewBadgeClassButton = this.page.getByRole('link', {
    name: 'Add new badge class',
  });
  private readonly copyBadgeButton = this.page.getByRole('link', {
    name: 'Copy badge class',
  });

  // Form locators
  private readonly mainContent = this.page.locator('.main-content-margin');
  private readonly nameField = this.mainContent
    .getByText('Name in ')
    .locator('..')
    .getByRole('textbox');
  private readonly descriptionField = this.mainContent
    .getByText('Description in ')
    .locator('..')
    .getByRole('textbox');
  private readonly urlField = this.mainContent
    .getByText('Website URL for ')
    .locator('..')
    .getByRole('textbox');
  private readonly contactField = this.mainContent
    .getByText('Contact email address')
    .locator('..')
    .getByRole('textbox');
  private readonly issuerGroupField = this.page
    .getByText('Issuer group')
    .locator('..');

  private async uploadImage(imagePath: string = 'edubadge.png') {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadImageButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(__dirname + '../../images/', imagePath),
    );
  }

  //#region issuer

  async openIssuer(issuerName: string) {
    await this.searchWithText(issuerName);
    await this.page.getByRole('cell', { name: issuerName }).click();
    await expect(this.addNewBadgeClassButton).toBeVisible();
  }

  async createNewIssuer(
    issuerName: string,
    issuerDescription?: string,
    issuerLink?: string,
    issuerContactMail?: string,
    issuerGroupName?: string,
  ) {
    await this.clickAddNewIssuer();
    await this.fillIssuerForm(
      issuerName,
      issuerDescription || 'Default description',
      issuerLink || 'https://example.com',
      issuerContactMail || 'default@mailaddress.com',
      issuerGroupName,
    );

    await this.saveButton.click();

    await this.waitForLoadingToStop();
  }

  async editExistingIssuer(
    oldIssuerName: string,
    issuerName: string,
    issuerDescription?: string,
    issuerLink?: string,
    issuerContactMail?: string,
    issuerGroupName?: string,
  ) {
    await this.openIssuer(oldIssuerName);
    await this.clickEditIssuer();

    await this.emptyAllForms();
    await this.fillIssuerForm(
      issuerName,
      issuerDescription || 'Default description',
      issuerLink || 'https://example.com',
      issuerContactMail || 'default@mailaddress.com',
      issuerGroupName,
    );

    await this.saveChangesButton.click();
    await this.waitForLoadingToStop();
  }

  async deleteExistingIssuer(issuerName: string) {
    await this.openIssuer(issuerName);
    await this.clickEditIssuer();
    await this.deleteButton.click();
    await this.confirmButton.click();
    await this.page.getByText('Successfully deleted issuer').waitFor();
  }

  private async clickAddNewIssuer() {
    await this.addNewIssuerButton.click();
    await this.waitForLoadingToStop();
  }

  private async clickEditIssuer() {
    await this.editIssuerButton.click();
    await this.waitForLoadingToStop();
  }

  private async fillIssuerForm(
    issuerName: string,
    issuerDescription: string,
    issuerLink: string,
    issuerContactMail: string,
    issuerGroupName?: string,
  ) {
    if (issuerGroupName != undefined) {
      await this.issuerGroupField.locator('.indicator').click();
      await this.issuerGroupField
        .locator('.listItem')
        .getByText(issuerGroupName)
        .click();
    }

    await this.nameField.fill(issuerName);
    await this.descriptionField.fill(issuerDescription);
    await this.urlField.fill(issuerLink);
    await this.contactField.fill(issuerContactMail);
    await this.uploadImage();
  }

  //#endregion

  //#region badge

  /**Expects the badge to be edited to be opened */
  async editExistingBadge(
    badgeTitle: string = this.testdata.badgeData.title,
    badgeDesc: string = this.testdata.badgeData.description,
    learningOutcomes: string = this.testdata.badgeData.learningOutcomes,
    criterium: string = this.testdata.badgeData.criteria,
    eqfLevel: string = this.testdata.badgeData.eqfLevel,
    programIdentifiers: string = this.testdata.badgeData.programIdentifiers,
    formOfParticipation: string = this.testdata.badgeData.formOfParticipation,
    assesment: string = this.testdata.badgeData.assessment,
    frameworkName: string = this.testdata.badgeData.frameworkName,
    frameworkTitle: string = this.testdata.badgeData.frameworkName,
    frameworkURL: string = this.testdata.badgeData.frameworkUrl,
    frameworkCode: string = this.testdata.badgeData.frameworkCode,
    frameworkDesc: string = this.testdata.badgeData.frameworkDescription,
  ) {
    await this.editBadgeButton.click();
    await this.waitForLoadingToStop();
    await this.emptyAllForms();
    await this.fillInBadgeForm(
      badgeTitle,
      badgeDesc,
      learningOutcomes,
      criterium,
      eqfLevel,
      programIdentifiers,
      formOfParticipation,
      assesment,
      frameworkName,
      frameworkTitle,
      frameworkURL,
      frameworkCode,
      frameworkDesc,
    );
    await this.saveChangesButton.click();
    await this.editBadgeButton.waitFor();
  }

  /**Expects the badge to be removed to be opened */
  async removeExistingBadge() {
    await this.editBadgeButton.click();
    await this.waitForLoadingToStop();
    await this.deleteButton.click();
    await this.confirmButton.click();
    await this.page.getByText('Successfully deleted Badge class').waitFor();
  }

  /**Expects the badge to be copied to be opened */
  async copyExistingBadge(badgeTitle: string) {
    await this.copyBadgeButton.click();

    const pageForm = this.page.getByText('Basic information').locator('..');
    const titleFormLocator = pageForm
      .getByText('Name')
      .first()
      .locator('../../..')
      .getByRole('textbox');
    await titleFormLocator.fill(badgeTitle);

    await this.publishBadge();
  }

  private async emptyAllForms() {
    const mirrorForms = await this.page.locator('.CodeMirror-scroll').all();
    for (let i = 0; i < mirrorForms.length; i++) {
      let form = mirrorForms[i];
      await form.click();
      await this.emptyMirrorForm();
    }

    const removableItems = await this.page
      .locator('.multiSelectItem_clear')
      .all();
    for (let i = 1; i <= removableItems.length; i++) {
      let item = removableItems[removableItems.length - i];
      await item.click();
    }

    const removeInputButtons = await this.page.locator('div.clearSelect').all();
    for (let i = 1; i <= removeInputButtons.length; i++) {
      let button = removeInputButtons[removeInputButtons.length - i];
      await button.click();
    }
  }

  private async emptyMirrorForm() {
    await this.page.keyboard.press('ControlOrMeta+A');
    await this.page.keyboard.press('Backspace');
  }

  async clickNewBadgeClass() {
    await this.addNewBadgeClassButton.click();
    await this.waitForLoadingToStop();
  }

  async createRegularBadge(
    badgeTitle: string,
    issuergroupName?: string,
    badgeDesc: string = this.testdata.badgeData.description,
    learningOutcomes: string = this.testdata.badgeData.learningOutcomes,
    criterium: string = this.testdata.badgeData.criteria,
    eqfLevel: string = this.testdata.badgeData.eqfLevel,
    programIdentifiers: string = this.testdata.badgeData.programIdentifiers,
    formOfParticipation: string = this.testdata.badgeData.formOfParticipation,
    assesment: string = this.testdata.badgeData.assessment,
    frameworkName: string = this.testdata.badgeData.frameworkName,
    frameworkTitle: string = this.testdata.badgeData.frameworkName,
    frameworkURL: string = this.testdata.badgeData.frameworkUrl,
    frameworkCode: string = this.testdata.badgeData.frameworkCode,
    frameworkDesc: string = this.testdata.badgeData.frameworkDescription,
  ) {
    if(issuergroupName){
      await this.searchWithText(issuergroupName);
      await this.openIssuer(issuergroupName);
    }
    await this.clickNewBadgeClass();
    await this.clickRegularBadge();
    await this.fillInBadgeForm(
      badgeTitle,
      badgeDesc,
      learningOutcomes,
      criterium,
      eqfLevel,
      programIdentifiers,
      formOfParticipation,
      assesment,
      frameworkName,
      frameworkTitle,
      frameworkURL,
      frameworkCode,
      frameworkDesc,
    );
    await this.publishBadge();
  }

  async createMicroBadge(
    issuerGroupName: string,
    badgeTitle: string,
    badgeDesc: string = this.testdata.badgeData.description,
    learningOutcomes: string = this.testdata.badgeData.learningOutcomes,
    criterium: string = this.testdata.badgeData.criteria,
    eqfLevel: string = this.testdata.badgeData.eqfLevel,
    programIdentifiers: string = this.testdata.badgeData.programIdentifiers,
    formOfParticipation: string = this.testdata.badgeData.formOfParticipation,
    assesment: string = this.testdata.badgeData.assessment,
    frameworkName: string = this.testdata.badgeData.frameworkName,
    frameworkTitle: string = this.testdata.badgeData.frameworkName,
    frameworkURL: string = this.testdata.badgeData.frameworkUrl,
    frameworkCode: string = this.testdata.badgeData.frameworkCode,
    frameworkDesc: string = this.testdata.badgeData.frameworkDescription,
  ) {
    await this.searchWithText(issuerGroupName);
    await this.openIssuer(issuerGroupName);
    await this.clickNewBadgeClass();
    await this.clickMicroCredential();
    await this.fillInBadgeForm(
      badgeTitle,
      badgeDesc,
      learningOutcomes,
      criterium,
      eqfLevel,
      programIdentifiers,
      formOfParticipation,
      assesment,
      frameworkName,
      frameworkTitle,
      frameworkURL,
      frameworkCode,
      frameworkDesc,
    );
    await this.publishBadge();
  }

  async createExtracurricularBadge(
    issuerGroupName: string,
    badgeTitle: string,
    badgeDesc: string = this.testdata.badgeData.description,
    learningOutcomes: string = this.testdata.badgeData.learningOutcomes,
    criterium: string = this.testdata.badgeData.criteria,
    eqfLevel: string = this.testdata.badgeData.eqfLevel,
    programIdentifiers: string = this.testdata.badgeData.programIdentifiers,
    formOfParticipation: string = this.testdata.badgeData.formOfParticipation,
    assesment: string = this.testdata.badgeData.assessment,
    frameworkName: string = this.testdata.badgeData.frameworkName,
    frameworkTitle: string = this.testdata.badgeData.frameworkName,
    frameworkURL: string = this.testdata.badgeData.frameworkUrl,
    frameworkCode: string = this.testdata.badgeData.frameworkCode,
    frameworkDesc: string = this.testdata.badgeData.frameworkDescription,
    hoursNeeded: string = this.testdata.badgeData.hours,
  ) {
    await this.searchWithText(issuerGroupName);
    await this.openIssuer(issuerGroupName);
    await this.clickNewBadgeClass();
    await this.clickExtraCurricularEduBadge();
    await this.fillInBadgeForm(
      badgeTitle,
      badgeDesc,
      learningOutcomes,
      criterium,
      eqfLevel,
      programIdentifiers,
      formOfParticipation,
      assesment,
      frameworkName,
      frameworkTitle,
      frameworkURL,
      frameworkCode,
      frameworkDesc,
    );

    await this.fillInBadgeHoursForm(hoursNeeded);

    await this.publishBadge();
  }

  async clickMicroCredential() {
    await this.page
      .getByText('Microcredential A badge class')
      .getByRole('link', { name: 'Create' })
      .click();
  }

  async clickRegularBadge() {
    await this.page
      .getByText('Regular A badge class for')
      .getByRole('link', { name: 'Create' })
      .click();
  }

  async clickExtraCurricularEduBadge() {
    await this.page
      .getByText('Extra curricular A badge')
      .getByRole('link', { name: 'Create' })
      .click();
  }

  async fillInMicrocredentialForm() {
    await this.fillInBadgeForm();
  }

  async fillInRegularForm() {
    await this.fillInBadgeForm();
  }

  async fillInExtraCurricularForm() {
    await this.fillInBadgeForm();
  }

  async fillInMBOExtraCurricularForm() {
    await this.fillInBadgeForm();
    await this.fillInBadgeHoursForm();
  }

  private async fillInBadgeForm(
    badgeTitle: string = this.testdata.badgeData.title,
    badgeDesc: string = this.testdata.badgeData.description,
    learningOutcomes: string = this.testdata.badgeData.learningOutcomes,
    criterium: string = this.testdata.badgeData.criteria,
    eqfLevel: string = this.testdata.badgeData.eqfLevel,
    programIdentifiers: string = this.testdata.badgeData.programIdentifiers,
    formOfParticipation: string = this.testdata.badgeData.formOfParticipation,
    assessment: string = this.testdata.badgeData.assessment,
    frameworkName: string = this.testdata.badgeData.frameworkName,
    frameworkTitle: string = this.testdata.badgeData.frameworkName,
    frameworkURL: string = this.testdata.badgeData.frameworkUrl,
    frameworkCode: string = this.testdata.badgeData.frameworkCode,
    frameworkDesc: string = this.testdata.badgeData.frameworkDescription,
  ) {
    const pageForm = this.page.getByText('Basic information').locator('..');
    await this.waitForLoadingToStop();
    await this.page.waitForTimeout(500);
    await pageForm
      .getByText('Name')
      .first()
      .locator('../../..')
      .getByRole('textbox')
      .fill(badgeTitle);

    await pageForm.locator('.CodeMirror-scroll').first().click();
    await this.page.keyboard.type(badgeDesc);

    await pageForm.locator('.CodeMirror-scroll').nth(1).click();
    await this.page.keyboard.type(learningOutcomes);

    await pageForm.locator('.CodeMirror-scroll').nth(2).click();
    await this.page.keyboard.type(criterium);

    await pageForm
      .getByText('(Indicative) EQF/NLQF level')
      .locator('..')
      .locator('.indicator')
      .click();
    await pageForm.getByText(eqfLevel).click();

    await pageForm
      .getByText('Programme Identifiers')
      .locator('..')
      .getByRole('textbox')
      .fill(programIdentifiers);

    await pageForm
      .getByText('Form of participation')
      .locator('..')
      .locator('.indicator')
      .click();
    await pageForm.getByText(formOfParticipation).click();

    await pageForm
      .getByText('Type of assessment')
      .locator('..')
      .locator('.indicator')
      .click();
    await pageForm.getByText(assessment).click();

    await pageForm
      .getByText('Name')
      .nth(2)
      .locator('..')
      .getByRole('textbox')
      .fill(frameworkName);

    await pageForm
      .getByText('Framework', { exact: true })
      .locator('..')
      .getByRole('textbox')
      .fill(frameworkTitle);

    await pageForm
      .getByText('URL')
      .locator('..')
      .getByRole('textbox')
      .nth(1)
      .fill(frameworkURL);

    await pageForm
      .getByText('Code', { exact: true })
      .locator('..')
      .getByRole('textbox')
      .fill(frameworkCode);

    await pageForm.locator('.CodeMirror-scroll').nth(3).click();
    await this.page.keyboard.type(frameworkDesc);

    await this.uploadImage();
  }

  private async fillInBadgeHoursForm(
    badgeHours: string = this.testdata.badgeData.hours,
  ) {
    this.page.getByRole('spinbutton').first().fill(badgeHours);
  }

  async publishBadge() {
    await this.page.getByRole('link', { name: 'Publish' }).click();
    await this.editBadgeButton.waitFor();
  }
  //#endregion
}
