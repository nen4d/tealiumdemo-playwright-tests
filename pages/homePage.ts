import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class homePage extends Collection<Page> {

    // Nav menu links
    readonly navMenuWomen = this.page.locator('.nav-1');
    readonly navMenuMan = this.page.locator('.nav-2');
    readonly navMenuAccessories = this.page.locator('.nav-3');
    readonly navMenuHomeDecor = this.page.locator('.nav-4');
    readonly navMenuSale = this.page.locator('.nav-5');
    readonly navMenuVip = this.page.locator('.nav-6');

    // Promo links
    readonly promoHomeDecorLink = this.page.getByAltText('Physical & Virtual Gift Cards');
    readonly promoPrivateSalesLink = this.page.getByAltText('Shop Private Sales - Members Only');
    readonly promoTravelGearLink = this.page.getByAltText('Travel Gear for Every Occasion');

    // New products
    readonly firstNewProductName = this.page.locator('li:nth-of-type(1) > .product-info > .product-name');
    readonly firstNewProductPrice = this.page.locator('li:nth-of-type(1) > .product-info  .regular-price > .price');

    // Footer links
    readonly aboutUs = this.page.getByText('About Us');
    readonly contactUs = this.page.getByText('Contact Us');
    readonly customerService = this.page.getByText('Customer Service');
    readonly privacyPolicy = this.page.getByText('Privacy Policy');
    readonly aboutTealium = this.page.getByText('About Tealium');
    readonly siteMap = this.page.getByText('Site Map');
    readonly searchTerms = this.page.getByText('Search Terms');
    readonly advancedSearch = this.page.getByText('Advanced Search');
    readonly myAccount = this.page.getByRole('link', { name: 'My Account' });
    readonly ordersAndReturns = this.page.getByText('Orders and Returns');

    async goToHomePage() {
        await this.page.goto('/');
    }

    async clickOnMenuLink(menuName: Locator) {
        await menuName.click();
    }

    async clickOnPromoLink(promoName: Locator) {
        await promoName.click();
    }

    async clickOnFooterLink(footerName: Locator, expectedTitle: string, expectedURL: string) {
        await footerName.click();
    
        // Assert the expected page title text and URL
        await expect(this.page).toHaveTitle(expectedTitle);
        await expect(this.page).toHaveURL(expectedURL);
    
        // Navigate back to the home page
        await this.goToHomePage();
    }
    

}