import { products } from '../src/data/products.data';
import { expect, test } from '../src/fixtures/merge.fixture';
import { getProductByName } from '../src/utils/products';

test.describe('Product details', () => {
  test('can add product to the cart', async ({
    productDetailsPage,
    product,
    alertComponent,
    navbarComponent,
  }) => {
    await productDetailsPage.addToCart();

    await expect(alertComponent.message).toHaveText(
      'Product added to shopping cart.',
    );

    await alertComponent.close();

    await expect(alertComponent.message).toBeHidden({ timeout: 400 });

    const checkoutCartPage = await navbarComponent.goToCheckout();

    await expect(checkoutCartPage.totalPrice).toHaveText(`$${product.price}`);
  });

  test('can add many copies of product to the cart', async ({
    productDetailsPage,
    product,
    alertComponent,
    navbarComponent,
  }) => {
    await productDetailsPage.changeQuantity('3');
    await productDetailsPage.addToCart();

    await expect(alertComponent.message).toHaveText(
      'Product added to shopping cart.',
    );

    await alertComponent.close();
    const checkoutCartPage = await navbarComponent.goToCheckout();

    await expect(checkoutCartPage.totalPrice).toHaveText(
      `$${product.price * 3}`,
    );
  });

  test('can add many products to the cart', async ({
    page,
    productDetailsPage,
    product,
    alertComponent,
    navbarComponent,
  }) => {
    const product2 = await getProductByName(products.earProtection);

    await productDetailsPage.addToCart();
    await page.waitForResponse(/.*carts\/.*/);
    await productDetailsPage.goto(product2.id);
    await productDetailsPage.increaseQuantity();

    await expect(productDetailsPage.quantityInput).toHaveValue('2');

    await productDetailsPage.addToCart();
    await alertComponent.close();
    const checkoutCartPage = await navbarComponent.goToCheckout();

    await expect(checkoutCartPage.totalPrice).toHaveText(
      `$${product.price + product2.price * 2}`,
    );
  });
});
