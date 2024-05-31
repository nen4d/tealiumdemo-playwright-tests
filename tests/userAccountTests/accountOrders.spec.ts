import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
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

test('Pick an item and order it then check order history', async ({page}) => {

    const mainPage = new homePage(page);
    await mainPage.navMenuMan.click();

    await page.getByText('Chelsea Tee').nth(1).click();
    await page.getByRole('link', { name: 'White' }).click();
    await page.getByRole('link', { name: 'S', exact: true }).click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

})