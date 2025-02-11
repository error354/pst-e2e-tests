import { Locator, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckoutCartPage } from '../pages/checkout-cart.page';

export class NavbarComponent {
  readonly cart: Locator;
  readonly cartQuantity: Locator;
  readonly userMenu: Locator;
  readonly userMenuItems: Record<string, Locator>;

  constructor(private page: Page) {
    this.cart = this.page.getByTestId('nav-cart');
    this.cartQuantity = this.page.getByTestId('cart-quantity');
    this.userMenu = this.page.getByTestId('nav-menu');
    this.userMenuItems = {
      logOut: this.page.getByTestId('nav-sign-out'),
    };
  }

  async goToCheckout(): Promise<CheckoutCartPage> {
    await this.cart.click();
    return new CheckoutCartPage(this.page);
  }

  async logOut(): Promise<LoginPage> {
    await this.userMenu.click();
    await this.userMenuItems.logOut.click();
    return new LoginPage(this.page);
  }
}
