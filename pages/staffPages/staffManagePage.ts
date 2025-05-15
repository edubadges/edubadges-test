import { BaseStaffSubPage } from './baseStaffSubPage';
import { IssuerGroupSubPage } from './staffManageSubPage/issuerGroupsSubPage';
import { IssuersSubPage } from './staffManageSubPage/issuersSubPage';
import { UserManagement } from './staffManageSubPage/userManagement';
import { RequestedEdubadgesSubPage } from './staffManageSubPage/requestedEdubadgesSubPage';
import { UnclaimedDirectAwardsSubPage } from './staffManageSubPage/unclaimedDirectAwardsSubPage';
import { DeletedDirectAwardsSubPage } from './staffManageSubPage/deletedDirectAwardsSubPage';
import { expect } from '@playwright/test';

export class StaffManagePage extends BaseStaffSubPage {
  // Navigation locators
  private readonly issuerGroupsLink = this.page.getByRole('link', {
    name: 'Issuer groups',
  });
  private readonly issuersLink = this.page.getByRole('link', {
    name: 'Issuers',
  });
  private readonly userManagementLink = this.page.getByRole('link', {
    name: 'User management',
  });
  private readonly requestedEdubadgesLink = this.page.getByRole('link', {
    name: 'Requested edubadges',
  });
  private readonly unclaimedDirectAwardsLink = this.page.getByRole('link', {
    name: 'Unclaimed direct awards',
  });
  private readonly deletedDirectAwardsLink = this.page.getByRole('link', {
    name: 'Requested edubadges',
  });

  // Page instances
  readonly issuerGroupPage = new IssuerGroupSubPage(this.page, this.testdata);
  readonly issuersPage = new IssuersSubPage(this.page, this.testdata);
  readonly requestedBadgesPage = new RequestedEdubadgesSubPage(
    this.page,
    this.testdata,
  );
  readonly unclaimedAwardsPage = new UnclaimedDirectAwardsSubPage(
    this.page,
    this.testdata,
  );
  readonly deletedAwardsPage = new DeletedDirectAwardsSubPage(
    this.page,
    this.testdata,
  );
  readonly userManagement = new UserManagement(this.page, this.testdata);

  async expectManagePage() {
    await expect(this.page.locator('.expand-menu')).toBeVisible();
    await expect(this.page.url()).toContain('manage');
  }

  // Navigation methods
  async goToIssuerGroups() {
    await this.issuerGroupsLink.click();
    await this.page.locator('.header').getByText('Issuer groups').waitFor();
  }

  async goToIssuers() {
    await this.issuersLink.click();
    await this.page.locator('.header').getByText('Issuers').waitFor();
  }

  async goToUserManagement() {
    await this.userManagementLink.click();
    await this.page.getByText('Users with permissions').waitFor();
  }

  async goToRequested() {
    await this.requestedEdubadgesLink.click();
    await this.page.getByText('Persons with open edubadge requests').waitFor();
  }

  async goToUnclaimed() {
    await this.unclaimedDirectAwardsLink.click();
    await this.page.getByText('Filter direct awards').waitFor();
  }

  async goToDeleted() {
    await this.deletedDirectAwardsLink.click();
    await this.page.getByText('Filter direct awards').waitFor();
  }
}
