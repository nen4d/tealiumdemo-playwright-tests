import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { homePage } from '../../pages/HomePage/homePage.ts';
import { accountOrders } from '../../pages/Account/OrderHistoryPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Pick an item and order it then check order history', async ({page}) => {

    const emailAddress = process.env.EMAIL as string;
    const password = process.env.PASSWORD as string;;
    const login = new loginPage(page);
    const mainPage = new homePage(page);
    const orderPage = new accountOrders(page);

    await page.goto('/');

    await mainPage.navMenuMan.click();

    // Hard coded the item which we want to purchase
    const ChelseaTeeItem = await page.getByText('Chelsea Tee').nth(1);
    const itemColor = await orderPage.whiteColorItem;
    const itemSize = await orderPage.sizeS;
    const stateArizona = '4';
    const zip = '5252';


    await orderPage.orderItem(ChelseaTeeItem, 
                            itemColor, 
                            itemSize, 
                            stateArizona, 
                            zip, 
                            login, 
                            emailAddress, 
                            password);

    // Assertion for item purchase
    await expect(page.getByRole('heading', { name: 'Your order has been received.' })).toBeVisible();
    
    // Getting order ID
    const orderTextAndID = await page.getByText('Your order # is:').allTextContents();
    const orderText = orderTextAndID.join(' '); 
    const orderID = orderText.replace(/\D/g,'');

    await orderPage.checkOrderHistory(orderID);

})