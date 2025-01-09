import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  url = '/';

  constructor(protected page: Page) {
    super(page);
  }

  async getProductCard(name: string): Promise<Locator> {
    return this.page.getByTestId('product-name').filter({ hasText: name });
  }

  async goToProduct(name: string): Promise<void> {
    return (await this.getProductCard(name)).click();
  }
}
