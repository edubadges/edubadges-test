import { expect } from '@playwright/test';
import { BaseStaffSubPage } from './baseStaffSubPage';

export class staffBadgeClassesPage extends BaseStaffSubPage {
  // TODO: implement funcitons like awardRequestedbadge

  async directAwardBadgeToStudent(courseName: string,
    studentEmail: string = this.testdata.accounts.studentEmail,
    studentNumber: string = this.testdata.accounts.studentEPPN,){
    await this.searchWithText(courseName);
    await this.openBadge(courseName);
    await this.sendDirectBadge(studentEmail, studentNumber,
    );
  }
  
  private async sendDirectBadge(studentEmail: string, studentNumber: string) {
    await this.page.getByRole('link', { name: 'Award edubadge(s)' }).click();
    await this.page.getByRole('textbox').first().fill(studentEmail);
    await this.page.getByRole('textbox').nth(1).fill(studentNumber);
    await this.page.getByRole('link', { name: 'Award' }).click();
  }

  /**Opens a badge by name if it is currently on screen. */
  async openBadge(badgeName: string){
    await this.page.locator('.content')
      .getByText(badgeName)
      .click();
  }

  /**Defaults to Petra Pentila */
  async approveRequest(courseName: string,
    studentName: string = this.testdata.accounts.studentName,)
    {
    await this.searchWithText(courseName);
    await this.openBadge(courseName);
    await this.openRequests();
    await this.selectRequest(studentName);
    await this.page.getByRole('link', { name: 'Award', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.page.locator('.options')
      .getByRole('link', { name: 'Award' })
      .click();
    await this.page.getByText('The request(s) have been awarded.').waitFor();

  }
  
  private async openRequests(){
    await this.page.getByRole('link', { name: 'Open requests'}).click()
  }

  private async selectRequest(studentName: string)
  {
    //await this.searchWithText(studentName);
    await this.page.getByText(studentName)
          .locator('../../..')
          .locator('.checkmarked')
          .click();
  }
}