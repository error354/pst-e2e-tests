import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../models/user.model';

export class LoginPage extends BasePage {
  url = '/auth/login';
  emailInput = this.page.getByTestId('email');
  passwordInput = this.page.getByTestId('password');
  loginButton = this.page.getByTestId('login-submit');
  errorMessage = this.page.getByTestId('login-error');

  constructor(protected page: Page) {
    super(page);
  }

  async login(user: User) {
    await this.emailInput.type(user.email);
    await this.passwordInput.type(user.password);
    await this.loginButton.click();
  }
}
