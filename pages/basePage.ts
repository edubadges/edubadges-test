import { Locator, Page } from 'playwright/test';
import { Testdata } from '../util/testdata';
import { adminLevel, institution } from '../util/loginPossibilities';
import { AccountsBase, staffDetails } from '../util/accountBase';

export abstract class BasePage {
  public page: Page;
  protected testdata: Testdata;

  constructor(page: Page, testdata: Testdata) {
    this.page = page;
    this.testdata = testdata;
  }

  async reloadPage() {
    await this.page.reload();
  }

  async waitForLoadingToStop() {
    await this.page.locator('.lds-roller').waitFor({ state: 'hidden' });
  }

  /**
   * Handles the possible popup of the terms and conditions page.
   * @param nextLocator a locator that should be visible on the next screen
   */
  async handleTermsAndConditions(nextLocator: Locator) {
    const termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
    await this.waitForLoadingToStop();
    await termsAndConditions.or(nextLocator).waitFor();
    if (await termsAndConditions.isVisible()) {
      await termsAndConditions.click();
    }
    await this.waitForLoadingToStop();
    await nextLocator.waitFor();
  }

  async getStudentAccount(
    institution: institution,
    studentNumber: number = this.testdata.retryCount,
  ) {
    let instititutionAccounts: AccountsBase;

    switch (institution) {
      case 'WO':
        instititutionAccounts = this.testdata.WOAccounts;
        break;
      case 'HBO':
        instititutionAccounts = this.testdata.HBOAccounts;
        break;
      case 'MBO':
        instititutionAccounts = this.testdata.MBOAccounts;
        break;
    }

    return instititutionAccounts.student[studentNumber];
  }

  async getStaffAccount(institution: institution, level: adminLevel) {
    let instititutionAccounts: AccountsBase;

    switch (institution) {
      case 'WO':
        instititutionAccounts = this.testdata.WOAccounts;
        break;
      case 'HBO':
        instititutionAccounts = this.testdata.HBOAccounts;
        break;
      case 'MBO':
        instititutionAccounts = this.testdata.MBOAccounts;
        break;
    }

    let account: staffDetails;
    switch (level) {
      case 'Institution':
        account = instititutionAccounts.institutionAdmin;
        break;
      case 'Issuergroup':
        account = instititutionAccounts.issuerGroupAdmin;
        break;
      case 'Issuer':
        account = instititutionAccounts.issuerAdmin;
        break;
      case 'Badgeclass':
        account = instititutionAccounts.badgeClassAdmin;
        break;
    }

    return account;
  }
}
