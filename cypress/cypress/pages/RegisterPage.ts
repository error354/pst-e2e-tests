import { Account } from "../models/user.model";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  url = "/auth/register";

  getFirstNameInput = () => cy.getByTestId("first-name");
  getLastNameInput = () => cy.getByTestId("last-name");
  getDateOfBirthInput = () => cy.getByTestId("dob");
  getAddressInput = () => cy.getByTestId("address");
  getPostcodeInput = () => cy.getByTestId("postcode");
  getCityInput = () => cy.getByTestId("city");
  getStateInput = () => cy.getByTestId("state");
  getCountrySelect = () => cy.getByTestId("country");
  getPhoneInput = () => cy.getByTestId("phone");
  getEmailInput = () => cy.getByTestId("email");
  getPasswordInput = () => cy.getByTestId("password");

  getFirstNameError = () => cy.getByTestId("first-name-error");
  getLastNameError = () => cy.getByTestId("last-name-error");
  getDateOfBirthError = () => cy.getByTestId("dob-error");
  getAddressError = () => cy.getByTestId("address-error");
  getPostcodeError = () => cy.getByTestId("postcode-error");
  getCityError = () => cy.getByTestId("city-error");
  getStateError = () => cy.getByTestId("state-error");
  getCountryError = () => cy.getByTestId("country-error");
  getPhoneError = () => cy.getByTestId("phone-error");
  getEmailError = () => cy.getByTestId("email-error");
  getPasswordError = () => cy.getByTestId("password-error");

  getRegisterButton = () => cy.getByTestId("register-submit");

  register = (data: Account) => {
    this.getFirstNameInput().type(data.firstName);
    this.getLastNameInput().type(data.lastName);
    this.getDateOfBirthInput().type(data.dateOfBirth);
    this.getAddressInput().type(data.address);
    this.getPostcodeInput().type(data.postcode);
    this.getCityInput().type(data.city);
    this.getStateInput().type(data.state);
    this.getCountrySelect().select(data.country);
    this.getPhoneInput().type(data.phone);
    this.getEmailInput().type(data.email);
    this.getPasswordInput().type(data.password);
    this.getRegisterButton().click();
  };
}
