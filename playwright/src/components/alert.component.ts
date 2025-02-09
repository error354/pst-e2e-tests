import { Locator, Page } from '@playwright/test';

export class AlertComponent {
  readonly message: Locator;

  constructor(private page: Page) {
    this.message = this.page.locator('#toast-container');
  }

  async close(): Promise<void> {
    await this.message.click();
  }
}
