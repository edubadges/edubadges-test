import { expect, test } from '../../../fixtures/staffFixture';
import { institutions } from '../../../util/loginPossibilities';

institutions.forEach((institution) => {
    test(`Deny ${institution} badge without reason from Badgeclasses`, async ({ adminPage, catalogPage }) =>{
      // fail if correct account is missing. SHOULD BE CHANGED
      await test.fail(institution == 'HBO' || institution == 'MBO');
      expect(institution != 'HBO' && institution != 'MBO').toBeTruthy();
    
        // var
        const course = 'Regulation and Integration';
        const studentInfo = await adminPage.getStudentAccount(institution);
        
        // setup
        await catalogPage.searchForClass(course);
        await catalogPage.filterOn(institution);
        await catalogPage.openEduClass(course);
        await catalogPage.requestEdubadge(institution);

        await adminPage.loginTestIdp(institution, 'Badgeclass');

        // test
        await adminPage.badgeClassPage.denyRequest(course, studentInfo.name);

        // validate
        await expect(
            adminPage.page.getByText('The request(s) have been denied')
        ).toBeVisible();
    });
});

test('Deny badge with reason from Badgeclasses', async ({ adminPage, catalogPage }) =>{
    // var
    const course = 'Digestion and Defense';
    const institution = 'WO';
    const reason = 'Legitimate reason to deny the badge';
    const studentInfo = await adminPage.getStudentAccount(institution);
    
    // setup
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.denyRequest(course, studentInfo.name, reason);

    // validate
    await expect(
        adminPage.page.getByText('The request(s) have been denied')
    ).toBeVisible();
});

test('Deny badge with reason from Manage', async ({ adminPage, catalogPage }) =>{
    // var
    const course = 'Cognitive Psychology';
    const institution = 'WO';
    const reason = 'Legitimate reason to deny the badge';
    const studentInfo = await adminPage.getStudentAccount(institution);
    
    // setup
    await test.fail(institution == 'WO');
    await expect(institution != 'WO');
    await catalogPage.searchForClass(course);
    await catalogPage.filterOn(institution);
    await catalogPage.openEduClass(course);
    await catalogPage.requestEdubadge(institution);

    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.goToManage();
    await adminPage.managePage.goToRequested();

    // test
    await adminPage.managePage.requestedBadgesPage.denyRequest(course, studentInfo.name, reason);

    // validate
    await expect(
        adminPage.page.getByText('The request(s) have been denied')
    ).toBeVisible();
});
