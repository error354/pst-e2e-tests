import { CartPage } from "../pages/CartPage";
import { Product, ProductResponse } from "../models/product.model";
import { getProductByName, initCart } from "../support/products";

describe("products", () => {
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
  });

  it("can change quantity in cart", () => {
    initCart([productInCart]).then(() => {
      cartPage.visit();
      cartPage.changeQuantity(product.name, "3");

      cartPage.alert
        .getMessage()
        .should("be.visible")
        .and("contain.text", "Product quantity updated");
      cartPage.navbar.getCartQuantity().should("have.text", "3");
      cartPage.getTotalPrice().should("have.text", `$${product.price * 3}`);
    });
  });

  it("can delete product from cart", () => {
    initCart([productInCart]).then(() => {
      cartPage.visit();
      cartPage.deleteProduct(product.name);
      cartPage.alert
        .getMessage()
        .should("be.visible")
        .and("contain.text", "Product deleted");
      cartPage.getTotalPrice().should("have.text", `$0.00`);
    });
  });
});
