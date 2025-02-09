import { expect, test } from '../src/fixtures/merge.fixture';
import { Product } from '../src/models/product.model';

test.describe('Cart', () => {
  let productInCart: Product;

  test.beforeAll(async ({ product }) => {
    productInCart = {
      id: product.id,
      quantity: 2,
    };
  });

  test.beforeEach(async ({ createCart }) => {
    await createCart([productInCart]);
  });

  test('can change quantity in cart', async ({
    cartPage,
    product,
    alertComponent,
    navbarComponent,
  }) => {
    await cartPage.changeQuantity(product.name, '3');

    await expect(alertComponent.message).toHaveText(
      'Product quantity updated.',
    );
    await expect(navbarComponent.cartQuantity).toHaveText('3');
    await expect(cartPage.totalPrice).toHaveText(`$${product.price * 3}`);
  });

  test('can delete product from cart', async ({
    cartPage,
    product,
    alertComponent,
  }) => {
    await cartPage.deleteProduct(product.name);

    await expect(alertComponent.message).toHaveText('Product deleted.');
    await expect(cartPage.totalPrice).toHaveText(`$0.00`);
  });
});
