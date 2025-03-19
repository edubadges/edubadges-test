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

  //#region Go to categories
  async goToBadgeClasses (){
    await this.page.getByRole('link', { name: 'Badge classes' }).click();
    await this.waitForLoadingToStop();
  }

  async goToManage (){
    await this.page.getByRole('link', { name: 'Manage' }).click();
    await this.waitForLoadingToStop();
  }

  async goToUsers (){
    await this.page.getByRole('link', { name: 'Users' }).click();
    await this.waitForLoadingToStop();
  }

  async goToCatalog (){
    await this.page.getByRole('link', { name: 'Catalog' }).click();
    await this.waitForLoadingToStop();
  }

  async goToInsights (){
    await this.page.getByRole('link', { name: 'Insights' }).click();
    await this.waitForLoadingToStop();
  }
  //#endregion

  async searchWithText(TextToSearch: string){
    await this.page.getByPlaceholder('Search...').fill(TextToSearch);
  }
  
  async expectLoggedIn(){
    await expect(this.page.locator('.expand-menu')).toBeVisible();
  }
}