import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/homePage.ts';

test('Menu links', async ({page}) => {

    const mainPage = new homePage(page);
    await mainPage.goToHomePage();

    // Clicking on Women menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuWomen);
    await expect(page.locator('h1')).toHaveText('Women');

    // Clicking on Man menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuMan);
    await expect(page.locator('h1')).toHaveText('Men');

    // Clicking on Accessories menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuAccessories);
    await expect(page.locator('h1')).toHaveText('Accessories');

    // Clicking on Home & Decor menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuHomeDecor);
    await expect(page.locator('h1')).toHaveText('Home & Decor');

    // Clicking on Sale menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuSale);
    await expect(page.locator('h1')).toHaveText('Sale');

    // Clicking on VIP menu link
    await mainPage.clickOnMenuLink(mainPage.navMenuVip);
    await expect(page.locator('h1')).toHaveText('VIP');

});
