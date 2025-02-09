import { Product } from '../models/product.model';
import { CartPage } from '../pages/cart.page';
import { initCart } from '../utils/products';
import { pageObjectTest } from './page-object.fixture';

interface CartContext {
  cartPage: CartPage;
  cartId: string;
}

interface CartFixtures {
  createCart: (products?: Product[]) => Promise<CartContext>;
}

export const cartTest = pageObjectTest.extend<CartFixtures>({
  createCart: async ({ page, cartPage }, use) => {
    const init = async (products?: Product[]): Promise<CartContext> => {
      const finalProducts = products ?? [];
      const cartId = await initCart(finalProducts);
      await page.evaluate((cartId) => {
        sessionStorage.setItem('cart_id', cartId);
      }, cartId);
      await page.reload();

      return { cartPage, cartId };
    };
    await use(init);
  },
});
