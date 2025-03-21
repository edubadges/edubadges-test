import { expect, test } from '../../../../fixtures/staffFixtures/staffWOFixture';

test('Validate error messages empty microcredential form', async ({
    woPage,
  }) => {
    // var
    const newIssuerGroupName = 'NewWOIssuerGroup';
    const issuerGroup = woPage.managePage.issuerGroupPage;

    // setup
    await woPage.goToManage();
    await woPage.managePage.goToIssuerGroups();

    // test
    await issuerGroup.AddNewIssuerGroup(newIssuerGroupName);

    // validate
    await expect(woPage.page.getByRole('link', { name: 'Edit issuer group' })).toBeVisible();
  });