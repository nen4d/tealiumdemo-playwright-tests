import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class loginPage extends Collection<Page> {

    readonly emailAddressField = this.page.getByLabel('*Email Address');
    readonly passwordField = this.page.getByLabel('*Password');
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });

    async goToLoginPage() {
        await this.page.goto('/customer/account/login/');
    }

    async loginIntoAccount(email, password) {
        await this.emailAddressField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}