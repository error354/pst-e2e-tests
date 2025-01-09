import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Account } from '../models/user.model';

export class RegisterPage extends BasePage {
  url = '/auth/register';

  firstNameInput = this.page.getByTestId('first-name');
  lastNameInput = this.page.getByTestId('last-name');
  dateOfBirthInput = this.page.getByTestId('dob');
  addressInput = this.page.getByTestId('address');
  postcodeInput = this.page.getByTestId('postcode');
  cityInput = this.page.getByTestId('city');
  stateInput = this.page.getByTestId('state');
  countrySelect = this.page.getByTestId('country');
  phoneInput = this.page.getByTestId('phone');
  emailInput = this.page.getByTestId('email');
  passwordInput = this.page.getByTestId('password');

  firstNameError = this.page.getByTestId('first-name-error');
  lastNameError = this.page.getByTestId('last-name-error');
  dateOfBirthError = this.page.getByTestId('dob-error');
  addressError = this.page.getByTestId('address-error');
  postcodeError = this.page.getByTestId('postcode-error');
  cityError = this.page.getByTestId('city-error');
  stateError = this.page.getByTestId('state-error');
  countryError = this.page.getByTestId('country-error');
  phoneError = this.page.getByTestId('phone-error');
  emailError = this.page.getByTestId('email-error');
  passwordError = this.page.getByTestId('password-error');

  registerButton = this.page.getByTestId('register-submit');

  constructor(protected page: Page) {
    super(page);
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
