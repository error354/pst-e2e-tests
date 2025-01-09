import { Page } from '@playwright/test';

export abstract class BasePage {
  url: string;
  alert = this.page.locator('#toast-container');
  navbar = {
    cart: this.page.getByTestId('nav-cart'),
    cartQuantity: this.page.getByTestId('cart-quantity'),
    goToCart: async () => {
      await this.navbar.cart.click();
    },
    userMenu: this.page.getByTestId('nav-menu'),
    userMenuItems: {
      logOut: this.page.getByTestId('nav-sign-out'),
    },
  };

  constructor(protected page: Page) {}

  async goto(id = ''): Promise<void> {
    await this.page.goto(`${this.url}${id}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async closeAlert(): Promise<void> {
    await this.alert.click();
  }

  async logOut(): Promise<void> {
    await this.navbar.userMenu.click();
    await this.navbar.userMenuItems.logOut.click();
  }
}
