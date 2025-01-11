import { User } from "../models/user.model";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  url = "/auth/login";

  getEmailInput = () => cy.getByTestId("email");
  getPasswordInput = () => cy.getByTestId("password");
  getLoginButton = () => cy.getByTestId("login-submit");
  getErrorMessage = () => cy.getByTestId("login-error");

  login = (user: User) => {
    this.getEmailInput().type(user.email);
    this.getPasswordInput().type(user.password);
    this.getLoginButton().click();
    return this;
  };
}
