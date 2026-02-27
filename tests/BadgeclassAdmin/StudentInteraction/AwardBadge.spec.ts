import { expect, test } from '../../../fixtures/staffFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

institutionsWithoutHBO.forEach((institution) => {
  test(`Award requested badge from ${institution}`, async ({
    catalogPage,
    adminPage,
  }) => {
    // var
    const badgeName = 'Growth and Development';
    const studentInfo = await adminPage.getStudentAccount(institution);



    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.page.waitForTimeout(5000);
    
    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.openBadge(badgeName);
    
    await catalogPage.requestEdubadge(institution);
  


    // test
    await adminPage.badgeClassPage.approveRequest(badgeName, studentInfo.name);

    // validate
    await expect(
      adminPage.page.getByText('The request(s) have been awarded.'),
    ).toBeVisible();
  });

  


  test(`Send badge directly from ${institution}`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();

    // var
    const badgeName = 'Cognitive Psychology';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
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
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();
    test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');

    // var
    const badgeName = 'Regulation and Integration';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup
    await adminPage.loginTestIdp(institution, 'Badgeclass');

    // test
    await adminPage.badgeClassPage.directAwardBadge(
      badgeName,
      studentInfo.email,
    );

    // validate 
    await expect(
      adminPage.page.getByText('Direct awards have been sent'),
    ).toBeVisible();
  });



  test(`Award requested badge from ${institution} with expiration date`, async ({
    catalogPage,
    adminPage,
    browserName
  }) => {
   test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    await test.fail(institution == 'MBO');
    expect(institution != 'MBO').toBeTruthy();


    // var
    const badgeName = 'Digestion and Defense';
    const studentInfo = await adminPage.getStudentAccount(institution);

    // setup and set expiry date
    await adminPage.page.waitForTimeout(8000);
    await adminPage.loginTestIdp(institution, 'Badgeclass');
    await adminPage.page.waitForTimeout(2000);
    
    await catalogPage.searchWithText(badgeName);
    await catalogPage.filterOn(institution);
    await catalogPage.page.waitForTimeout(2000);
    
    await adminPage.setExpireDate(badgeName);
    await catalogPage.openBadge(badgeName);
    
    await catalogPage.requestEdubadge(institution);

    
    // test
    await adminPage.badgeClassPage.approveRequestWithExpireDate(badgeName, studentInfo.name);
    
    //validate catalogus page
    await catalogPage.page.waitForTimeout(8000);
    await catalogPage.page.reload();
    await catalogPage.page.getByRole('link', { name: 'My backpack' }).click();
    await catalogPage.page.waitForTimeout(1000);
    await catalogPage.page.getByText('Digestion and Defense', { exact: true }).click()
    await expect(
       catalogPage.page.getByText('Expires'),
     ).toBeVisible();

    //expire datum Jan 25, 2026 datum format
    const today = new Date();
    today.setDate(today.getDate() + 1);
 
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' } as const;
    const tomorrowFormattedDate = today.toLocaleDateString('en-US', dateOptions);
    console.log(tomorrowFormattedDate);
     await expect(
       catalogPage.page.getByText(tomorrowFormattedDate),
     ).toBeVisible();

    
  });

});
