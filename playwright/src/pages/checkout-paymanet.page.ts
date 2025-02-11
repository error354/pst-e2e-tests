import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Card } from '../models/card.model';
import { BankTransfer } from '../models/bank-transfer.model';
import { LocatorsRecord } from '../models/locators-record.model';

export class CheckoutPaymentPage extends BasePage {
  url = '/checkout';

  readonly paymentMethodSelect: Locator;
  readonly confirmButton: Locator;
  readonly paymentSuccessAlert: Locator;
  readonly orderConfirmation: Locator;
  readonly cardForm: LocatorsRecord;
  readonly bankTransferForm: LocatorsRecord;
  readonly monthlyInstallmentsSelect: Locator;
  readonly giftCardForm: LocatorsRecord;

  constructor(page: Page) {
    super(page);
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
    this.monthlyInstallmentsSelect = this.page.getByTestId(
      'monthly_installments',
    );
    this.giftCardForm = {
      cardNumberInput: this.page.getByTestId('gift_card_number'),
      validationCodeInput: this.page.getByTestId('validation_code'),
    };
  }

  async choosePaymentMethod(paymentMethod: string): Promise<void> {
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

  async fillCardData(card: Card): Promise<void> {
    await this.cardForm.cardNumberInput.fill(card.cardNumber);
    await this.cardForm.expiryDateInput.fill(card.expiryDate);
    await this.cardForm.cvvInput.fill(card.cvv);
    await this.cardForm.cardHolderNameInput.fill(card.holderName);
  }

  async fillBankTransferData(bankTransfer: BankTransfer): Promise<void> {
    await this.bankTransferForm.bankNameInput.fill(bankTransfer.bankName);
    await this.bankTransferForm.accountNameInput.fill(bankTransfer.accountName);
    await this.bankTransferForm.accountNumberInput.fill(
      bankTransfer.accountNumber,
    );
  }

  async selectMonthlyInstallments(installmentsNumber: number): Promise<void> {
    await this.monthlyInstallmentsSelect.selectOption(
      installmentsNumber.toString(),
    );
  }

  async fillGiftCardData(
    number: string,
    validationCode: string,
  ): Promise<void> {
    await this.giftCardForm.cardNumberInput.fill(number);
    await this.giftCardForm.validationCodeInput.fill(validationCode);
  }
}
