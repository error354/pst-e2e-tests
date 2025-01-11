import { HomePage } from "../pages/HomePage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

describe("Product list", () => {
  it("can go to product details page", () => {
    const homePage = new HomePage();
    const productDetailsPage = new ProductDetailsPage();
    homePage
      .visit()
      .fixture("products.json")
      .then((products) => {
        homePage.goToProduct(products.boltCutters);
        productDetailsPage
          .getProductName()
          .should("have.text", products.boltCutters);
      });
  });
});
