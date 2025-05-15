import { expect } from '@playwright/test';
import { BaseStaffSubPage } from './baseStaffSubPage';

export class StaffInsightsPage extends BaseStaffSubPage {
  async expectInsightsPage() {
    await expect(this.page.locator('.expand-menu')).toBeVisible();
    await expect(this.page.url()).toContain('insights');
  }
}
