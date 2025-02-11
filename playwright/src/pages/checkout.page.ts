import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export abstract class CheckoutPage extends BasePage {
  url = '/checkout';

  proceedButton: Locator;

  constructor(page: Page) {
    super(page);
  }

  abstract proceed(): Promise<BasePage>;
}
