import { expect, test as setup } from '../src/fixtures/merge.fixture';
import { customer } from '../src/data/users.data';

setup('Login', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(customer);
  await expect(page).toHaveURL(/\/account/);
  await page.context().storageState({ path: '.auth/customer.json' });
});
