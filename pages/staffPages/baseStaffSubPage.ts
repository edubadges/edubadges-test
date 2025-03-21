import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

/**
 * NOTE: this is the superclass for a logged in staffmember.
 * To use needed functionalities, import the inherited staff{functionality}Page pages
 */
export class BaseStaffSubPage extends BasePage {

  async switchToDutch() {
    await this.page.getByRole('link', { name: 'NL' }).click();
  }

  async searchWithText(TextToSearch: string){
    await this.page.getByPlaceholder('Search...').fill(TextToSearch);
  }
  
  async expectLoggedIn(){
    await expect(this.page.locator('.expand-menu')).toBeVisible();
  }
}