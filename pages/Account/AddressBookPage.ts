import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class addressBookPage extends Collection<Page> {

    // Links from account dashboard
    readonly manageAddresses = this.page.getByRole('link', { name: 'Manage Addresses' });
    readonly editBillingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();
    readonly editShippingAddress = this.page.getByRole('link', { name: 'Edit Address' }).first();

    // Left navigation of account page
    readonly addressBookMenu = this.page.getByRole('link', { name: 'Address Book' });
    readonly changeBillingAddress = this.page.getByRole('link', { name: 'Change Billing Address' });
    readonly changeShippingAddress = this.page.getByRole('link', { name: 'Change Shipping Address' });
    readonly addNewAddressMenu = this.page.getByRole('button', { name: 'Add New Address' });

    // Address inputs
    readonly telephoneInput = this.page.getByLabel('*Telephone');
    readonly streetAddressInput = this.page.getByLabel('*Street Address');
    readonly cityInput = this.page.getByLabel('*City');
    readonly zipinput = this.page.getByLabel('*Zip/Postal Code');
    readonly stateOptions = this.page.locator('#region_id');
    readonly countryOptions = this.page.locator('#country');

    // Buttons
    readonly saveAddressButton = this.page.getByRole('button', { name: 'Save Address' });
    readonly addNewAddressButton = this.page.getByRole('button', { name: 'Add New Address' });

    // Checkboxes
    readonly defaultBillingAddressCheckbox = this.page.getByLabel('Use as my default billing');
    readonly defaultShippingAddressCheckbox = this.page.getByLabel('Use as my default shipping');

    async changeBillingAddres(telNumber, street, city, state, zip, country) {
        await this.telephoneInput.fill(telNumber);
        await this.streetAddressInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateOptions.selectOption(state);
        await this.zipinput.fill(zip);
        await this.countryOptions.selectOption(country);
        await this.saveAddressButton.click();
    }

    async addNewAddress(telNumber, street, city, state, zip, country) {
        await this.telephoneInput.fill(telNumber);
        await this.streetAddressInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateOptions.selectOption(state);
        await this.zipinput.fill(zip);
        await this.countryOptions.selectOption(country);
        await this.saveAddressButton.click();
    }

}