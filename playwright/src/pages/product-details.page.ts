import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  url = '/product/';
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly quantityInput: Locator;
  readonly categoryBadge: Locator;
  readonly brandBadge: Locator;
  readonly addToCartButton: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.productName = this.page.getByTestId('product-name');
    this.unitPrice = this.page.getByTestId('unit-price');
    this.quantityInput = this.page.getByTestId('quantity');
    this.categoryBadge = this.page.getByLabel('category');
    this.brandBadge = this.page.getByLabel('brand');
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.increaseQuantityButton = this.page.getByTestId('increase-quantity');
    this.decreaseQuantityButton = this.page.getByTestId('decrease-quantity');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async changeQuantity(newQuantity: string) {
    await this.quantityInput.fill(newQuantity);
  }

  async increaseQuantity() {
    await this.increaseQuantityButton.click();
  }

  async decreaseQuantity() {
    await this.decreaseQuantityButton.click();
  }
}
