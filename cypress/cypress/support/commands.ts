/// <reference types="cypress" />

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId(selector: string, ...arg: Array<any>): Chainable<any>;
  }
}
