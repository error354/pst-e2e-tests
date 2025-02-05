import { CartPage } from "../pages/CartPage";
import { Product, ProductResponse } from "../models/product.model";
import { getProductByName, initCart } from "../support/products";
import { prepareRandomAddress } from "../factories/address.factory";
import { LoginPage } from "../pages/LoginPage";
import { User } from "../models/user.model";

describe("Checkout process", () => {
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
