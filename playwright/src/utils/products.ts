import { Product, ProductResponse } from '../models/product.model';
import {
  addToCart,
  createCart,
  getProduct,
  searchProducts,
} from './api-requests';

export const getProductByName = async (
  name: string,
): Promise<ProductResponse> => {
  const searchResult = await searchProducts(name);
  const productId = searchResult.data[0].id;
  const product = await getProduct(productId);
  return product;
};

export const initCart = async (products: Array<Product>): Promise<string> => {
  const cart = await createCart();
  const cartId = cart.id;
  const addToCartPromises = products.map((product) =>
    addToCart(cartId, product),
  );
  await Promise.all(addToCartPromises);
  return cartId;
};
