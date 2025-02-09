import { Page } from '@playwright/test';
import { NavbarComponent } from '../components/navbar.component';
import { AlertComponent } from '../components/alert.component';

export abstract class BasePage {
  readonly url: string;
  readonly alert: AlertComponent;
  readonly navbar: NavbarComponent;

  constructor(protected page: Page) {
    this.navbar = new NavbarComponent(this.page);
    this.alert = new AlertComponent(this.page);
  }

  async goto(id = ''): Promise<void> {
    await this.page.goto(`${this.url}${id}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
