import { Locator, Page } from '@playwright/test';
import { CheckoutPage } from './checkout.page';
import { CheckoutPaymentPage } from './checkout-paymanet.page';
import { Address } from '../models/address.model';

export class CheckoutAddressPage extends CheckoutPage {
  url = '/checkout';

  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly country: Locator;
  readonly postcodeInput: Locator;

  constructor(page: Page) {
    super(page);
    this.streetInput = this.page.getByTestId('address');
    this.cityInput = this.page.getByTestId('city');
    this.stateInput = this.page.getByTestId('state');
    this.country = this.page.getByTestId('country');
    this.postcodeInput = this.page.getByTestId('postcode');
    this.proceedButton = this.page.getByTestId('proceed-3');
  }

  async fillAddress(address: Address): Promise<void> {
    await this.streetInput.fill(address.street);
    await this.cityInput.fill(address.city);
    await this.stateInput.fill(address.state);
    await this.country.fill(address.country);
    await this.postcodeInput.fill(address.postalcode);
  }

  async proceed(): Promise<CheckoutPaymentPage> {
    await this.proceedButton.click();
    return new CheckoutPaymentPage(this.page);
  }
}
