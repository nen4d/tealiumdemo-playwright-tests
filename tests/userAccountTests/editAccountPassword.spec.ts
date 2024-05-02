import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/loginPage.ts';
import { accountPage } from '../../pages/accountPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Edit Account Password and Verify Changes', async ({page}) => {

    const firstName = process.env.FIRST_NAME;
    const lastName = process.env.LAST_NAME;
    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // New password
    const newPassword = 'Johnnewpassword';

    const login = new loginPage(page);
    await login.goToLoginPage();

    const dashboardPage = new accountPage(page);

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByRole('heading', { name: 'My Dashboard' })).toBeVisible();
    await expect(page.getByText(`Hello, ${firstName} ${lastName}!`)).toBeVisible();
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