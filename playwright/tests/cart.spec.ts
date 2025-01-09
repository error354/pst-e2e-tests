import { expect, test } from '../src/fixtures/merge.fixture';
import { products } from '../src/data/products.data';
import { getProductByName } from '../src/utils/products';
import { CartPage } from '../src/pages/cart.page';
import { Product, ProductResponse } from '../src/models/product.model';

test.describe('Cart', () => {
  let product: ProductResponse;
  let productInCart: Product;
  let cartPage: CartPage;

  test.beforeAll(async () => {
    product = await getProductByName(products.boltCutters);
    productInCart = {
      id: product.id,
      quantity: 2,
    };
  });

  test.beforeEach(async ({ cart }) => {
    cartPage = (await cart([productInCart])).cartPage;
  });

  test('can change quantity in cart', async () => {
    await cartPage.changeQuantity(product.name, '3');

    await expect(cartPage.alert).toHaveText('Product quantity updated.');
    await expect(cartPage.navbar.cartQuantity).toHaveText('3');
    await expect(cartPage.totalPrice).toHaveText(`$${product.price * 3}`);
  });

  test('can delete product from cart', async () => {
    await cartPage.deleteProduct(product.name);

    await expect(cartPage.alert).toHaveText('Product deleted.');
    await expect(cartPage.totalPrice).toHaveText(`$0.00`);
  });
});
