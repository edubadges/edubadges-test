import { expect } from '@playwright/test';
import { BaseStaffSubPage } from './baseStaffSubPage';

export class StaffBadgeClassesPage extends BaseStaffSubPage {
  // Locators
  private readonly awardEdubadgeLink = this.page.getByRole('link', {
    name: 'Award edubadge(s)',
  });
  private readonly awardButton = this.page.getByRole('link', { name: 'Award' });
  private readonly openRequestsLink = this.page.getByRole('link', {
    name: 'Open requests',
  });
  private readonly inBackpackLink = this.page.getByRole('link', {
    name: 'In backpack',
  });
  private readonly contentLocator = this.page.locator('.content');
  private readonly optionsLocator = this.page.locator('.options');
  private readonly mailOnlyCheckbox = this.page
    .getByText('Enable awarding based on private email')
    .locator('..')
    .locator('.checkmarked');

  async expectBadgeclassesPage() {
    await expect(this.page.locator('.expand-menu')).toBeVisible();
    await expect(this.page.getByText('Filter badge classes')).toBeVisible();
  }
  /**
   * Direct award a badge to a student. Omit EPPN to award through private mail.
   */
  async directAwardBadge(
    badgeName: string,
    studentEmail: string,
    studentEPPN?: string,
  ) {
    await this.searchWithText(badgeName);
    await this.openBadge(badgeName);
    await this.sendDirectBadge(studentEmail, studentEPPN);
    await this.page.getByText('Direct awards have been sent').waitFor();
  }

  private async sendDirectBadge(studentEmail: string, studentEPPN?: string) {
    await this.awardEdubadgeLink.click();
    await this.page.getByRole('textbox').first().fill(studentEmail);

    if (studentEPPN) {
      await this.page.getByRole('textbox').nth(1).fill(studentEPPN);
    } else {
      await this.mailOnlyCheckbox.click();
    }

    await this.awardButton.click();
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
   */
  async approveRequest(badgeName: string, studentName: string) {
    await this.searchWithText(badgeName);
    await this.openBadge(badgeName);
    await this.openRequests();
    await this.selectTableRow(studentName);
    await this.page.getByRole('link', { name: 'Award', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.optionsLocator.getByRole('link', { name: 'Award' }).click();
    await this.page.getByText('The request(s) have been awarded.').waitFor();
  }

  async denyRequest(badgeName: string, studentName: string, reason?: string) {
    await this.searchWithText(badgeName);
    await this.openBadge(badgeName);
    await this.openRequests();
    await this.selectTableRow(studentName);
    await this.page
      .getByRole('link', { name: 'Deny request', exact: true })
      .click();
    await this.page.waitForTimeout(500);

    if (reason) {
      await this.page.locator('input#revocation-reason').fill(reason);
    }

    await this.optionsLocator.getByRole('link', { name: 'Confirm' }).click();
    await this.page.getByText('The request(s) have been denied.').waitFor();
  }

  async revokeAwardedBadge(
    studentName: string,
    reason: string,
    courseName?: string,
  ) {
    if (courseName) {
      await this.searchWithText(courseName);
      await this.openBadge(courseName);
    }
    await this.openInBackpack();
    await this.selectTableRow(studentName);
    await this.page
      .getByRole('link', { name: 'Revoke edubadge', exact: true })
      .click();
    await this.page.locator('input#revocation-reason').fill(reason);
    await this.optionsLocator.getByRole('link', { name: 'Confirm' }).click();
    await this.page.getByText('The edubadge(s) have been revoked.').waitFor();
  }

  public async goToAdminView() {
    await this.page.getByText('Go to admin view').click();
    await this.waitForLoadingToStop();
  }

  private async openRequests() {
    await this.openRequestsLink.click();
  }

  private async openInBackpack() {
    await this.inBackpackLink.click();
  }

  private async selectTableRow(studentName: string) {
    await this.page
      .getByText(studentName)
      .locator('../../..')
      .locator('.checkmarked')
      .click();
  }
}
