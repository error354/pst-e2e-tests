import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../models/user.model';

export class LoginPage extends BasePage {
  url = '/auth/login';
  readonly emailInput: Locator
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId('email');
    this.passwordInput = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-submit');
    this.errorMessage = this.page.getByTestId('login-error');
  }

  async login(user: User) {
    await this.emailInput.type(user.email);
    await this.passwordInput.type(user.password);
    await this.loginButton.click();
  }
}
