import { Address } from "../models/address.model";
import { BankTransfer } from "../models/bank-transfer.model";
import { Card } from "../models/card.model";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  url = "/checkout";

  getTotalPrice = () => cy.getByTestId("cart-total");
  getGoToCheckoutButton1 = () => cy.getByTestId("proceed-1");
  getGoToCheckoutButton2 = () => cy.getByTestId("proceed-2");
  getGoToCheckoutButton3 = () => cy.getByTestId("proceed-3");
  getAuthMessage = () => cy.get(".login-container").find("p");

  addressForm = {
    getStreetInput: () => cy.getByTestId("address"),
    getCityInput: () => cy.getByTestId("city"),
    getStateInput: () => cy.getByTestId("state"),
    getCountryInput: () => cy.getByTestId("country"),
    getPostcodeInput: () => cy.getByTestId("postcode"),
  };
  getPaymentMethodSelect = () => cy.getByTestId("payment-method");
  getConfirmButton = () => cy.getByTestId("finish");
  getPaymentSuccessAlert = () => cy.contains("div", "Payment was successful");
  getOrderConfirmation = () => cy.get("#order-confirmation");

  cardForm = {
    getCardNumberInput: () => cy.getByTestId("credit_card_number"),
    getCardHolderNameInput: () => cy.getByTestId("card_holder_name"),
    getExpiryDateInput: () => cy.getByTestId("expiration_date"),
    getCvvInput: () => cy.getByTestId("cvv"),
  };
  bankTransferForm = {
    getBankNameInput: () => cy.getByTestId("bank_name"),
    getAccountNameInput: () => cy.getByTestId("account_name"),
    getAccountNumberInput: () => cy.getByTestId("account_number"),
  };
  getMonthlyInstallmentsSelect = () => cy.getByTestId("monthly_installments");
  giftCardForm = {
    getCardNumberInput: () => cy.getByTestId("gift_card_number"),
    getValidationCodeInput: () => cy.getByTestId("validation_code"),
  };

  getProductQuantityInput = (productName: string) =>
    cy.get("tr").contains(productName).getByTestId("product-quantity");

  getDeleteProductButton = (productName: string) =>
    cy.get("tr").contains(productName).get(".btn-danger");

  deleteProduct = (productName: string) =>
    this.getDeleteProductButton(productName).click();

  changeQuantity = (productName: string, newQuantity: string) => {
    this.getProductQuantityInput(productName).clear();
    this.getProductQuantityInput(productName).type(newQuantity);
    this.getProductQuantityInput(productName).blur();
  };

  choosePaymentMethod = (paymentMethod: string) => {
    this.getPaymentMethodSelect().select(paymentMethod);
  };

  confirmPayment = () => {
    cy.intercept("**/invoices").as("invoiceResponse");
    this.getConfirmButton().click();
    this.getPaymentSuccessAlert().should("be.visible");
    this.getConfirmButton().click();
    return cy.wait("@invoiceResponse").then((response) => {
      const invoiceNumber = response.response.body.invoice_number;
      return invoiceNumber;
    });
  };

  goToPaymmentMethod = (address: Address, paymentMethod: string) => {
    this.getGoToCheckoutButton1().click();
    this.getGoToCheckoutButton2().click();
    this.addressForm.getStreetInput().clear().type(address.street);
    this.addressForm.getCityInput().clear().type(address.city);
    this.addressForm.getStateInput().clear().type(address.state);
    this.addressForm.getPostcodeInput().clear().type(address.postalcode);
    this.getGoToCheckoutButton3().click();
    this.choosePaymentMethod(paymentMethod);
  };

  fillCardData = (card: Card) => {
    this.cardForm.getCardNumberInput().type(card.cardNumber);
    this.cardForm.getExpiryDateInput().type(card.expiryDate);
    this.cardForm.getCvvInput().type(card.cvv);
    this.cardForm.getCardHolderNameInput().type(card.holderName);
  };

  fillBankTransferData = (bankTransfer: BankTransfer) => {
    this.bankTransferForm.getBankNameInput().type(bankTransfer.bankName);
    this.bankTransferForm.getAccountNameInput().type(bankTransfer.accountName);
    this.bankTransferForm
      .getAccountNumberInput()
      .type(bankTransfer.accountNumber);
  };

  selectMonthlyInstallments = (installmentsNumber: number) => {
    this.getMonthlyInstallmentsSelect().select(
      `${installmentsNumber} Monthly Installments`,
    );
  };

  fillGiftCardData = (number: string, validationCode: string) => {
    this.giftCardForm.getCardNumberInput().type(number);
    this.giftCardForm.getValidationCodeInput().type(validationCode);
  };
}
