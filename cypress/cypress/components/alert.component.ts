export class AlertComponent {
  getMessage = () => cy.get("#toast-container > div");

  close = () => this.getMessage().click({ force: true });
}
