import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/HomePage/homePage.ts';

test('Click on first new product', async ({page}) => {

    const mainPage = new homePage(page);
    await mainPage.goToHomePage();

    const firstProductName = await mainPage.firstNewProductName.innerText();
    const firstProductPrice = await mainPage.firstNewProductPrice.innerText();
    
    await mainPage.firstNewProductName.click();

    // Assertion for name
    await expect(page.locator('h1')).toHaveText(firstProductName, { ignoreCase: true });
    // Assertion for price
    await expect(page.locator('.price-info > .price-box > .regular-price > .price')).toHaveText(firstProductPrice);

});
