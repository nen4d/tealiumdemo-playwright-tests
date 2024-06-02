import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';
import { loginPage } from '../../pages/Authentication/loginPage.ts';

export class accountOrders extends Collection<Page> {

    // Account navigation for order history check
    readonly accountLinkNavigation = this.page.getByRole('link', { name: 'Account', exact: true });
    readonly myAccountLinkNavigation = this.page.locator('#header-account').getByRole('link', { name: 'My Account' });
    readonly myOrdersNavigation = this.page.getByRole('link', { name: 'My Orders' });

    // Purchase item options
    readonly whiteColorItem = this.page.getByTitle('White');
    readonly sizeS = this.page.getByRole('link', { name: 'S', exact: true });
    readonly stateSelection = this.page.locator('#region_id');
    readonly zipCode = this.page.getByLabel('*Zip');

    // Purchase buttons
    readonly addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });
    readonly checkoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' }).nth(1);
    readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
    readonly placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });

    async clickContinueButton() {
        await this.continueButton.click();
        await this.page.waitForTimeout(2000);
      }
    
    async completeOrderSteps(steps: number) {
        for (let i = 0; i < steps; i++) {
          await this.clickContinueButton();
        }
      }

      async orderItem(itemName: Locator, 
                      itemColor: Locator, 
                      itemSize: Locator, 
                      state, 
                      zip, 
                      login: loginPage, 
                      email: string, 
                      password: string) {

        await itemName.click();
        await this.page.waitForTimeout(2000);
        await itemColor.click();
        await itemSize.click();
        await this.addToCartButton.click();
        await this.stateSelection.selectOption(state);
        await this.zipCode.fill(zip);
        await this.checkoutButton.click();

        await login.loginIntoAccount(email, password)
        await this.completeOrderSteps(3);
        await this.placeOrderButton.click();
    }

    async checkOrderHistory(orderID) {
        await this.accountLinkNavigation.click();
        await this.myAccountLinkNavigation.click();
        await this.myOrdersNavigation.click();
        await expect(this.page.getByRole('cell', { name: orderID })).toBeVisible();
    }

}