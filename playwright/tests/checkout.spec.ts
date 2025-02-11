import { expect, test } from '../src/fixtures/merge.fixture';
import { Product, ProductResponse } from '../src/models/product.model';
import { customer } from '../src/data/users.data';
import { prepareRandomAddress } from '../src/factories/address.factory';
import { prepareRandomCard } from '../src/factories/card.factory';
import { prepareRandomBankTransfer } from '../src/factories/bank-transfer.factory';
import { CheckoutCartPage } from '../src/pages/checkout-cart.page';
import { getProductByName } from '../src/utils/products';
import { products } from '../src/data/products.data';

let product: ProductResponse;
let productInCart: Product;
let checkoutCartPage: CheckoutCartPage;

test.beforeAll(async () => {
  product = await getProductByName(products.boltCutters);
  productInCart = {
    id: product.id,
    quantity: 2,
  };
});

test.beforeEach(async ({ createCart }) => {
  checkoutCartPage = (await createCart([productInCart])).checkoutCartPage;
});

test.describe('Not logged in', () => {
  test('has to log in to proceed with checkout', async () => {
    const checkoutAuthPage = await checkoutCartPage.proceed();
    checkoutAuthPage.login(customer);
    await expect(checkoutAuthPage.authMessage).toHaveText(
      `Hello ${customer.name}, you are already logged in. You can proceed to checkout.`,
    );
    const checkoutAddressPage = await checkoutAuthPage.proceed();

    await expect(checkoutAddressPage.streetInput).not.toBeEmpty();
    await expect(checkoutAddressPage.proceedButton).toBeDisabled();
  });
});

test.describe('Logged in', () => {
  test.use({ storageState: '.auth\\customer.json' });

  test('can pay on delivery', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'cash-on-delivery';

    const checkoutPaymentPage = await checkoutCartPage.goToPaymentMethod(
      address,
      paymentMethod,
    );
    const invoiceNumber = await checkoutPaymentPage.confirmPayment();

    await expect(checkoutPaymentPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by card', async () => {
    const address = prepareRandomAddress();
    const card = prepareRandomCard();
    const paymentMethod = 'credit-card';

    const checkoutPaymentPage = await checkoutCartPage.goToPaymentMethod(
      address,
      paymentMethod,
    );
    await checkoutPaymentPage.fillCardData(card);
    const invoiceNumber = await checkoutPaymentPage.confirmPayment();

    await expect(checkoutPaymentPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by bank transfer', async () => {
    const address = prepareRandomAddress();
    const bankTransfer = prepareRandomBankTransfer();
    const paymentMethod = 'bank-transfer';

    const checkoutPaymentPage = await checkoutCartPage.goToPaymentMethod(
      address,
      paymentMethod,
    );
    await checkoutPaymentPage.fillBankTransferData(bankTransfer);
    const invoiceNumber = await checkoutPaymentPage.confirmPayment();

    await expect(checkoutPaymentPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can buy now pay later', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'buy-now-pay-later';
    const installmentsNumber = 6;

    const checkoutPaymentPage = await checkoutCartPage.goToPaymentMethod(
      address,
      paymentMethod,
    );
    await checkoutPaymentPage.selectMonthlyInstallments(installmentsNumber);
    const invoiceNumber = await checkoutPaymentPage.confirmPayment();

    await expect(checkoutPaymentPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });

  test('can pay by gift card', async () => {
    const address = prepareRandomAddress();
    const paymentMethod = 'gift-card';
    const giftCardNumber = '1234567890';
    const giftCardValidationCode = '1234';

    const checkoutPaymentPage = await checkoutCartPage.goToPaymentMethod(
      address,
      paymentMethod,
    );
    await checkoutPaymentPage.fillGiftCardData(
      giftCardNumber,
      giftCardValidationCode,
    );
    const invoiceNumber = await checkoutPaymentPage.confirmPayment();

    await expect(checkoutPaymentPage.orderConfirmation).toHaveText(
      `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
    );
  });
});
