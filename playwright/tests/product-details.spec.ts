import { expect, test } from '../src/fixtures/merge.fixture';
import { products } from '../src/data/products.data';
import { getProductByName } from '../src/utils/products';
import { ProductResponse } from '../src/models/product.model';

test.describe('Product details', () => {
  let product: ProductResponse;

  test.beforeAll(async () => {
    product = await getProductByName(products.boltCutters);
  });

  test.beforeEach(async ({ productDetailsPage }) => {
    await productDetailsPage.goto(product.id);
  });

  test('can add product to the cart', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await productDetailsPage.addToCart();

    await expect(productDetailsPage.alert).toHaveText(
      'Product added to shopping cart.',
    );

    await productDetailsPage.closeAlert();

    await expect(productDetailsPage.alert).toBeHidden({ timeout: 400 });

    await productDetailsPage.navbar.goToCart();

    await expect(cartPage.totalPrice).toHaveText(`$${product.price}`);
  });

  test('can add many copies of product to the cart', async ({
    productDetailsPage,
    cartPage,
  }) => {
    await productDetailsPage.changeQuantity('3');
    await productDetailsPage.addToCart();

    await expect(productDetailsPage.alert).toHaveText(
      'Product added to shopping cart.',
    );

    await productDetailsPage.closeAlert();
    await productDetailsPage.navbar.goToCart();

    await expect(cartPage.totalPrice).toHaveText(`$${product.price * 3}`);
  });

  test('can add many products to the cart', async ({
    page,
    productDetailsPage,
    cartPage,
  }) => {
    const product2 = await getProductByName(products.earProtection);

    await productDetailsPage.addToCart();
    await page.waitForResponse(/.*carts\/.*/);
    await productDetailsPage.goto(product2.id);
    await productDetailsPage.increaseQuantity();

    await expect(productDetailsPage.quantityInput).toHaveValue('2');

    await productDetailsPage.addToCart();
    await productDetailsPage.closeAlert();
    await productDetailsPage.navbar.goToCart();

    await expect(cartPage.totalPrice).toHaveText(
      `$${product.price + product2.price * 2}`,
    );
  });
});
