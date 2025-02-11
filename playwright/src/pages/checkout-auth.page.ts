import { Locator, Page } from '@playwright/test';
import { CheckoutPage } from './checkout.page';
import { CheckoutAddressPage } from './checkout-address.page';

export class CheckoutAuthPage extends CheckoutPage {
  url = '/checkout';

  readonly authMessage: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.authMessage = this.page.locator('.login-container p');
    this.email = this.page.getByTestId('email');
    this.password = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-submit');
    this.proceedButton = this.page.getByTestId('proceed-2');
  }

  async login({ email, password }): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async proceed(): Promise<CheckoutAddressPage> {
    await this.proceedButton.click();
    return new CheckoutAddressPage(this.page);
  }
}
