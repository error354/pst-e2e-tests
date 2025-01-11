import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  url = "/checkout";

  getTotalPrice = () => cy.getByTestId("cart-total");

  getProductQuantityInput = (productName: string) =>
    cy.get("tr").contains(productName).getByTestId("product-quantity");

  getDeleteProductButton = (productName: string) =>
    cy.get("tr").contains(productName).get(".btn-danger");

  deleteProduct = (productName: string) =>
    this.getDeleteProductButton(productName).click();

  changeQuantity = (productName: string, newQuantity: string) => {
    this.getProductQuantityInput(productName).clear();
    this.getProductQuantityInput(productName).type(newQuantity);
    this.getProductQuantityInput(productName).blur();
  };
}
