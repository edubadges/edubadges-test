import { test as base, expect, APIRequestContext, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { StaffMainPage } from '../pages/staffPages/staffMainPage';
import { BackpackPage } from '../pages/backpackPage';
import { Testdata } from '../util/testdata';
import { institution, adminLevel } from '../util/loginPossibilities';
import { studentDetails } from '../util/accountBase';

type DirectAwardApiSession = {
  staffPage: StaffMainPage;
  studentPage: BackpackPage;
  staffContext: BrowserContext;
  studentContext: BrowserContext;
  staffApiContext: BrowserContext;
  studentApiContext: BrowserContext;
  staffRequest: APIRequestContext;
  studentRequest: APIRequestContext;
  studentAccount: studentDetails;
};

type DirectAwardApiFixture = {
  directAwardApi: DirectAwardApiSession;
  testdata: Testdata;
};

export const test = base.extend<DirectAwardApiFixture>({
  testdata: async ({ }, use, testInfo) => {
    const testdata = new Testdata();
    testdata.testCaseName = testInfo.title;
    testdata.retryCount = 0;
    testdata.browserName = testInfo.project.name;
    await use(testdata);
  },

  directAwardApi: async ({ browser, testdata }, use) => {
    // Use a fixed institution + student for deterministic, seeded-data tests.
    const institutionToTest: institution = 'WO';
    const staffLevel: adminLevel = 'Badgeclass';
    const studentIndex = 0;

    // Staff session (needed for create/revoke/delete/audittrail permissions + badgeclass GraphQL).
    const staffContext = await browser.newContext();
    const staffPageImpl = await staffContext.newPage();
    const staffHomePage = new HomePage(staffPageImpl, testdata);
    await staffHomePage.navigateToHomePage();
    await staffHomePage.openIssuerPortal();

    const staffPage = new StaffMainPage(staffPageImpl, testdata);
    await staffPage.loginTestIdp(institutionToTest, staffLevel);
    await staffPage.validateLoginSuccessful();

    // Student session (needed for accept + terms acceptance).
    const studentContext = await browser.newContext();
    const studentPageImpl = await studentContext.newPage();
    const studentHomePage = new HomePage(studentPageImpl, testdata);
    await studentHomePage.navigateToHomePage();
    await studentHomePage.openBackpack();

    const studentPage = new BackpackPage(studentPageImpl, testdata);
    await studentPage.login(institutionToTest, studentIndex);

    // Get storage state after login and create new contexts with authenticated state
    const staffStorageState = await staffContext.storageState();
    const studentStorageState = await studentContext.storageState();

    // Create new contexts with the authenticated storage state
    const staffApiContext = await browser.newContext({ storageState: staffStorageState });
    const studentApiContext = await browser.newContext({ storageState: studentStorageState });

    const staffRequest = staffApiContext.request;
    const studentRequest = studentApiContext.request;

    await use({
      staffPage,
      studentPage,
      staffContext,
      studentContext,
      staffApiContext,
      studentApiContext,
      staffRequest,
      studentRequest,
      studentAccount: testdata.WOAccounts.student[studentIndex],
    });

    await staffContext.close();
    await studentContext.close();
    await staffApiContext.close();
    await studentApiContext.close();
  },
});

export { expect };
