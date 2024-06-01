import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { homePage } from '../../pages/HomePage/homePage.ts';
import { accountOrders } from '../../pages/Account/OrderHistoryPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Pick an item and order it then check order history', async ({page}) => {

    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const login = new loginPage(page);
    const mainPage = new homePage(page);
    const orderPage = new accountOrders(page);

    await page.goto('/');

    await mainPage.navMenuMan.click();

    // Hard coded the item which we want to purchase
    await page.getByText('Chelsea Tee').nth(1).click();
    await page.waitForURL('/chelsea-tee-735.html');
    await orderPage.whiteColorItem.click();
    await orderPage.sizeS.click();
    await orderPage.addToCartButton.click();

    await orderPage.stateSelection.selectOption('4');
    await orderPage.zipCode.fill('5252');
    await orderPage.checkoutButton.click();

    await login.loginIntoAccount(emailAddress, password);

    await orderPage.completeOrderSteps(3);
    
    await orderPage.placeOrderButton.click();

    await expect(page.getByRole('heading', { name: 'Your order has been received.' })).toHaveText('Your order has been received.')

})