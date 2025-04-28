import { expect } from '@playwright/test';
import { BaseStaffSubPage } from './baseStaffSubPage';

export class StaffUsersPage extends BaseStaffSubPage {
  async expectUsersPage(){
    await expect(this.page.locator('.expand-menu')).toBeVisible();
    await expect(this.page.url()).toContain('users');
  }
}
