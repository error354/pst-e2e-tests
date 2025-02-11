import { products } from '../src/data/products.data';
import { expect, test } from '../src/fixtures/merge.fixture';
import { Product, ProductResponse } from '../src/models/product.model';
import { getProductByName } from '../src/utils/products';

test.describe('Cart', () => {
  let product: ProductResponse;
  let productInCart: Product;

  test.beforeAll(async () => {
    product = await getProductByName(products.boltCutters);
    productInCart = {
      id: product.id,
      quantity: 2,
    };
  });

  test.beforeEach(async ({ createCart }) => {
    await createCart([productInCart]);
  });

  test('can change quantity in cart', async ({
    checkoutCartPage,
    alertComponent,
    navbarComponent,
  }) => {
    await checkoutCartPage.changeQuantity(product.name, '3');

    await expect(alertComponent.message).toHaveText(
      'Product quantity updated.',
    );
    await expect(navbarComponent.cartQuantity).toHaveText('3');
    await expect(checkoutCartPage.totalPrice).toHaveText(
      `$${product.price * 3}`,
    );
  });

  test('can delete product from cart', async ({
    checkoutCartPage,
    alertComponent,
  }) => {
    await checkoutCartPage.deleteProduct(product.name);

    await expect(alertComponent.message).toHaveText('Product deleted.');
    await expect(checkoutCartPage.totalPrice).toHaveText(`$0.00`);
  });
});
