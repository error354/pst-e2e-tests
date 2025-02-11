import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { RegisterPage } from '../pages/register.page';
import { getProductByName } from '../utils/products';
import { products } from '../data/products.data';
import { ProductResponse } from '../models/product.model';
import { CheckoutAddressPage } from '../pages/checkout-address.page';
import { CheckoutPaymentPage } from '../pages/checkout-paymanet.page';
import { CheckoutAuthPage } from '../pages/checkout-auth.page';
import { CheckoutCartPage } from '../pages/checkout-cart.page';

interface Pages {
  accountPage: AccountPage;
  checkoutAddressPage: CheckoutAddressPage;
  checkoutAuthPage: CheckoutAuthPage;
  checkoutCartPage: CheckoutCartPage;
  checkoutPaymentPage: CheckoutPaymentPage;
  homePage: HomePage;
  loginPage: LoginPage;
  product: ProductResponse;
  productDetailsPage: ProductDetailsPage;
  productOptions: { name: string };
  registerPage: RegisterPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  productOptions: [{ name: products.boltCutters }, { option: true }],
  product: async ({ productOptions }, use) => {
    const product = await getProductByName(productOptions.name);
    await use(product);
  },
  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await accountPage.goto();
    await use(accountPage);
  },
  checkoutAddressPage: async ({ page }, use) => {
    const checkoutAddressPage = new CheckoutAddressPage(page);
    await checkoutAddressPage.goto();
    await use(checkoutAddressPage);
  },
  checkoutAuthPage: async ({ page }, use) => {
    const checkoutAuthPage = new CheckoutAuthPage(page);
    await checkoutAuthPage.goto();
    await use(checkoutAuthPage);
  },
  checkoutCartPage: async ({ page }, use) => {
    const checkoutCartPage = new CheckoutCartPage(page);
    await checkoutCartPage.goto();
    await use(checkoutCartPage);
  },
  checkoutPaymentPage: async ({ page }, use) => {
    const checkoutPaymentPage = new CheckoutPaymentPage(page);
    await checkoutPaymentPage.goto();
    await use(checkoutPaymentPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  productDetailsPage: async ({ page, product }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await productDetailsPage.goto(product.id);
    await use(productDetailsPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});
