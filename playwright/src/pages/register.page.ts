import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Account } from '../models/user.model';

export class RegisterPage extends BasePage {
  url = '/auth/register';

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly dateOfBirthError: Locator;
  readonly addressError: Locator;
  readonly postcodeError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly countryError: Locator;
  readonly phoneError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  readonly registerButton: Locator;

  constructor(protected page: Page) {
    super(page);

    this.firstNameInput = this.page.getByTestId('first-name');
    this.lastNameInput = this.page.getByTestId('last-name');
    this.dateOfBirthInput = this.page.getByTestId('dob');
    this.addressInput = this.page.getByTestId('address');
    this.postcodeInput = this.page.getByTestId('postcode');
    this.cityInput = this.page.getByTestId('city');
    this.stateInput = this.page.getByTestId('state');
    this.countrySelect = this.page.getByTestId('country');
    this.phoneInput = this.page.getByTestId('phone');
    this.emailInput = this.page.getByTestId('email');
    this.passwordInput = this.page.getByTestId('password');
  
    this.firstNameError = this.page.getByTestId('first-name-error');
    this.lastNameError = this.page.getByTestId('last-name-error');
    this.dateOfBirthError = this.page.getByTestId('dob-error');
    this.addressError = this.page.getByTestId('address-error');
    this.postcodeError = this.page.getByTestId('postcode-error');
    this.cityError = this.page.getByTestId('city-error');
    this.stateError = this.page.getByTestId('state-error');
    this.countryError = this.page.getByTestId('country-error');
    this.phoneError = this.page.getByTestId('phone-error');
    this.emailError = this.page.getByTestId('email-error');
    this.passwordError = this.page.getByTestId('password-error');
  
    this.registerButton = this.page.getByTestId('register-submit');
  }

  async register(data: Account) {
    await this.firstNameInput.type(data.firstName);
    await this.lastNameInput.type(data.lastName);
    await this.dateOfBirthInput.type(data.dateOfBirth);
    await this.addressInput.type(data.address);
    await this.postcodeInput.type(data.postcode);
    await this.cityInput.type(data.city);
    await this.stateInput.type(data.state);
    await this.countrySelect.selectOption(data.country);
    await this.phoneInput.type(data.phone);
    await this.emailInput.type(data.email);
    await this.passwordInput.type(data.password);
    await this.registerButton.click();
  }
}
