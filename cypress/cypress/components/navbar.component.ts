export class NavbarComponent {
  getCart = () => cy.getByTestId("nav-cart");
  getCartQuantity = () => cy.getByTestId("cart-quantity");
  goToCart = () => this.getCart().click();
  userMenu = () => cy.getByTestId("nav-menu");
  userMenuItems = {
    logOut: () => cy.getByTestId("nav-sign-out"),
  };

  logOut = () => {
    this.userMenu().click();
    this.userMenuItems.logOut().click();
  };
}
