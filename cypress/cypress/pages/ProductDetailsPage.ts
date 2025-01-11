import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
  url = "/product/";

  getProductName = () => cy.getByTestId("product-name");
  getUnitPrice = () => cy.getByTestId("unit-price");
  getQuantityInput = () => cy.getByTestId("quantity");
  getCategoryBadge = () => cy.get('[aria-label="category"]');
  getBrandBadge = () => cy.get('[aria-label="brand"]');
  getAddToCartButton = () => cy.getByTestId("add-to-cart");
  getIncreaseQuantityButton = () => cy.getByTestId("increase-quantity");
  getDecreaseQuantityButton = () => cy.getByTestId("decrease-quantity");

  addToCart = () => this.getAddToCartButton().click();
  increaseQuantity = () => this.getIncreaseQuantityButton().click();
  decreaseQuantity = () => this.getDecreaseQuantityButton().click();
}
