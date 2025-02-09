import { expect, test } from '../src/fixtures/merge.fixture';
import { CartPage } from '../src/pages/cart.page';
import { Product } from '../src/models/product.model';
import { customer } from '../src/data/users.data';
import { prepareRandomAddress } from '../src/factories/address.factory';
import { prepareRandomCard } from '../src/factories/card.factory';
import { prepareRandomBankTransfer } from '../src/factories/bank-transfer.factory';
import { LoginPage } from '../src/pages/login.page';

let productInCart: Product;
let cartPage: CartPage;

test.beforeAll(async ({ product }) => {
  productInCart = {
    id: product.id,
    quantity: 2,
  };
});

test.beforeEach(async ({ createCart }) => {
  cartPage = (await createCart([productInCart])).cartPage;
});

test.describe('Not logged in', () => {
  test('has to log in to proceed with checkout', async ({ page }) => {
    
    cartPage.proceed();
    const loginPage = new LoginPage(page);
    loginPage.login(customer);
    await expect(cartPage.authMessage).toHaveText(
      `Hello ${customer.name}, you are already logged in. You can proceed to checkout.`,
    );
    await cartPage.proceed();

    await expect(cartPage.addressForm.streetInput).not.toBeEmpty();
    await expect(cartPage.goToCheckoutButton).toBeDisabled();
  });
});

test.describe('Logged in', () => {
  test.use({ storageState: '.auth\\customer.json' });

  test('can pay on delivery', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'cash-on-delivery';

    await cartPage.goToPaymentMethod(address, paymentMethod);
    const invoiceNumber = await cartPage.confirmPayment();

    await expect(cartPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by card', async () => {
    const address = prepareRandomAddress();
    const card = prepareRandomCard();
    const paymentMethod = 'credit-card';

    await cartPage.goToPaymentMethod(address, paymentMethod);
    await cartPage.fillCardData(card);
    const invoiceNumber = await cartPage.confirmPayment();

    await expect(cartPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by bank transfer', async () => {
    const address = prepareRandomAddress();
    const bankTransfer = prepareRandomBankTransfer();
    const paymentMethod = 'bank-transfer';

    await cartPage.goToPaymentMethod(address, paymentMethod);
    await cartPage.fillBankTransferData(bankTransfer);
    const invoiceNumber = await cartPage.confirmPayment();

    await expect(cartPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can buy now pay later', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'buy-now-pay-later';
    const installmentsNumber = 6;

    await cartPage.goToPaymentMethod(address, paymentMethod);
    await cartPage.selectMonthlyInstallments(installmentsNumber);
    const invoiceNumber = await cartPage.confirmPayment();

    await expect(cartPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by gift card', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'gift-card';
    const giftCardNumber = '1234567890';
    const giftCardValidationCode = '1234';

    await cartPage.goToPaymentMethod(address, paymentMethod);
    await cartPage.fillGiftCardData(giftCardNumber, giftCardValidationCode);
    const invoiceNumber = await cartPage.confirmPayment();

    await expect(cartPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });
});
