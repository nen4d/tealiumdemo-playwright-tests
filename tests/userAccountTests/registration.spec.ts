import { test, expect } from '@playwright/test';
import { registrationPage } from '../../pages/registrationPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Valid Registration', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    const firstNameField = process.env.FIRST_NAME;
    const lastNameField = process.env.LAST_NAME;
    const emailField = process.env.EMAIL;
    const passwordField = process.env.PASSWORD;

    // Adding two random numbers on email to avoid email duplication
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${randomNumber1}${randomNumber2}${emailField}`;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, newEmailAddress, passwordField);

    await expect(page.getByText('Thank you for registering')).toBeVisible();
    await expect(page.getByText(`Hello, ${firstNameField} ${lastNameField}!`)).toBeVisible();
    await expect(page).toHaveURL('/customer/account/index/');
    await expect(page).toHaveTitle('My Account');

})

test('Duplicate Email Registration', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    const firstNameField = process.env.FIRST_NAME;
    const lastNameField = process.env.LAST_NAME;
    const emailField = process.env.EXISTING_EMAIL;
    const passwordField = process.env.PASSWORD;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, emailField, passwordField);

    await expect(page.getByText('There is already an account')).toBeVisible();

});

test('Empty Field Validation', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    const requiredFields = [
        'firstname',
        'lastname',
        'email_address',
        'password',
        'confirmation'
    ]

    const requiredFieldMessage = 'This is a required field.';

    createAccountPage.registerButton.click();

    for(const requiredField of requiredFields) {
        await expect(page
            .locator(`#advice-required-entry-${requiredField}`))
            .toHaveText(requiredFieldMessage);
    }

})

test('Short Password', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    // Password must be atleast 7 characters
    const firstNameField = process.env.FIRST_NAME;
    const lastNameField = process.env.LAST_NAME;
    const emailField = process.env.EMAIL;
    const passwordField = process.env.SHORT_PASSWORD;

    // Adding two random numbers on email to avoid email duplication
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${randomNumber1}${randomNumber2}${emailField}`;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, newEmailAddress, passwordField);

    await expect(page.getByText('Please enter more characters')).toBeVisible();

})

test('Mismatched Passwords', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    const firstNameField = process.env.FIRST_NAME;
    const lastNameField = process.env.LAST_NAME;
    const emailField = process.env.EMAIL;
    const passwordField = process.env.PASSWORD;

    // Adding two random numbers on email to avoid email duplication
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${randomNumber1}${randomNumber2}${emailField}`;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, newEmailAddress, passwordField);

    await createAccountPage.passwordConfirmInput.fill('differentpassword');

    await expect(page.getByText('Please make sure your')).toBeVisible();

})