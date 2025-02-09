import { expect, test } from '../src/fixtures/merge.fixture';
import { products } from '../src/data/products.data';
import { getProductByName } from '../src/utils/products';

test.describe('Product list', () => {
  test('can go to product details page', async ({ page, homePage }) => {
    const product = await getProductByName(products.boltCutters);

    const productDetailsPage = await homePage.goToProduct(products.boltCutters);

    await expect(productDetailsPage.productName).toHaveText(
      products.boltCutters,
    );
    await expect(productDetailsPage.unitPrice).toHaveText(
      product.price.toString(),
    );
    await expect(productDetailsPage.quantityInput).toHaveValue('1');
    await expect(productDetailsPage.categoryBadge).toHaveText(
      product.category.name,
    );
    await expect(productDetailsPage.brandBadge).toHaveText(product.brand.name);
    const titleRegexp = new RegExp(
      `${products.boltCutters} - Practice Software Testing - Toolshop - v`,
    );
    await expect(page).toHaveTitle(titleRegexp);
  });
});
