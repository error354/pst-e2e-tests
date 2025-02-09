import { Page } from '@playwright/test';

export class BasePage {
  readonly url: string;

  constructor(protected page: Page) {}

  async goto(id = ''): Promise<void> {
    await this.page.goto(`${this.url}${id}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
