import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { RegisterPage } from '../pages/register.page';
import { getProductByName } from '../utils/products';
import { products } from '../data/products.data';
import { ProductResponse } from '../models/product.model';

interface Pages {
  accountPage: AccountPage;
  cartPage: CartPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productDetailsPage: ProductDetailsPage;
  registerPage: RegisterPage;
  productOptions: { name: string };
  product: ProductResponse;
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
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await use(cartPage);
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
