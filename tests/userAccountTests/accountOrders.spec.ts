import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { accountPage } from '../../pages/Account/accountPage.ts';
import { homePage } from '../../pages/HomePage/homePage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test.beforeEach(async ({page}) => {
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);
})
test('Place an order and check his existence in ORDERS page of account', async ({page}) => {

    const dashboardPage = new accountPage(page);
    const mainPage = new homePage(page);

    await expect(page).toHaveURL('/customer/account/');

    await mainPage.navMenuAccessories.click();
    await page.locator('li').filter({ hasText: 'Jackie O Round Sunglasses' }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Qty' }).fill('1');
    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await page.waitForTimeout(2500);
    await dashboardPage.stateOptions.selectOption('7');
    await page.getByLabel('*Zip').fill('21421');

})