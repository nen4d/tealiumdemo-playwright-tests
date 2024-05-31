import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { AccountInformationPage } from '../../pages/Account/AccountInformationPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test.beforeEach(({page}) => {
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const login = new loginPage(page);
    login.goToLoginPage();
    login.loginIntoAccount(emailAddress, password);
})

test('Edit Account Information and Verify Changes', async ({page}) => {

    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const password = process.env.PASSWORD;

    const newFirstName = 'JohnNEW';
    const newLastName = 'BurkeNEW';

    const dashboardPage = new AccountInformationPage(page);
    
    await expect(page).toHaveURL('/customer/account/');

    await dashboardPage.accountInformationMenu.click();

    // Changing account information
    await dashboardPage.editInformationAndAssert(newFirstName, newLastName, password);

    await dashboardPage.goToDashboardPage();

    // Reverting changes to avoid failuer because of other tests with previous data
    await dashboardPage.accountInformationMenu.click();
    await dashboardPage.editInformationAndAssert(firstName, lastName, password);

})

test('Edit Account Password and Verify Changes', async ({page}) => {

    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // New password
    const newPassword = 'Johnnewpassword';

    const login = new loginPage(page);
    const dashboardPage = new AccountInformationPage(page);

    await expect(page).toHaveURL('/customer/account/');

    await dashboardPage.accountInformationMenu.click();

    // Changing account password
    await dashboardPage.editPasswordCheckbox.check();
    // Parsing new password
    await dashboardPage.changePassword(password, newPassword);

    /** NOTE: At times, after changing the password, the website redirects to the home page instead of  
     * the account dashboard, where we perform an assertion to confirm that the password was set successfully.
     * Although the password is changed, the test fails.
     * To address this issue, I added a conditional statement (IF) to check the URL and prevent unnecessary errors.
    */

    await page.waitForTimeout(5000);

    if(page.url() === 'https://ecommerce.tealiumdemo.com/customer/account/') {
        // Assertion
        await expect(page.getByText('The account information has been saved.')).toBeVisible();
        // Logging out
        await dashboardPage.logoutOfAccount();
        // Waiting 5 seconds for auto-redirect to avoid test faileru erorr: ERR_ABORTED by server
        await page.waitForTimeout(5000);

        // Logging in with new password
        await login.goToLoginPage();
        await login.loginIntoAccount(emailAddress, newPassword);

        // Reverting changes to avoid failure in other tests
        await dashboardPage.accountInformationMenu.click();
        // Changing account password
        await dashboardPage.editPasswordCheckbox.check();
        // Parsing new password
        await dashboardPage.changePassword(newPassword, password);

    }   else {
        // Logging in with new password
        await login.goToLoginPage();
        await login.loginIntoAccount(emailAddress, newPassword);

        // Reverting changes to avoid failure in other tests
        await dashboardPage.accountInformationMenu.click();
        // Changing account password
        await dashboardPage.editPasswordCheckbox.check();
        // Parsing new password
        await dashboardPage.changePassword(newPassword, password);
    }

})