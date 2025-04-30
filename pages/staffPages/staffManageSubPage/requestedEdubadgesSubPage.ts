import { BaseStaffSubPage } from '../baseStaffSubPage';

export class RequestedEdubadgesSubPage extends BaseStaffSubPage {
  private readonly optionsLocator = this.page.locator('.options');
  
  /**
   * Approves a badge request for a student.
   */
  async approveRequest(courseName: string, studentName: string) {
    await this.searchWithText(studentName);
    await this.selectRequest(courseName);
    await this.page.getByRole('link', { name: 'Award', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.optionsLocator.getByRole('link', { name: 'Award' }).click();
    await this.page.getByText('The request(s) have been awarded.').waitFor();
  }

  async denyRequest(courseName: string, studentName: string, reason?: string) {
    await this.searchWithText(studentName);
    await this.selectRequest(courseName);
    await this.page.getByRole('link', { name: 'Deny request', exact: true }).click();
    await this.page.waitForTimeout(500);

    if(reason){
      await this.page.locator('input#revocation-reason').fill(reason);
    }

    await this.optionsLocator.getByRole('link', { name: 'Confirm' }).click();
    await this.page.getByText('The request(s) have been denied.').waitFor();
  }


  private async selectRequest(courseName: string) {
    await this.page
      .getByText(courseName)
      .locator('../../..')
      .locator('.checkmarked')
      .click();
  }
}
