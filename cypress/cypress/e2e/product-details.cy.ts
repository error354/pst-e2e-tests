import { ProductResponse } from "../models/product.model";
import { CartPage } from "../pages/CartPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { getProductByName } from "../support/products";

describe("products", () => {
  let productNames: Record<string, string>;
  let product: ProductResponse;
  const productDetailsPage = new ProductDetailsPage();
  const cartPage = new CartPage();

  before(() => {
    cy.fixture("products.json").then((products) => {
      productNames = products;
      getProductByName(products.boltCutters).then((productData) => {
        product = productData;
      });
    });
  });

  beforeEach(() => {
    productDetailsPage.visit(product.id);
  });

  it("can add product to the cart", () => {
    productDetailsPage.getAddToCartButton().click();
    productDetailsPage
      .getAlert()
      .should("be.visible")
      .and("contain.text", "Product added to shopping cart");
    productDetailsPage.closeAlert();
    productDetailsPage.getAlert().should("not.exist");
    productDetailsPage.navbar.goToCart();
    cartPage.getTotalPrice().should("have.text", `$${product.price}`);
  });

  it("can add many copies of product to the cart", () => {
    productDetailsPage.getQuantityInput().clear();
    productDetailsPage.getQuantityInput().type("3");
    productDetailsPage.getAddToCartButton().click();

    productDetailsPage
      .getAlert()
      .should("be.visible")
      .and("contain.text", "Product added to shopping cart");

    productDetailsPage.closeAlert();

    productDetailsPage.navbar.getCartQuantity().should("have.text", "3");

    productDetailsPage.navbar.goToCart();

    cartPage.getTotalPrice().should("have.text", `$${product.price * 3}`);
  });

  it("can add many products to the cart", () => {
    productDetailsPage.addToCart();

    productDetailsPage
      .getAlert()
      .should("be.visible")
      .and("contain.text", "Product added to shopping cart");
    productDetailsPage.closeAlert();
    productDetailsPage.navbar.getCartQuantity().should("have.text", "1");
    getProductByName(productNames.earProtection).then((product2) => {
      productDetailsPage.visit(product2.id);
      productDetailsPage.increaseQuantity();

      productDetailsPage.getQuantityInput().should("have.value", "2");

      productDetailsPage.addToCart();
      productDetailsPage.closeAlert();

      productDetailsPage.navbar.getCartQuantity().should("have.text", "3");

      productDetailsPage.navbar.goToCart();

      cartPage
        .getTotalPrice()
        .should("have.text", `$${product2.price * 2 + product.price}`);
    });
  });
});
