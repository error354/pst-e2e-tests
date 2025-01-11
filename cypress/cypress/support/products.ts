import { Product, ProductResponse } from "../models/product.model";
import { searchProducts, getProduct, createCart, addToCart } from "./api";

export const getProductByName = (
  name: string,
): Cypress.Chainable<ProductResponse> => {
  return searchProducts(name).then((resp) => {
    const firstResultId = resp.body.data[0].id;
    return getProduct(firstResultId).then((resp) => {
      return resp.body;
    });
  });
};

export const initCart = (products: Array<Product>) => {
  return createCart().then((resp) => {
    const cartId = resp.body.id;
    cy.window().then(() => {
      sessionStorage.setItem("cart_id", cartId);
    });
    const addToCartPromises = products.map((product) =>
      addToCart(cartId, product),
    );
    return Promise.all(addToCartPromises).then(() => {
      return cartId;
    });
  });
};
