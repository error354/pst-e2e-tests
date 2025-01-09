import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  url = '/product/';
  productName = this.page.getByTestId('product-name');
  unitPrice = this.page.getByTestId('unit-price');
  quantityInput = this.page.getByTestId('quantity');
  categoryBadge = this.page.getByLabel('category');
  brandBadge = this.page.getByLabel('brand');
  addToCartButton = this.page.getByTestId('add-to-cart');
  increaseQuantityButton = this.page.getByTestId('increase-quantity');
  decreaseQuantityButton = this.page.getByTestId('decrease-quantity');

  constructor(protected page: Page) {
    super(page);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async changeQuantity(newQuantity: string) {
    await this.quantityInput.clear();
    await this.quantityInput.type(newQuantity);
  }

  async increaseQuantity() {
    await this.increaseQuantityButton.click();
  }

  async decreaseQuantity() {
    await this.decreaseQuantityButton.click();
  }
}
