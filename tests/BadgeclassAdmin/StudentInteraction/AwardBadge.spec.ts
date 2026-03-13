import { expect, test } from '../../../fixtures/staffFixture';
import { BackpackPage } from '../../../pages/backpackPage';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';
// Import the backpackPage fixture if available



institutionsWithoutHBO.forEach((institution) => {
  test(`Award requested badge from ${institution}`, async ({
    catalogPage,
    adminPage,
    browserName
  }) => {
    test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    // var
    const badgeName = 'Growth and Development';
    const studentInfo = await adminPage.getStudentAccount(institution);



    // setup
    await adminPage.page.waitForTimeout(2000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.page.waitForTimeout(1000);
    
    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadgeExpiry(badgeName);
    
    await catalogPage.requestEdubadge(institution);
  


    // test
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been awarded.'),
    ).toBeVisible();
  });

  


  test(`Send badge directly from ${institution}`, async ({ adminPage, browserName }) => {
    test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();

    // var
    await adminPage.page.waitForTimeout(4000);
    const badgeName = 'Cognitive Psychology';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.page.waitForTimeout(8000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentInfo.email,
      studentInfo.EPPN,
    );

    // validate
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });

  test(`Send badge directly from ${institution} through mail`, async ({
    adminPage,
    browserName,
  }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();


    // var
    const badgeName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.page.waitForTimeout(4000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadgeEmail(
      badgeName,
      studentInfo.email,
    );

    // validate 
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });



  test(`Award requested badge from ${institution} with expiration date`, async ({

    adminPage,
    browserName,
    backpackPage,
  }) => {
   test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();

    

    // var
    const badgeName = 'Circulation and Breathing';

    // setup and set expiry date
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    
    await adminPage.setExpireDate(badgeName);
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      'student20example@gmail.com',
      'student20@university-example.org',
    );

    //test and claim badge
    await backpackPage.loginSeperated('student20example@gmail.com');
    await backpackPage.page.getByText(badgeName).click();
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.getByRole('link', { name: 'I agree' }).click();
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();


    //validate expire date Jan 25, 2026 format
    const today = new Date();
    today.setDate(today.getDate() + 1);
 
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' } as const;
    const tomorrowFormattedDate = today.toLocaleDateString('en-US', dateOptions);
    console.log(tomorrowFormattedDate);
     await expect(
       backpackPage.page.getByText(tomorrowFormattedDate),
     ).toBeVisible();

    
  });

});
