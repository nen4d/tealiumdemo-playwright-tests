import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/loginPage.ts';
import { accountPage } from '../../pages/accountPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Edit Account Information and Verify Changes', async ({page}) => {

    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const newFirstName = 'JohnNEW';
    const newLastName = 'BurkeNEW';

    const login = new loginPage(page);
    await login.goToLoginPage();

    const dashboardPage = new accountPage(page);

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByRole('heading', { name: 'My Dashboard' })).toBeVisible();
    await expect(page.getByText(`Hello, ${firstName} ${lastName}!`)).toBeVisible();
    await expect(page).toHaveURL('/customer/account/');

    await dashboardPage.accountInformationMenu.click();

    // Changing account information
    await dashboardPage.editInformationsAndAssert(newFirstName, newLastName, password);

    await dashboardPage.goToDashboardPage();

    // Reverting changes to avoid failuer because of other tests with previous data
    await dashboardPage.accountInformationMenu.click();
    await dashboardPage.editInformationsAndAssert(firstName, lastName, password);

})