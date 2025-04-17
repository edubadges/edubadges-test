import { expect } from '@playwright/test';
import { BasePage } from '../basePage';

/**
 * NOTE: this is the superclass for a logged in staffmember.
 * To use needed functionalities, import the inherited staff{functionality}Page pages
 */
export class BaseStaffSubPage extends BasePage {
  private readonly dutchLink = this.page.getByRole('link', { name: 'NL' });
  private readonly searchField = this.page.getByPlaceholder('Search...');

  async switchToDutch() {
    await this.dutchLink.click();
  }

  async searchWithText(textToSearch: string) {
    await this.searchField.fill(textToSearch);
  }
}
