import { BaseStaffSubPage } from './baseStaffSubPage';
import { IssuerGroupSubPage } from './staffManageSubPage/issuerGroupsSubPage';
import { IssuersSubPage } from './staffManageSubPage/issuersSubPage';
import { UserManagementSubPage } from './staffManageSubPage/userManagementSubPage';
import { RequestedEdubadgesSubPage } from './staffManageSubPage/requestedEdubadgesSubPage';
import { UnclaimedDirectAwardsSubPage } from './staffManageSubPage/unclaimedDirectAwardsSubPage';
import { DeletedDirectAwardsSubPage } from './staffManageSubPage/deletedDirectAwardsSubPage';

export class StaffManagePage extends BaseStaffSubPage {
  // TODO: implement funcitons like directReward & revoke

    issuerGroupPage = new IssuerGroupSubPage(this.page, this.testdata);
    issuersPage = new IssuersSubPage(this.page, this.testdata);
    userManagePage = new UserManagementSubPage(this.page, this.testdata);
    requestedBadgesPage = new RequestedEdubadgesSubPage(this.page, this.testdata);
    unclaimedAwardsPage = new UnclaimedDirectAwardsSubPage(this.page, this.testdata);
    deletedAwardsPage = new DeletedDirectAwardsSubPage(this.page, this.testdata);
    
  /** Clicks the according checkbox once. 
   * Finds the tr by finding the courseName and selecting the parent's parent.
   * Finds the checkbox by searching within the tr
   */
  private async selectRequest(courseName: string, studentName: string
  ){
    this.searchWithText(studentName);
    await this.page.getByRole('link', { name: courseName })
          .locator('../..')
          .getByRole('checkbox')
          .click();
  }
  async approveRequest(courseName: string,
    studentName: string = this.testdata.accounts.studentName,
  ){
    this.selectRequest(courseName, studentName);
    this.page.getByRole('link', { name: 'Award' }).click();
    this.page.locator('.options')
      .getByRole('link', { name: 'Award' })
      .click();
  }

    //#region subcategories
    async goToIssuerGroups(){
      await this.page.getByRole('link', { name: 'Issuer groups' }).click();
      await this.page.getByText('Add new issuer group').waitFor();
    }
    async goToIssuers(){
      await this.page.getByRole('link', { name: 'Issuers' }).click();
      await this.page.getByText('Add new issuer').waitFor();
    }
    async goToUserManagement(){
      await this.page.getByRole('link', { name: 'User management' }).click();
      await this.page.getByText('Users with permissions').waitFor();
    }
    async goToRequested(){
      await this.page.getByRole('link', { name: 'Requested edubadges' }).click();
      await this.page.getByText('Persons with open edubadge requests').waitFor();
    }
    async goToUnclaimed(){
      await this.page.getByRole('link', { name: 'Unclaimed direct awards' }).click();
      await this.page.getByText('Filter direct awards').waitFor();
    }
    async goToDeleted(){
      await this.page.getByRole('link', { name: 'Requested edubadges' }).click();
      await this.page.getByText('Filter direct awards').waitFor();
    }
    //#endregion
}