import test, { expect } from '@playwright/test';
import { BaseStaffSubPage } from './baseStaffSubPage';
import path from 'path';
import { IssuerGroupSubPage } from './staffManageSubPage/issuerGroupsSubPage';
import { IssuersSubPage } from './staffManageSubPage/issuersSubPage';
import { UserManagementSubPage } from './staffManageSubPage/userManagementSubPage';
import { RequestedEdubadgesSubPage } from './staffManageSubPage/requestedEdubadgesSubPage';
import { UnclaimedDirectAwardsSubPage } from './staffManageSubPage/unclaimedDirectAwardsSubPage';
import { DeletedDirectAwardsSubPage } from './staffManageSubPage/deletedDirectAwardsSubPage';

export class StaffManagePage extends BaseStaffSubPage {
  // TODO: implement funcitons like directReward & revoke

    async openIssuerGroup(name: string) {
      await this.page.getByRole('cell', { name: name }).click();
      await expect(
        this.page.getByRole('link', { name: 'Add new badge class' }),
      ).toBeVisible();
    }
    async clickNewBadgeClass() {
      await this.page.getByRole('link', { name: 'Add new badge class' }).click();
    }

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
    this.page.waitForTimeout(500);
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

    //#region create badge
  
    async clickMicroCredential() {
      await this.page
        .getByText('Microcredential A badge class')
        .getByRole('link', { name: 'Create' })
        .click();
    }

    async clickRegularBadge() {
      await this.page
        .getByText('Regular A badge class for')
        .getByRole('link', { name: 'Create' })
        .click();
    }
  
    async clickExtraCurricularEduBadge() {
      await this.page
        .getByText('Extra curricular A badge')
        .getByRole('link', { name: 'Create' })
        .click();
    }
  
    async fillInMicrocredentialForm() {
      await this.fillInBadgeForm();
    }
  
    async fillInRegularForm() {
      await this.fillInBadgeForm();
    }
  
    async fillInExtraCurricularForm() {
      await this.fillInBadgeForm();
    }
  
    async fillInMBOExtraCurricularForm() {
      await this.fillInBadgeForm();
      await this.fillInBadgeHoursForm();
    }
  
    private async fillInBadgeForm() {
      await this.page
        .getByPlaceholder('(Required field) e.g.')
        .fill(this.testdata.badgeData.title);
  
      await this.page.locator('.CodeMirror-scroll').first().click();
      await this.page.keyboard.type(this.testdata.badgeData.description);
  
      await this.page.locator('.CodeMirror-scroll').nth(1).click();
      await this.page.keyboard.type(this.testdata.badgeData.learningOutcomes);
  
      await this.page.locator('.CodeMirror-scroll').nth(2).click();
      await this.page.keyboard.type(this.testdata.badgeData.criteria);
  
      await this.page.getByPlaceholder('Please select...').first().click();
      await this.page.getByText(this.testdata.badgeData.eqfLevel).click();
  
      await this.page
        .getByPlaceholder('e.g. 12111990')
        .first()
        .fill(this.testdata.badgeData.programIdentifiers);
  
      await this.page.getByPlaceholder('Please select...').first().click();
      await this.page
        .getByText(this.testdata.badgeData.formOfParticipation)
        .click();
  
      await this.page.getByPlaceholder('Please select...').click();
      await this.page.getByText(this.testdata.badgeData.assessment).click();
  
      await this.page
        .getByPlaceholder('e.g. history')
        .fill(this.testdata.badgeData.frameworkName);
  
      await this.page
        .getByPlaceholder('e.g. ESCO')
        .fill(this.testdata.badgeData.frameworkFramework);
  
      await this.page
        .getByPlaceholder('e.g. http://data.europa.eu/')
        .fill(this.testdata.badgeData.frameworkUrl);
      await this.page
        .getByPlaceholder('e.g. 2b22f3b1-5de4-43f9-b6d1-')
        .fill(this.testdata.badgeData.frameworkCode);
  
      await this.page.locator('.CodeMirror-scroll').nth(3).click();
      await this.page.keyboard.type(this.testdata.badgeData.frameworkDescription);
  
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.page.getByText('Upload image').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname + '/images/', 'edubadge.png'),
      );
    }
  
    private async fillInBadgeHoursForm() {
      await this.page
        .getByPlaceholder('e.g. 24')
        .fill(this.testdata.badgeData.hours);
    }
  
    async publishBadge() {
      await this.page.getByRole('link', { name: 'Publish' }).click();
      await this.page.waitForTimeout(6000);
    }
    //#endregion
}