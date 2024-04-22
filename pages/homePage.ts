import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class homePage extends Collection<Page> {

    // Nav menu links
    readonly navMenuWomen = this.page.getByRole('link', { name: 'Women', exact: true });
    readonly navMenuMan = this.page.getByRole('link', { name: 'Men', exact: true });
    readonly navMenuAccessories = this.page.getByRole('link', { name: 'Accessories', exact: true });
    readonly navMenuHomeDecor = this.page.getByRole('link', { name: 'Home & Decor', exact: true });
    readonly navMenuSale = this.page.getByRole('link', { name: 'Sale', exact: true });
    readonly navMenuVip = this.page.getByRole('link', { name: 'VIP' });

    // Promo links
    readonly promoHomeDecorLink = this.page.getByRole('link', { name: 'Physical & Virtual Gift Cards' });
    readonly promoPrivateSalesLink = this.page.getByRole('link', { name: 'Shop Private Sales - Members' });
    readonly promoTravelGearLink = this.page.getByRole('link', { name: 'Travel Gear for Every Occasion' });

    // New products
    readonly firstNewProductName = this.page.locator('li:nth-of-type(1) > .product-info > .product-name');
    readonly firstNewProductPrice = this.page.locator('li:nth-of-type(1) > .product-info  .regular-price > .price');

    // Footer links
    readonly aboutUs = this.page.getByRole('link', { name: 'About Us' });
    readonly contactUs = this.page.getByRole('link', { name: 'Contact Us' });
    readonly customerService = this.page.getByRole('link', { name: 'Customer Service' });
    readonly privacyPolicy = this.page.getByRole('link', { name: 'Privacy Policy' });
    readonly aboutTealium = this.page.getByRole('link', { name: 'About Tealium' });
    readonly siteMap = this.page.getByRole('link', { name: 'Site Map' });
    readonly searchTerms = this.page.getByRole('link', { name: 'Search Terms' });
    readonly advancedSearch = this.page.getByRole('link', { name: 'Advanced Search' });
    readonly myAccount = this.page.getByRole('link', { name: 'My Account' });
    readonly ordersAndReturns = this.page.getByRole('link', { name: 'Orders and Returns' });

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