import { Locator, Page } from '@playwright/test';

type Navbar = {
  cart: Locator;
  cartQuantity: Locator;
  goToCart(): Promise<void>;
  userMenu: Locator;
  userMenuItems: {
    logOut: Locator;
  };
};

export abstract class BasePage {
  readonly url: string;
  readonly alert: Locator;
  readonly navbar: Navbar  

  constructor(protected page: Page) {
    this.alert = this.page.locator('#toast-container');
    this.navbar = {
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

  async logOut(): Promise<void> {
    await this.navbar.userMenu.click();
    await this.navbar.userMenuItems.logOut.click();
  }
}
