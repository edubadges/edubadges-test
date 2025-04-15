import { AccountsBase } from '../../util/accountBase';
import { institution } from '../../util/loginPossibilities';
import { BaseStaffSubPage } from './baseStaffSubPage';

export class StaffBadgeClassesPage extends BaseStaffSubPage {
  // Action locators
  private readonly awardEdubadgeLink = this.page.getByRole('link', {
    name: 'Award edubadge(s)',
  });
  private readonly awardLink = this.page.getByRole('link', { name: 'Award' });
  private readonly openRequestsLink = this.page.getByRole('link', {
    name: 'Open requests',
  });
  private readonly contentLocator = this.page.locator('.content');
  private readonly optionsLocator = this.page.locator('.options');

  async directAwardBadgeToStudent(
    courseName: string,
    studentEmail: string = this.testdata.accounts.studentEmail,
    studentNumber: string = this.testdata.accounts.studentEPPN,
  ) {
    await this.searchWithText(courseName);
    await this.openBadge(courseName);
    await this.sendDirectBadge(studentEmail, studentNumber);
    await this.page.getByText('Direct awards have been sent').waitFor();
  }

  private async sendDirectBadge(studentEmail: string, studentNumber: string) {
    await this.awardEdubadgeLink.click();
    await this.page.getByRole('textbox').first().fill(studentEmail);
    await this.page.getByRole('textbox').nth(1).fill(studentNumber);
    await this.awardLink.click();
  }

  /**
   * Opens a badge by name if it is currently on screen.
   */
  async openBadge(badgeName: string) {
    await this.contentLocator.getByText(badgeName).click();
    await this.waitForLoadingToStop();
  }

  /**
   * Approves a badge request for a student.
   * Defaults to Petra Pentila if no student name is provided.
   */
  async approveRequest(
    courseName: string,
    institution: institution,
    studentNumber: number = 0,
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

    const studentAccount = instititutionAccounts.student[studentNumber];

    await this.searchWithText(courseName);
    await this.openBadge(courseName);
    await this.openRequests();
    await this.selectRequest(studentAccount.name);
    await this.page.getByRole('link', { name: 'Award', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.optionsLocator.getByRole('link', { name: 'Award' }).click();
    await this.page.getByText('The request(s) have been awarded.').waitFor();
  }

  private async openRequests() {
    await this.openRequestsLink.click();
  }

  private async selectRequest(studentName: string) {
    await this.page
      .getByText(studentName)
      .locator('../../..')
      .locator('.checkmarked')
      .click();
  }
}
