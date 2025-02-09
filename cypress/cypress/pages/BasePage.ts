import { AlertComponent } from "../components/alert.component";
import { NavbarComponent } from "../components/navbar.component";

export abstract class BasePage {
  url: string;

  navbar = new NavbarComponent();
  alert = new AlertComponent();

  visit = (id = "") => cy.visit(`${this.url}${id}`);
}
