import { Locator, Page } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';

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

  async goToCart(): Promise<CartPage> {
    await this.cart.click();
    return new CartPage(this.page);
  }

  async logOut(): Promise<LoginPage> {
    await this.userMenu.click();
    await this.userMenuItems.logOut.click();
    return new LoginPage(this.page);
  }
}
