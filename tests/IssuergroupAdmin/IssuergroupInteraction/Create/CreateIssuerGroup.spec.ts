import { expect, test } from '../../../../fixtures/staffFixture';
import { institutions } from '../../../../util/loginPossibilities';

// TODO: CHANGE TO TEST IMPOSSIBILITY
institutions.forEach((institution) => {
  test(`Edit ${institution} issuer group`, async ({ adminPage }) => {
    // fail if correct account is missing. SHOULD BE CHANGED
    await test.fail(
      institution == 'WO' || institution == 'HBO' || institution == 'MBO',
    );
    expect(
      institution != 'WO' && institution != 'HBO' && institution != 'MBO',
    ).toBeTruthy();

    // var
    const issuerGroup = adminPage.managePage.issuerGroupPage;
    const issuergroupName = 'FirstIssuerGroupName';
    const issuergroupDesc = 'First description';

    const editButton = adminPage.page.getByRole('link', {
      name: 'Edit issuer group',
    });

    // setup
    await adminPage.loginTestIdp(institution, 'Issuergroup');
    await adminPage.goToManage();
    await adminPage.managePage.goToIssuerGroups();

    // test
    await issuerGroup.addNewIssuerGroup(issuergroupName, issuergroupDesc);

    // validate
    const groupTitle = adminPage.page.locator('.title').getByRole('heading');
    const description = adminPage.page.locator('.info').locator('p').first();

    await expect(editButton).toBeVisible();
    await expect(groupTitle).toHaveText(issuergroupName);
    await expect(description).toHaveText(issuergroupDesc);
  });
});
