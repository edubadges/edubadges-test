![Edubadges](logo.png)
# [edubadges-test](#edubages-test)

This repository contains the test suite for the EduBadges platform. Its primary purpose is to validate complete user stories, ensuring that the most important features function as expected.

Please note that this repository includes only the test scripts and the configuration templates required for testing.

## Requirements

To execute the tests the following is required:

* NodeJS installed (version 22.12.x is validated to work) and can be downloaded from https://nodejs.org/en


## Setup

After cloning this repository, follow these steps to retrieve the required packages:

```bash
   npm install
   npx playwright install
```

## Runing tests locally

Playwright supports an ui mode. This provides a fancy environment in which you can select a test to be run, check the test execution and retrieve locators. This environment is started by:

```bash
   npx playwright test --ui
```

If you want to run all the test:

```bash
   npx playwright test
```

The test results are generated in the folder test-results

## Configuration

This project makes use of an .env file for storing url's, usernames and passwords. This file should contain the following info:

```bash
   INSTUTUTION_ADMIN_USERNAME=[value]
   INSTUTUTION_ADMIN_PASSWORD=[value]
   ISSUER_GROUP_ADMIN_USERNAME=[value]
   ISSUER_GROUP_ADMIN_PASSWORD=[value]
   ISSUER_GROUP_ADMIN_ISSUERGROUP=[value]
   BADGE_CLASS_ADMIN_HBO_USERNAME=[value]
   BADGE_CLASS_ADMIN_HBO_PASSWORD=[value]
   BADGE_CLASS_ADMIN_MBO_USERNAME=[value]
   BADGE_CLASS_ADMIN_MBO_PASSWORD=[value]
   BADGE_CLASS_ADMIN_USERNAME=[value]
   BADGE_CLASS_ADMIN_PASSWORD=[value]
   ISSUER_ADMIN_USERNAME=[value]
   ISSUER_ADMIN_PASSWORD=[value]
   STUDENT_USERNAME=[value]
   STUDENT_PASSWORD=[value]
   STUDENT_EMAIL=[value]
   BASE_URL=http://0.0.0.0:8080
```

Baseurl of http://0.0.0.0:8080 is used to run the tests against the local machine. This requires the edubadges server and edubadges UI docker containers also to be running on the localmachine. More info about this can be found in their repo's. 

Please note that the value of http://0.0.0.0:8080 for the  base url only works for os x and linux. 

## Commits

Before committing changes, run the following command to validate your updates:

```bash
   npm run precommit
```

This command performs the following checks:
* TypeScript Compiler (tsc)
* Linter
* Prettier
* Run all the tests

Ensure all issues are resolved before committing your changes.

With the following command it is possible to apply the Prettier format automatically:

```bash
   npm run format
```

Please see the script in the file package.json to see all the available scripts.

## Project structure

### ./tests

This folder contains all playwright tests. Tests related to the same subject are bundled in a single file.

A test looks like this:

```typescript
   import { expect, test } from '../../fixtures/eduBadgesFixture';

   test('Validate error messages empty microcredential form', async ({
   issuerPortalPageManage,
   page,
   }) => {
   await issuerPortalPageManage.searchForBadgeClass('Medicine');
   await issuerPortalPageManage.openBadgeClassWithName('Medicine');
   await issuerPortalPageManage.createNewBadgeClass();
   await issuerPortalPageManage.createNewMicroCredential();
   await expect(page).toHaveScreenshot('emptyMicrocredentialForm.png', {
      fullPage: true,
   });
   await page.getByRole('link', { name: 'Publish' }).click();
   await expect(page).toHaveScreenshot(
      'emptyMicrocredentialFormWithValidationErrors.png',
      { fullPage: true },
   );
   });
```

It is important to import the test from a fixture. The fixtures is responsible for the test setup, tear down and providing a test data context.

A test is define by test('[unique test name]', async({[objects imported from the fixture]}) => { [test implementation]};)
* Playwright requires that all test has an unique name. If 2 tests with the same name exists, playwright executes the first test it sees twice instead of running 2 different tests.
* The fixtures makes sure that all the page objects are provided and are in a test ready state. Things like opening 1 or more browsers, navigating to the correct page, logging in, setting up test data is the responsibility of the fixture. The playwright test itself only contains the actual test code and no border test code.

### ./ fixtures

This folder contains all the fixtures. Fixtures are objects that provide a test everything it needs to run. This can be Page Object Models, database connections, test data context, etc. It also makes sure that everything is ready for testing. Documentation can be found here: https://playwright.dev/docs/test-fixtures.

Each fixture contains a fixture type:

```typescript
   type LoginFixture = {
   homePage: HomePage;
   issuerPortalPage: IssuerPortalPage;
   testdata: Testdata;
   };
```

These are the object that can be use in tests that make use of this fixture. These object needs to be created and passed to playwright itself. This is done by extending playwright:

```typescript
   export const test = base.extend<LoginFixture>({
   testdata: async ({}, use, testInfo) => {
      var testdata = new Testdata();
      testdata.testCaseName = testInfo.title;

      // Use the fixture value in the test.
      await use(testdata);

      // Clean up the fixture.
   },
   homePage: async ({ page, testdata }, use, testInfo) => {
      // Set up the fixture
      testdata.testCaseName = testInfo.title;
      const loginPage = new HomePage(page, testdata);
      await loginPage.navigateToHomePage();

      // Use the fixture value in the test.
      await use(loginPage);

      // Clean up the fixture.
   },

   issuerPortalPage: async ({ page, testdata }, use) => {
      // Set up the fixture.
      const issuerPortalPage = new IssuerPortalPage(page, testdata);

      // Use the fixture value in the test.
      await use(issuerPortalPage);

      // Clean up the fixture.
   },
   });
```

The above example shows 
* how to extend playwright with the fixture type
* how to create the objects. Please note that the testdata object is created and given to the Page Object Models.
* how to prepare the objects

The await use line of code is required by playwright. If this is missing the code in the actual test wont be executed.

### ./pages

This folder contains all the actual Page Object Model. These contains all the locators and interactions for each webpage.

### ./util

This folder contains generic utils that this projects makes use of.

### using snapshots

The playwright tests in this repo makes use of visual testing. A snapshot of a page is created and compared to a previous created snapshot. The playwright code to perform such a validation looks like this:

```typescript
  var maskedElement = [await catalogPage.page.locator('.card > .header')];
  await expect(catalogPage.page).toHaveScreenshot('eduBadgeReceived.png', {
    mask: maskedElement,
  });
```

The current page is validated against the stored snapshot name "edeBadgeReceived.png". This snapshot needs to be stored in the repo. To created this snapshot, run the test with the npm playwright test --ui command. It makes and saves the snapshot of the missing snapshots.

To update an existing snapshot, like in the case when the page is modified, remove the snapshot and create a new one as explaned above.

## Copyright
Copyright (c) 2025, SURF U.A. Cooperative, Utrecht, The Netherlands
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
