import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  url = "/";

  getProductCard = (name: string) =>
    cy.getByTestId("product-name").contains(name);

  goToProduct = (name: string) => this.getProductCard(name).click();
}
