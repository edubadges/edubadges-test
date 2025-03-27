import { expect, Page } from '@playwright/test';
import { Testdata } from '../util/testdata';
import { BasePage } from './basePage';

export class CatalogPage extends BasePage {

  async SearchForClass(name: string) {
    await this.page.getByPlaceholder('Search...').fill(name);
  }

  async filterOn(filterText: string = "university-example.org") {
    await this.page.getByText(filterText).click();
  }

  async openEduClass(name: string) {
    await this.page.getByText(name).first().click();
    await expect(
      this.page.getByRole('heading', { name: 'The programme' }),
    ).toBeVisible();
  }

  async RequestEdubadge() {


    const LoginButton = this.page.getByRole('link', { name: 'Login to request this edubadge' });
    if (await LoginButton.isVisible()) {
      await LoginButton.click();
      await this.Login();
    }

    await this.page.getByRole('link', { name: 'Request', exact: true }).click();

    const termsAndConditionsPage = this.page.getByRole('link', { name: 'I agree' });
    if (await termsAndConditionsPage.isVisible()) {
      await termsAndConditionsPage.click();
    }

    const confirm = this.page.getByRole('link', { name: 'Confirm' });
    if (await confirm.isVisible()) {
      await confirm.click();
    }

    await this.page.getByText('Successfully requested').waitFor();
  }

  public async Login(email: string = this.testdata.accounts.studentEmail,
    password: string = this.testdata.accounts.studentPassword,
  ) {
    const searchFieldLocator = this.page.getByPlaceholder('Search...');
    const usernameFieldLocator = this.page.getByPlaceholder('e.g. user@gmail.com');
    const eduIdButtonLocator = this.page.getByRole('heading', { name: 'Login with eduID (NL) test' });
    const nextButton = this.page.locator('[href*="/next"]');
    const termsAndConditions = this.page.getByRole('link', { name: 'I agree' });
    const loggedInMenu = this.page.locator('.expand-menu');

    await searchFieldLocator.or(usernameFieldLocator).waitFor();

    if ((await searchFieldLocator.isVisible())) {
      await searchFieldLocator.fill('test idp');
      await eduIdButtonLocator.waitFor();
      await eduIdButtonLocator.click();
      await usernameFieldLocator.waitFor();
    }

    await usernameFieldLocator.fill(email);
    await nextButton.click();

    await this.page.getByPlaceholder('Password').fill(password);
    await nextButton.click();
    
    await termsAndConditions.or(loggedInMenu).waitFor();
    if (await termsAndConditions.isVisible()) {
      await this.page.getByRole('link', { name: 'I agree' }).click();
    }

    await loggedInMenu.waitFor();
  }
}
