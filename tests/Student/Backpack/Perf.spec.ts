import { expect, test } from '../../../fixtures/studentFixture';
import { institutionsWithoutHBO } from '../../../util/loginPossibilities';
import { type Config, type Scenario } from 'artillery';
import { WOAccounts } from '../../../util/WOAccounts';
import { type Page } from '@playwright/test';
 
export const config: Config = {
  target: 'http://localhost:8080/',
  engines: {
    playwright: {

    }
  },
  phases: [
    {
      name: 'Dynamic Ramp-up',
      duration:  60, // duur
      arrivalRate: 5, //start
      rampTo: 20 //end
    }
  ]
};
 
export const scenarios: Scenario[]  = [{
  engine: 'playwright',
  testFunction: helloWorld
}];

async function helloWorld(page: Page) {
  await page.goto('http://localhost:8080/');
  await page.getByRole('link', { name: 'Open your backpack' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('student19example@gmail.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Enter');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password1!');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('link', { name: 'Edubadge requests' }).click();
  await page.getByRole('link', { name: 'Collections' }).click();
  await page.getByRole('link', { name: 'Archive' }).click();
  await page.getByRole('link', { name: 'Account' }).click();
}