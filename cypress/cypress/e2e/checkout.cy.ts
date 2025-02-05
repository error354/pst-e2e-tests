import { CartPage } from "../pages/CartPage";
import { Product, ProductResponse } from "../models/product.model";
import { getProductByName, initCart } from "../support/products";
import { prepareRandomAddress } from "../factories/address.factory";
import { LoginPage } from "../pages/LoginPage";
import { User } from "../models/user.model";
import { prepareRandomCard } from "../factories/card.factory";
import { prepareRandomBankTransfer } from "../factories/bank-transfer.factory";

let usersData: Record<string, User>;
let productInCart: Product;
let product: ProductResponse;
const cartPage = new CartPage();

before(() => {
  cy.fixture("products.json").then((products) => {
    getProductByName(products.boltCutters).then((productData) => {
      product = productData;
      productInCart = {
        id: product.id,
        quantity: 2,
      };
    });
  });
  cy.fixture("users.json").then((users) => {
    usersData = users;
  });
});

describe("Not logged in", () => {
  beforeEach(() => {
    initCart([productInCart]).then(() => {
      cartPage.visit();
    });
  });

  it("can log in and buy products", () => {
    const loginPage = new LoginPage();
    const paymentMethod = "cash-on-delivery";
    const address = prepareRandomAddress();
    let invoiceNumber: string;

    cartPage.getGoToCheckoutButton1().click();
    loginPage.login(usersData.customer);

    cartPage
      .getAuthMessage()
      .should(
        "have.text",
        `Hello ${usersData.customer.name}, you are already logged in. You can proceed to checkout.`,
      );

    cartPage.getGoToCheckoutButton2().click();

    cartPage.addressForm
      .getStreetInput()
      .should("have.prop", "value")
      .should("not.be.empty");
    cartPage.getGoToCheckoutButton3().should("be.disabled");

    cartPage.addressForm.getStateInput().type(address.state);
    cartPage.addressForm.getPostcodeInput().type(address.postalcode);
    cartPage.getGoToCheckoutButton3().click();
    cartPage.choosePaymentMethod(paymentMethod);
    cy.intercept("**/invoices").as("invoiceResponse");
    cartPage.getConfirmButton().click();
    cartPage.getPaymentSuccessAlert().should("be.visible");
    cartPage.getConfirmButton().click();
    cy.wait("@invoiceResponse").then((response) => {
      invoiceNumber = response.response.body.invoice_number;
      cartPage
        .getOrderConfirmation()
        .should(
          "have.text",
          `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
        );
    });
  });
});

describe("Logged in", () => {
  beforeEach(() => {
    const loginPage = new LoginPage();
    loginPage.visit();
    loginPage.login(usersData.customer);
    initCart([productInCart]).then(() => {
      cartPage.visit();
    });
  });

  it("can pay by card", () => {
    const address = prepareRandomAddress();
    const card = prepareRandomCard();
    const paymentMethod = "credit-card";

    cartPage.goToPaymmentMethod(address, paymentMethod);
    cartPage.fillCardData(card);
    cartPage.confirmPayment().then((invoiceNumber) => {
      cartPage
        .getOrderConfirmation()
        .should(
          "have.text",
          `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
        );
    });
  });

  it("can pay by bank transfer", () => {
    const address = prepareRandomAddress();
    const bankTransfer = prepareRandomBankTransfer();
    const paymentMethod = 'bank-transfer';

    cartPage.goToPaymmentMethod(address, paymentMethod);
    cartPage.fillBankTransferData(bankTransfer);
    cartPage.confirmPayment().then((invoiceNumber) => {
      cartPage
        .getOrderConfirmation()
        .should(
          "have.text",
          `Thanks for your order! Your invoice number is ${invoiceNumber}.`,
        );
    });
  });
});
