import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class accountPage extends Collection<Page> {

    readonly editContactInfo = this.page.getByRole('link', { name: 'Edit' }).first();
    readonly editNewsletter = this.page.getByRole('link', { name: 'Edit' }).nth(1);
    readonly editPassword = this.page.getByRole('link', { name: 'Change Password' });
    readonly manageAddresses = this.page.getByRole('link', { name: 'Manage Addresses' });
    readonly editBillingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();
    readonly editShippingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();

    async goToDashboardPage() {
        await this.page.goto('https://ecommerce.tealiumdemo.com/customer/account/');
    }

    async clickDashboardLinksAndAssert(linkName: Locator, expectedURL: string) {

        await linkName.click();

        // Assert the expected page URL;
        await expect(this.page).toHaveURL(expectedURL);
    
        // Navigate back to the home page
        await this.goToDashboardPage();

    }

}