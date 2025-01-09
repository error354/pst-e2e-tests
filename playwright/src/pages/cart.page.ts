import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  url = '/checkout';
  totalPrice = this.page.getByTestId('cart-total');

  constructor(protected page: Page) {
    super(page);
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

  async deleteProduct(productName: string) {
    return (await this.getDeleteProductButton(productName)).click();
  }

  async changeQuantity(productName: string, newQuantity: string) {
    const quantityInput = await this.getProductQuantityInput(productName);
    await quantityInput.clear();
    await quantityInput.type(newQuantity);
    await quantityInput.evaluate((e) => e.blur());
  }
}
