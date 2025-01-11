export abstract class BasePage {
  url: string;

  getAlert = () => cy.get("#toast-container > div");

  navbar = {
    getCart: () => cy.getByTestId("nav-cart"),
    getCartQuantity: () => cy.getByTestId("cart-quantity"),
    goToCart: () => this.navbar.getCart().click(),
    userMenu: () => cy.getByTestId("nav-menu"),
    userMenuItems: {
      logOut: () => cy.getByTestId("nav-sign-out"),
    },
  };

  visit = (id = "") => cy.visit(`${this.url}${id}`);

  closeAlert = () => this.getAlert().click({ force: true });

  logOut = () => {
    this.navbar.userMenu().click();
    this.navbar.userMenuItems.logOut().click();
  };
}
