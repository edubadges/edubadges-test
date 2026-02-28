import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';

test(`Login backpack with a new generated email`, async ({ backpackPage, page, }) => {

    // test
    await page.goto('http://localhost:8080/login');
    await page.getByRole('link', { name: 'Open your backpack' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('edubackpack8@gmail.com');
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password1!');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(7000);

    // validate
    await expect(page.getByRole('heading', { name: 'Your edubadges', exact: true })).toBeVisible();
});