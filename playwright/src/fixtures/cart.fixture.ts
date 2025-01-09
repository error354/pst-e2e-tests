import { Product } from '../models/product.model';
import { CartPage } from '../pages/cart.page';
import { initCart } from '../utils/products';
import { pageObjectTest } from './page-object.fixture';

interface CartContext {
  cartPage: CartPage;
  cartId: string;
}

interface CartFixtures {
  cart: (products?: Product[]) => Promise<CartContext>;
}

export const cartTest = pageObjectTest.extend<CartFixtures>({
  cart: async ({ page, cartPage }, use) => {
    const init = async (products?: Product[]): Promise<CartContext> => {
      const finalProducts = products ?? [];
      const cartId = await initCart(finalProducts);
      await cartPage.goto();
      await page.evaluate((cartId) => {
        sessionStorage.setItem('cart_id', cartId);
      }, cartId);
      await page.reload();

      return { cartPage, cartId };
    };
    await use(init);
  },
});
