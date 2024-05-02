import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/loginPage.ts';
import { accountPage } from '../../pages/accountPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Account dashboard links', async ({page}) => {

    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const login = new loginPage(page);
    await login.goToLoginPage();

    const dashboardPage = new accountPage(page);

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByRole('heading', { name: 'My Dashboard' })).toBeVisible();
    await expect(page.getByText(`Hello, ${firstName} ${lastName}!`)).toBeVisible();
    await expect(page).toHaveURL('/customer/account/');

    const dashboardLinks = [
        dashboardPage.editContactInfo,
        dashboardPage.editNewsletter,
        dashboardPage.editPassword,
        dashboardPage.manageAddresses,
        dashboardPage.editBillingAddress,
        dashboardPage.editShippingAddress
    ]

    // Testing links on the dashboard page
    const expectedPageURL = [
        '/customer/account/edit/',
        '/newsletter/manage/',
        '/customer/account/edit/changepass/1/',
        '/customer/address/',
        '/customer/address/edit/id/5896/',
        '/customer/address/edit/id/5896/'
    ]

    for(let i=0; i < dashboardLinks.length; i++) {
        await dashboardPage.clickDashboardLinksAndAssert(
            dashboardLinks[i],
            expectedPageURL[i]
        )
    }

})