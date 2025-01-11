import { Product } from "../models/product.model";
import { User } from "../models/user.model";

const baseUrl = Cypress.env("apiUrl");

export const searchProducts = (name: string) => {
  return cy.request(`${baseUrl}/products/search/?q=${name}`);
};

export const getProduct = (id: string) => {
  return cy.request(`${baseUrl}/products/${id}`);
};

export const createCart = () => {
  return cy.request("POST", `${baseUrl}/carts`);
};

export const addToCart = (cartId: string, product: Product) => {
  return cy.request("POST", `${baseUrl}/carts/${cartId}`, {
    product_id: product.id,
    quantity: product.quantity,
  });
};

export const login = (user: User) => {
  return cy.request("POST", "login", {
    email: user.email,
    password: user.password,
  });
};
