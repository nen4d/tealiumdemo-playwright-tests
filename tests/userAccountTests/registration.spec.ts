import { test, expect } from '@playwright/test';
import { registrationPage } from '../../pages/registrationPage.ts';

test('Valid Registration', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    const firstNameField = 'John';
    const lastNameField = 'Burke';
    const emailField = 'JohnBurke';
    const passwordField = 'JohnPassword';

    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${emailField}${randomNumber1}${randomNumber2}@email.com`;

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
    const firstNameField = 'John';
    const lastNameField = 'Burke';
    const emailField = 'demo@demo.com'; // We already know this email have been used before
    const passwordField = 'JohnPassword';

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
    const firstNameField = 'John';
    const lastNameField = 'Burke';
    const emailField = 'JohnBurke'; // 6 characters
    const passwordField = 'shortp';

    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${emailField}${randomNumber1}${randomNumber2}@email.com`;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, newEmailAddress, passwordField);

    await expect(page.getByText('Please enter more characters')).toBeVisible();

})

test('Mismatched Passwords', async ({page}) => {

    const createAccountPage = new registrationPage(page);
    await createAccountPage.GoToRegistrationPage();

    // Registration data
    const firstNameField = 'John';
    const lastNameField = 'Burke';
    const emailField = 'JohnBurke'; 
    const passwordField = 'JohnPassword';

    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const newEmailAddress = `${emailField}${randomNumber1}${randomNumber2}@email.com`;

    await createAccountPage.newRegistrationData(firstNameField, lastNameField, newEmailAddress, passwordField);

    await createAccountPage.passwordConfirmInput.fill('differentpassword');

    await expect(page.getByText('Please make sure your')).toBeVisible();

})