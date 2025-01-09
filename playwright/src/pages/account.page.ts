import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  url = '/account';

  constructor(protected page: Page) {
    super(page);
  }
}
