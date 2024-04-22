import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/loginPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Successful login', async ({page}) => {

    const emailAddress = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByRole('heading', { name: 'My Dashboard' })).toBeVisible();
    await expect(page).toHaveURL('/customer/account/');

})

test('Unsuccessful login with invalid email', async ({page}) => {

    const emailAddress = 'InvalidEmailAdr@email.com';
    const password = process.env.PASSWORD;

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByText('Invalid login or password.')).toBeVisible();

})

test('Unsuccessful login with invalid password', async ({page}) => {

    const emailAddress = process.env.EMAIL;
    const password = 'invalidPassword';

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.getByText('Invalid login or password.')).toBeVisible();

})

test('Unsuccessful login with empty email field', async ({page}) => {

    const emailAddress = '';
    const password = process.env.PASSWORD;

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.locator('#advice-required-entry-email')).toBeVisible();

})

test('Unsuccessful login with empty password field', async ({page}) => {

    const emailAddress = process.env.EMAIL;
    const password = '';

    const login = new loginPage(page);
    await login.goToLoginPage();

    await login.loginIntoAccount(emailAddress, password);

    await expect(page.locator('#advice-required-entry-pass')).toBeVisible();

})