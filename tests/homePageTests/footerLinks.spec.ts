import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/homePage.ts';

test('Footer links', async ({page}) => {

    const mainPage = new homePage(page);
    await mainPage.goToHomePage();

     // Define an array of footer links
     const footerLinks = [
        mainPage.aboutUs,
        mainPage.contactUs,
        mainPage.customerService,
        mainPage.privacyPolicy,
        mainPage.aboutTealium,
        mainPage.siteMap,
        mainPage.searchTerms,
        mainPage.advancedSearch,
        mainPage.myAccount,
        mainPage.ordersAndReturns
    ];

    // Define an array of expected page title corresponding to each footer link
    const expectedPageTitle = [
        'About Us',
        'Contact Us',
        'Customer Service',
        'Privacy Policy',
        'About Tealium',
        'Site Map',
        'Search Terms',
        'Advanced Search',
        'Customer Login',
        'TealiumEcommerce Demo'
    ];

    // Define an array of expected page URL corresponding to each footer link
    const expectedPageURL = [
        '/about-magento-demo-store/',
        '/contacts/',
        '/customer-service/',
        '/privacy-policy-cookie-restriction-mode/',
        '/about-tealium/',
        '/catalog/seo_sitemap/category/',
        '/catalogsearch/term/popular/',
        '/catalogsearch/advanced/',
        '/customer/account/login/',
        '/sales/guest/form/'
    ];

    for (let i = 0; i < footerLinks.length; i++) {
        // Click on the footer link and assert the expected title and URL
        await mainPage.clickOnFooterLink(
            footerLinks[i],
            expectedPageTitle[i],
            expectedPageURL[i]
        );
    }
    

})