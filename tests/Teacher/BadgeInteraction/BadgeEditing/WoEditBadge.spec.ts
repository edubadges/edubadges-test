import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';


test('Edit existing edubadge', async ({
    woPage,
    testdata,
  }) => {
    // var
    const issuers = woPage.managePage.issuersPage;
  
    // setup
    testdata.badgeData.title = 'Extra curricular badge';
    await woPage.goToManage();
    await issuers.searchWithText('Medicine');
    await issuers.openIssuerGroup('Medicine');
    await issuers.clickNewBadgeClass();
    await issuers.clickExtraCurricularEduBadge();
  
    // test
    await issuers.fillInExtraCurricularForm();
    await issuers.publishBadge();
  
    await woPage.page
      .getByRole('link', { name: 'Edit badge class' })
      .waitFor();
      
    var maskedLocators = [
      woPage.page
        .getByText('Created ')
        .locator('..')
        .locator('..'),
    ];
    await expect(woPage.page).toHaveScreenshot(
      'extraCurricularBadgeCreated.png',
      {
        mask: maskedLocators,
      },
    );
  });