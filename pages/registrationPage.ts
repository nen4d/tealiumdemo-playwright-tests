import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class registrationPage extends Collection<Page> {

    readonly firstNameInput = this.page.getByLabel('*First Name');
    readonly middleNameInput = this.page.getByLabel('Middle Name/Initial');
    readonly lastNameInput = this.page.getByLabel('*Last Name');
    readonly emailAddressInput = this.page.getByLabel('*Email Address');
    readonly passwordInput = this.page.getByLabel('*Password');
    readonly passwordConfirmInput = this.page.getByLabel('*Confirm Password');
    readonly newsletterCheckbox = this.page.getByLabel('Sign Up for Newsletter');
    readonly rememberMeCheckbox = this.page.getByLabel('Remember Me');
    readonly registerButton = this.page.getByRole('button', { name: 'Register' });

    async GoToRegistrationPage() {
        await this.page.goto('/customer/account/create/');
    }

    async newRegistrationData(firstName, lastName, emailAddress, password) {
        // Check if the input fields are visible and enabled before interacting with them
        await this.firstNameInput.isVisible();
        await this.lastNameInput.isVisible();
        await this.emailAddressInput.isVisible();
        await this.passwordInput.isVisible();
        await this.passwordConfirmInput.isVisible();
        
        // Fill in the input fields and interact with other elements
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(password);
        await this.newsletterCheckbox.check();
        await this.registerButton.click();
    }
    

}