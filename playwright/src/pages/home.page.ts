import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductDetailsPage } from './product-details.page';

export class HomePage extends BasePage {
  url = '/';

  constructor(protected page: Page) {
    super(page);
  }

  async getProductCard(name: string): Promise<Locator> {
    return this.page.getByTestId('product-name').filter({ hasText: name });
  }

  async goToProduct(name: string): Promise<ProductDetailsPage> {
    const productCard = await this.getProductCard(name);
    await productCard.click();
    return new ProductDetailsPage(this.page);
  }
}
