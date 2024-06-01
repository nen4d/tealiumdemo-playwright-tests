import { expect, type Locator, type Page } from '@playwright/test';
import Collection from '@lariat/playwright';

export class accountOrders extends Collection<Page> {

    readonly whiteColorItem = this.page.getByTitle('White');
    readonly sizeS = this.page.getByRole('link', { name: 'S', exact: true });
    readonly addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });
    
    readonly stateSelection = this.page.locator('#region_id');
    readonly zipCode = this.page.getByLabel('*Zip');

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

}