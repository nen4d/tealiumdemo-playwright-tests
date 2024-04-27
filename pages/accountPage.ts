import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class accountPage extends Collection<Page> {

    // Links from account dashboard
    readonly editContactInfo = this.page.getByRole('link', { name: 'Edit' }).first();
    readonly editNewsletter = this.page.getByRole('link', { name: 'Edit' }).nth(1);
    readonly editPassword = this.page.getByRole('link', { name: 'Change Password' });
    readonly manageAddresses = this.page.getByRole('link', { name: 'Manage Addresses' });
    readonly editBillingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();
    readonly editShippingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();

    // Left navigation of account page
    readonly accountInformationMenu = this.page.getByRole('link', { name: 'Account Information' });

    // Inputs
    readonly firstName = this.page.getByLabel('*First Name');
    readonly lastName = this.page.getByLabel('*Last Name');
    readonly currentPassword = this.page.getByLabel('*Current Password');

    // Buttons
    readonly saveChangesButton = this.page.getByRole('button', { name: 'Save' });


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

    async editInformationsAndAssert(firstNameField, lastNameField, passwordField) {
        await this.firstName.fill(firstNameField);
        await this.lastName.fill(lastNameField);
        await this.currentPassword.fill(passwordField);
        await this.saveChangesButton.click();

        await expect(this.page.getByText(`Hello, ${firstNameField} ${lastNameField}!`)).toBeVisible();
        await expect(this.page.locator('p.hello')).toHaveText(`Hello, ${firstNameField} ${lastNameField}!`);
    }

}