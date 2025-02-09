import { Locator, Page } from '@playwright/test';
import { NavbarComponent } from '../components/navbar.component';

export abstract class BasePage {
  readonly url: string;
  readonly alert: Locator;
  readonly navbar: NavbarComponent;

  constructor(protected page: Page) {
    this.alert = this.page.locator('#toast-container');
    this.navbar = new NavbarComponent(this.page);
  }

  async goto(id = ''): Promise<void> {
    await this.page.goto(`${this.url}${id}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async closeAlert(): Promise<void> {
    await this.alert.click();
  }
}
