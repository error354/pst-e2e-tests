import { Locator, Page } from '@playwright/test';
import { CheckoutPage } from './checkout.page';
import { CheckoutAuthPage } from './checkout-auth.page';
import { Address } from '../models/address.model';
import { CheckoutPaymentPage } from './checkout-paymanet.page';

export class CheckoutCartPage extends CheckoutPage {
  url = '/checkout';

  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.totalPrice = this.page.getByTestId('cart-total');
    this.proceedButton = this.page.getByTestId('proceed-1');
  }

  async getProductQuantityInput(productName: string): Promise<Locator> {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .getByTestId('product-quantity');
  }

  async getDeleteProductButton(productName: string): Promise<Locator> {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .locator('.btn-danger');
  }

  async deleteProduct(productName: string): Promise<void> {
    const deleteButton = await this.getDeleteProductButton(productName);
    deleteButton.click();
  }

  async changeQuantity(
    productName: string,
    newQuantity: string,
  ): Promise<void> {
    const quantityInput = await this.getProductQuantityInput(productName);
    await quantityInput.fill(newQuantity);
    await quantityInput.evaluate((e) => e.blur());
  }

  async proceed(): Promise<CheckoutAuthPage> {
    await this.proceedButton.click();
    return new CheckoutAuthPage(this.page);
  }

  async goToPaymentMethod(
    address: Address,
    paymentMethod: string,
  ): Promise<CheckoutPaymentPage> {
    const authPage = await this.proceed();
    const addressPage = await authPage.proceed();
    await this.page.waitForLoadState('networkidle');
    await addressPage.fillAddress(address);
    const paymentPage = await addressPage.proceed();
    await paymentPage.choosePaymentMethod(paymentMethod);
    return paymentPage;
  }
}
