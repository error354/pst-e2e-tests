import { prepareRandomAccount } from "../factories/user.factory";
import { User } from "../models/user.model";
import { AccountPage } from "../pages/AccountPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

describe("Login", () => {
  let usersData: Record<string, User>;
  const loginPage = new LoginPage();

  before(() => {
    cy.fixture("users.json").then((users) => {
      usersData = users;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("can not log in with invalid credentials", () => {
    cy.title().should(
      "contain",
      "Login - Practice Software Testing - Toolshop - v",
    );

    loginPage
      .login(usersData.invalid)
      .getErrorMessage()
      .should("have.text", "Invalid email or password");
  });

  it("can log in with valid credentials", () => {
    const accountPage = new AccountPage();

    loginPage.login(usersData.customer);

    cy.url().should("contain", "account");
    accountPage.navbar.userMenu().should("contain", usersData.customer.name);
  });
});

describe("Register", () => {
  const registerPage = new RegisterPage();

  beforeEach(() => {
    registerPage.visit();
  });

  it("can register a new account", () => {
    const account = prepareRandomAccount();
    cy.intercept("POST", "/users/register").as("registerRequest");

    registerPage.register(account);

    cy.wait("@registerRequest").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(201);
    });
    cy.url().should("contain", "auth/login");
  });

  it("can not register with invalid password", () => {
    const account = prepareRandomAccount();
    account.password = "CS!";

    registerPage.register(account);

    registerPage
      .getPasswordError()
      .should("contain", "Password must be minimal 6 characters long");
  });

  it("can not register without required data", () => {
    registerPage.getRegisterButton().click();

    registerPage
      .getFirstNameError()
      .should("contain", "First name is required");
    registerPage
      .getLastNameError()
      .should("contain", "Last name is required");
    registerPage
      .getDateOfBirthError()
      .should("contain", "Date of Birth is required");
    registerPage.getAddressError().should("contain", "Address is required");
    registerPage.getPostcodeError().should("contain", "Postcode is required");
    registerPage.getCityError().should("contain", "City is required");
    registerPage.getStateError().should("contain", "State is required");
    registerPage.getCountryError().should("contain", "Country is required");
    registerPage.getPhoneError().should("contain", "Phone is required");
    registerPage.getEmailError().should("contain", "Email is required");
    registerPage.getPasswordError().should("contain", "Password is required");
    registerPage
      .getPasswordError()
      .should("contain", "Password must be minimal 6 characters long.");
    registerPage
      .getPasswordError()
      .should("contain", "Password can not include invalid characters");
  });
});

describe("Logout", () => {
  let usersData: Record<string, User>;

  before(() => {
    cy.fixture("users.json").then((users) => {
      usersData = users;
    });
  });

  it("can log out", () => {
    const loginPage = new LoginPage();
    const accountPage = new AccountPage();

    loginPage.visit();
    loginPage.login(usersData.customer);
    accountPage.logOut();

    cy.url().should("contain", "auth/login");
  });
});
