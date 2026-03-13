import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBOAndMBO } from '../../../util/loginPossibilities';



  test(`Login backpack with a new generated email for }`, async ({ backpackPage, page, browserName}) => {
    test.skip(browserName !== 'chromium', 'Deze test is alleen voor Chrome');
    await backpackPage.page.waitForTimeout(3000);

    // test
    await backpackPage.loginSeperated('edubackpack8@gmail.com');
    await backpackPage.page.waitForTimeout(3000);

    // validate
    await expect(backpackPage.page.getByRole('heading', { name: 'Your edubadges', exact: true })).toBeVisible();
    });
