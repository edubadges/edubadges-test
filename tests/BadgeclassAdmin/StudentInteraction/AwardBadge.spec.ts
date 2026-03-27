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




  test(`Send badge directly from ${institution} and check audit trail`, async ({ adminPage, browserName, backpackPage }) => {
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

    //check audit trail
    await adminPage.page.waitForTimeout(2000);
    await adminPage.page.getByRole('banner').locator('#OUTLINED').click();
    await adminPage.page.getByText('DA audit trail').click();
    await adminPage.page.locator('div').filter({ hasText: 'DirectAward audit trail .' }).nth(3).click();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).click();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).fill('Cognitive');
    await expect(
      adminPage.page.getByText('Cognitive Psychology'),
    ).toBeVisible();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).clear()
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).fill('Student19');
    await expect(
      adminPage.page.getByText('student19example@gmail.com'),
    ).toBeVisible();

    //claim badge
    await backpackPage.loginSeperated('student19example@gmail.com');
    await backpackPage.page.getByText(badgeName).click();
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.waitForTimeout(3000);
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click({ force: true })
    await backpackPage.page.waitForTimeout(3000);

    //audit trail should be empty after claiming badge
    await adminPage.page.reload();
    await adminPage.page.waitForTimeout(3000);
    await adminPage.page.getByRole('banner').locator('#OUTLINED').click();
    await adminPage.page.locator('div').filter({ hasText: 'DirectAward audit trail .' }).nth(3).click();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).click();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).fill('Cognitive');
    await expect(
      adminPage.page.getByText('Cognitive Psychology'),
    ).not.toBeVisible();
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).clear()
    await adminPage.page.getByRole('textbox', { name: 'Search...' }).fill('Student19');
    await expect(
      adminPage.page.getByText('student19example@gmail.com'),
    ).not.toBeVisible();


  });



  test(`Send badge directly from ${institution} through mail`, async ({
    adminPage,
    backpackPage,
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


    await backpackPage.loginSeperated('student19example@gmail.com');
    await backpackPage.page.getByText(badgeName).click();
    await backpackPage.page.getByText('Regulation and Integration Issued by Medicine (Medicine) Study load 2.5 ECTS/EC').click();
    await backpackPage.page.getByRole('link', { name: 'Claim & Add to your backpack' }).click();
    await backpackPage.page.getByRole('link', { name: 'I agree' }).click();
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click();
    await backpackPage.page.waitForTimeout(4000);
    await backpackPage.page.locator('.slider').click({ force: true });
    await backpackPage.page.getByRole('link', { name: 'Confirm' }).click()
    await backpackPage.page.getByRole('link', { name: 'Share' }).click();

    // 1. Press button copy link
    await backpackPage.page.getByRole('link', { name: 'Copy the link' }).click();
    // 2. Retrieve the clioboard content
    const clipboardText = await backpackPage.page.evaluate(() => navigator.clipboard.readText());
    console.log('Clipboard Content', clipboardText);

    //3. Navigate only if the link is valid
    if (clipboardText) {
      await backpackPage.page.goto(clipboardText);
      await backpackPage.page.waitForTimeout(4000);

    } else {
      throw new Error('Link "href" attribute is null or missing.');
    }

    await backpackPage.page.getByRole('link', { name: 'Verify' }).click();
    await backpackPage.page.waitForTimeout(4000);
     await expect(
      backpackPage.page.locator('span').filter({ hasText: 'Issued to Petra Penttilä' }).getByRole('strong')
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
    await backpackPage.page.waitForTimeout(4000);
    await backpackPage.reloadPage();
    await backpackPage.page.waitForTimeout(1000);

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
