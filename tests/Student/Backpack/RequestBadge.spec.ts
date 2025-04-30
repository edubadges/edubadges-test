import { expect, test } from '../../../fixtures/studentFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
    test(`Can be denied a ${institution} badge`, async ({
      catalogPage,
      backpackPage,
      adminPage,
    }) => {
      // var
      const badgeName = 'Need extra badge name';
      await test.fail(badgeName == 'Need extra badge name');
      expect(badgeName != 'Need extra badge name').toBeTruthy();

      const studentAccount = await backpackPage.getStudentAccount(institution);
      const badgeLocator = backpackPage.page
        .getByText(badgeName)
        .locator('../../..');
  
      //setup
      await catalogPage.searchForClass(badgeName);
      await catalogPage.filterOn(institution);
      await catalogPage.openEduClass(badgeName);
      await catalogPage.requestEdubadge(institution);
      
      await backpackPage.login(institution);
      await adminPage.loginTestIdp(institution, 'Badgeclass');
  
      // test
      await adminPage.goToBadgeClasses();
      await adminPage.badgeClassPage.denyRequest(badgeName, studentAccount.name);

      await backpackPage.reloadPage();
      await backpackPage.openBadgeRequests();
      await expect(badgeLocator.locator('.status-indicator.denied')).toBeVisible();
    });

    test(`receive a requested ${institution} badge`, async ({
      catalogPage,
      backpackPage,
      adminPage,
    }) => {
      // var
      const badgeName = 'Need extra badge name';
      await test.fail(badgeName == 'Need extra badge name');
      expect(badgeName != 'Need extra badge name').toBeTruthy();
      
      const studentAccount = await backpackPage.getStudentAccount(institution);
      const badgeLocator = backpackPage.page
        .getByText(badgeName)
        .locator('../../..');
  
      //setup
      await catalogPage.searchForClass(badgeName);
      await catalogPage.filterOn(institution);
      await catalogPage.openEduClass(badgeName);
      await catalogPage.requestEdubadge(institution);
      
      await backpackPage.login(institution);
      await adminPage.loginTestIdp(institution, 'Badgeclass');
  
      // test
      await adminPage.goToBadgeClasses();
      await adminPage.badgeClassPage.approveRequest(badgeName, studentAccount.name);
      await backpackPage.reloadPage();
      await backpackPage.openBackpack();
      await expect(badgeLocator.locator('.status-indicator.new')).toBeVisible();
  });
});
