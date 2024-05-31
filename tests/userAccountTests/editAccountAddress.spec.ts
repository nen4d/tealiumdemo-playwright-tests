import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { addressBookPage } from '../../pages/Account/AddressBookPage.ts';
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

// There is some code-repetition in this test, I will fix it soon

test('Change Billing Address', async ({page}) => {

    const dashboardPage = new addressBookPage(page);

    await expect(page).toHaveURL('/customer/account/');

    // Address data
    const telephoneNumber = '(317) 232-1637';
    const streetAddress = '650 S Washington St';
    const city = 'Indianapolis';
    const state = '5';
    const zip = '46204';
    const country = 'US';

    await dashboardPage.addressBookMenu.click();
    await dashboardPage.changeBillingAddress.click();

    await dashboardPage.changeBillingAddres(telephoneNumber, streetAddress, city, state, zip, country);

    await expect(page.getByText('The address has been saved.')).toBeVisible();
    
    const billingAddressLi = page.locator('li').filter({ hasText: 'Default Billing Address John' });
    const addressElement = billingAddressLi.locator('address');

    const addressText = await addressElement.innerText();

    expect(addressText).toContain(telephoneNumber);
    expect(addressText).toContain(streetAddress);
    expect(addressText).toContain(city);
    expect(addressText).toContain(zip);
    expect(addressText).toContain('United States');

})

test('Change Shipping Address', async ({page}) => {

    const dashboardPage = new addressBookPage(page);

    await expect(page).toHaveURL('/customer/account/');

    // Address data
    const telephoneNumber = '(312) 232-1637';
    const streetAddress = '610 S Washington St';
    const city = 'Indianapolis';
    const state = '11';
    const zip = '46104';
    const country = 'US';

    await dashboardPage.addressBookMenu.click();
    await dashboardPage.changeShippingAddress.click();

    await dashboardPage.changeBillingAddres(telephoneNumber, streetAddress, city, state, zip, country);

    await expect(page.getByText('The address has been saved.')).toBeVisible();

    const shippingAddressLi = page.locator('li').filter({ hasText: 'Default Shipping Address John' });
    const addressElement = shippingAddressLi.locator('address');

    const addressText = await addressElement.innerText();

    expect(addressText).toContain(telephoneNumber);
    expect(addressText).toContain(streetAddress);
    expect(addressText).toContain(city);
    expect(addressText).toContain(zip);
    expect(addressText).toContain('United States')

})

// This site is broken, need fixes
// test('Add New Address', async ({page}) => {

//     const dashboardPage = new accountPage(page);

//     await expect(page).toHaveURL('/customer/account/');

//     // Address data
//     const telephoneNumber = '(520) 319-2467';
//     const streetAddress = '	2829 E Speedway Blvd';
//     const city = 'Tucson';
//     const state = '5';
//     const zip = '85716';
//     const country = 'US';

//     await dashboardPage.addressBookMenu.click();
//     await dashboardPage.addNewAddressButton.click();

//     await dashboardPage.changeBillingAddres(telephoneNumber, streetAddress, city, state, zip, country);

//     await expect(page.getByText('The address has been saved.')).toBeVisible();

//     // const shippingAddressLi = page.locator('li').filter({ hasText: 'Default Shipping Address John' });
//     // const addressElement = shippingAddressLi.locator('address');

//     // const addressText = await addressElement.innerText();

//     // expect(addressText).toContain(telephoneNumber);
//     // expect(addressText).toContain(streetAddress);
//     // expect(addressText).toContain(city);
//     // expect(addressText).toContain(zip);
//     // expect(addressText).toContain('United States')

// })