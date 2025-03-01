import { expect, Page } from '@playwright/test';
import { Testdata } from '../../util/testdata';
import { BasePage } from '../basePage';
import path from 'path';

export class IssuerPortalPageManage extends BasePage {
  constructor(page: Page, testdata: Testdata) {
    super(page, testdata);
  }

  async searchForBadgeClass(badgeClassName: string) {
    await this.page.getByPlaceholder('Search...').fill(badgeClassName);
  }

  async openBadgeClassWithName(name: string) {
    await this.page.getByRole('cell', { name: name }).click();
    await expect(
      this.page.getByRole('link', { name: 'Add new badge class' }),
    ).toBeVisible();
  }

  async createNewBadgeClass() {
    await this.page.getByRole('link', { name: 'Add new badge class' }).click();
    await expect(this.page).toHaveScreenshot('PopupEduBadgeTypes.png', {
      fullPage: true,
    });
  }

  async createNewMicroCredential() {
    await this.page
      .getByText('Microcredential A badge class')
      .getByRole('link', { name: 'Create' })
      .click();
  }

  async createRegularEduBadge() {
    await this.page
      .getByText('Regular A badge class for')
      .getByRole('link', { name: 'Create' })
      .click();
  }

  async createExtraCurricularEduBadge() {
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

  private async fillInBadgeForm() {
    await this.page
      .getByPlaceholder('(Required field) e.g.')
      .fill(this.testdata.badgeData.title);

    await this.page.locator('.CodeMirror-scroll').first().click();
    await this.page.keyboard.type(this.testdata.badgeData.description);

    await this.page.locator('.CodeMirror-scroll').nth(1).click();
    await this.page.keyboard.type(this.testdata.badgeData.learningOutcomes);

    await this.page.locator('.CodeMirror-scroll').nth(2).click();
    await this.page.keyboard.type(this.testdata.badgeData.criteria);

    await this.page.getByPlaceholder('Please select...').first().click();
    await this.page.getByText(this.testdata.badgeData.eqfLevel).click();

    await this.page
      .getByPlaceholder('e.g. 12111990')
      .first()
      .fill(this.testdata.badgeData.programIdentifiers);

    await this.page.getByPlaceholder('Please select...').first().click();
    await this.page
      .getByText(this.testdata.badgeData.formOfParticipation)
      .click();

    await this.page.getByPlaceholder('Please select...').click();
    await this.page.getByText(this.testdata.badgeData.assessment).click();

    await this.page
      .getByPlaceholder('e.g. history')
      .fill(this.testdata.badgeData.frameworkName);

    await this.page
      .getByPlaceholder('e.g. ESCO')
      .fill(this.testdata.badgeData.frameworkFramework);

    await this.page
      .getByPlaceholder('e.g. http://data.europa.eu/')
      .fill(this.testdata.badgeData.frameworkUrl);
    await this.page
      .getByPlaceholder('e.g. 2b22f3b1-5de4-43f9-b6d1-')
      .fill(this.testdata.badgeData.frameworkCode);

    await this.page.locator('.CodeMirror-scroll').nth(3).click();
    await this.page.keyboard.type(this.testdata.badgeData.frameworkDescription);

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.getByText('Upload image').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(__dirname + '/images/', 'edubadge.png'),
    );
  }

  private async fillInBadgeHoursForm() {
    await this.page
      .getByPlaceholder('e.g. 24')
      .fill(this.testdata.badgeData.hours);
  }

  async publishBadge() {
    await this.page.getByRole('link', { name: 'Publish' }).click();
  }
}
