import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/HomePage/homePage.ts';

test('Promo links', async ({ page }) => {

    const mainPage = new homePage(page);
    await mainPage.goToHomePage();

    // Define an array of promo links
    const promoLinks = [
        mainPage.promoHomeDecorLink,
        mainPage.promoPrivateSalesLink,
        mainPage.promoTravelGearLink
    ];

    // Define an array of expected header texts corresponding to each promo link
    const expectedHeaderTexts = [
        'Home & Decor',
        'VIP',
        'Bags & Luggage'
    ];

    // Loop through each promo link and test
    for (let i = 0; i < promoLinks.length; i++) {
        // Click on the promo link
        await mainPage.clickOnPromoLink(promoLinks[i]);

        // Assert the expected header text
        await expect(page.locator('h1')).toHaveText(expectedHeaderTexts[i]);

        // Navigate back to the home page for the next test iteration
        await mainPage.goToHomePage();
    }
});


