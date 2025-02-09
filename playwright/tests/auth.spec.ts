import { expect, test } from '../src/fixtures/merge.fixture';
import { customer, invalid } from '../src/data/users.data';
import { prepareRandomAccount } from '../src/factories/user.factory';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('can not log in with invalid credentials', async ({
    page,
    loginPage,
  }) => {
    await expect(page).toHaveTitle(
      /Login - Practice Software Testing - Toolshop - v/,
    );

    await loginPage.login(invalid);

    await expect(loginPage.errorMessage).toHaveText(
      'Invalid email or password',
    );
  });

  test('can log in with valid credentials', async ({
    page,
    loginPage,
    accountPage,
  }) => {
    await loginPage.login(customer);

    await expect(page).toHaveURL(/\/account/);
    await expect(accountPage.navbar.userMenu).toContainText(
      customer.name as string,
    );
  });
});

test.describe('Register', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('can register a new account', async ({ page, registerPage }) => {
    const accountData = prepareRandomAccount();

    const registerPromise = page.waitForResponse((response) =>
      response.url().includes('/register'),
    );
    await registerPage.register(accountData);
    const registerResponse = await registerPromise;

    expect(registerResponse.status()).toBe(201);
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('can not register without required data', async ({ registerPage }) => {
    const registerErrorsMessages = [
      {
        selector: registerPage.firstNameError,
        message: 'First name is required',
      },
      {
        selector: registerPage.lastNameError,
        message: 'Last name is required',
      },
      {
        selector: registerPage.dateOfBirthError,
        message: 'Date of Birth is required',
      },
      { selector: registerPage.addressError, message: 'Address is required' },
      { selector: registerPage.postcodeError, message: 'Postcode is required' },
      { selector: registerPage.cityError, message: 'City is required' },
      { selector: registerPage.stateError, message: 'State is required' },
      { selector: registerPage.countryError, message: 'Country is required' },
      { selector: registerPage.phoneError, message: 'Phone is required' },
      { selector: registerPage.emailError, message: 'Email is required' },
      {
        selector: registerPage.passwordError,
        message: `Password is required
        Password must be minimal 6 characters long.
        Password can not include invalid characters`,
      },
    ];

    await registerPage.registerButton.click();

    for (const { selector, message } of registerErrorsMessages) {
      await expect(selector).toHaveText(message);
    }
  });

  test('can not register with invalid password', async ({ registerPage }) => {
    const accountData = prepareRandomAccount();
    accountData.password = 'Pw1!';

    await registerPage.register(accountData);

    await expect(registerPage.passwordError).toHaveText(
      'Password must be minimal 6 characters long.',
    );
  });
});

test.describe('Logout', () => {
  test.use({ storageState: '.auth\\customer.json' });
  test('can log out', async ({ page, accountPage }) => {
    await accountPage.goto();
    await accountPage.navbar.logOut();

    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
