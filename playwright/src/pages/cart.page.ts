import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Address } from '../models/address.model';
import { Card } from '../models/card.model';
import { BankTransfer } from '../models/bank-transfer.model';

export class CartPage extends BasePage {
  readonly totalPrice: Locator;
  readonly goToCheckoutButton: Locator;
  readonly authMessage: Locator;
  readonly addressForm: Record<string, Locator>;
  readonly paymentMethodSelect: Locator;
  readonly confirmButton: Locator;
  readonly paymentSuccessAlert: Locator;
  readonly orderConfirmation: Locator;
  readonly cardForm: Record<string, Locator>;
  readonly bankTransferForm: Record<string, Locator>;
  readonly monthlyInstallmentsSelect: Locator;
  readonly giftCardForm: Record<string, Locator>;


  constructor(page: Page) {
    super(page);
    this.totalPrice = this.page.getByTestId('cart-total');
    this.goToCheckoutButton = this.page.getByRole('button', {
      name: 'Proceed to checkout',
    });
    this.authMessage = this.page.locator('.login-container p');
    this.addressForm = {
      streetInput: this.page.getByTestId('address'),
      cityInput: this.page.getByTestId('city'),
      stateInput: this.page.getByTestId('state'),
      country: this.page.getByTestId('country'),
      postcodeInput: this.page.getByTestId('postcode'),
    };
    this.paymentMethodSelect = this.page.getByTestId('payment-method');
    this.confirmButton = this.page.getByTestId('finish');
    this.paymentSuccessAlert = this.page.getByText('Payment was successful');
    this.orderConfirmation = this.page.locator('#order-confirmation');
    this.cardForm = {
      cardNumberInput: this.page.getByTestId('credit_card_number'),
      cardHolderNameInput: this.page.getByTestId('card_holder_name'),
      expiryDateInput: this.page.getByTestId('expiration_date'),
      cvvInput: this.page.getByTestId('cvv'),
    };
    this.bankTransferForm = {
      bankNameInput: this.page.getByTestId('bank_name'),
      accountNameInput: this.page.getByTestId('account_name'),
      accountNumberInput: this.page.getByTestId('account_number'),
    };
    this.monthlyInstallmentsSelect = this.page.getByTestId('monthly_installments');
    this.giftCardForm = {
      cardNumberInput: this.page.getByTestId('gift_card_number'),
      validationCodeInput: this.page.getByTestId('validation_code'),
    };
  }

  url = '/checkout';

  async getProductQuantityInput(productName: string): Promise<Locator> {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .getByTestId('product-quantity');
  }

  async getDeleteProductButton(productName: string): Promise<Locator> {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .locator('.btn-danger');
  }

  async deleteProduct(productName: string) {
    return (await this.getDeleteProductButton(productName)).click();
  }

  async changeQuantity(productName: string, newQuantity: string) {
    const quantityInput = await this.getProductQuantityInput(productName);
    await quantityInput.fill(newQuantity);
    await quantityInput.evaluate((e) => e.blur());
  }

  async proceed() {
    return this.goToCheckoutButton.click();
  }

  async choosePaymentMethod(paymentMethod: string) {
    await this.paymentMethodSelect.selectOption(paymentMethod);
  }

  async confirmPayment(): Promise<string> {
    await this.confirmButton.click();
    await this.paymentSuccessAlert.waitFor();

    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/invoices'),
    );

    await this.confirmButton.click();
    const response = await responsePromise;
    const responseData = await response.json();
    const invoiceNumber = responseData.invoice_number;
    return invoiceNumber;
  }

  async goToPaymentMethod(address: Address, paymentMethod: string) {
    await this.proceed();
    await this.proceed();
    await this.page.waitForLoadState('networkidle');
    await this.addressForm.streetInput.fill(address.street);
    await this.addressForm.cityInput.fill(address.city);
    await this.addressForm.stateInput.fill(address.state);
    await this.addressForm.postcodeInput.fill(address.postalcode);
    await this.proceed();
    await this.choosePaymentMethod(paymentMethod);
  }

  async fillCardData(card: Card) {
    await this.cardForm.cardNumberInput.fill(card.cardNumber);
    await this.cardForm.expiryDateInput.fill(card.expiryDate);
    await this.cardForm.cvvInput.fill(card.cvv);
    await this.cardForm.cardHolderNameInput.fill(card.holderName);
  }

  async fillBankTransferData(bankTransfer: BankTransfer) {
    await this.bankTransferForm.bankNameInput.fill(bankTransfer.bankName);
    await this.bankTransferForm.accountNameInput.fill(bankTransfer.accountName);
    await this.bankTransferForm.accountNumberInput.fill(
      bankTransfer.accountNumber,
    );
  }

  async selectMonthlyInstallments(installmentsNumber: number) {
    await this.monthlyInstallmentsSelect.selectOption(
      installmentsNumber.toString(),
    );
  }

  async fillGiftCardData(number: string, validationCode: string) {
    await this.giftCardForm.cardNumberInput.fill(number);
    await this.giftCardForm.validationCodeInput.fill(validationCode);
  }
}
