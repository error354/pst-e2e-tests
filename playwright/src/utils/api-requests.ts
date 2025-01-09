import { request, APIRequestContext } from '@playwright/test';
import { Product, ProductResponse } from '../models/product.model';
import { User } from '../models/user.model';

const createApiRequestContext = async (): Promise<APIRequestContext> => {
  return await request.newContext({
    baseURL: process.env.API_URL,
  });
};

const getRequest = async <T>(url: string): Promise<T> => {
  const apiRequestContext = await createApiRequestContext();
  const resp = await apiRequestContext.get(url);
  return await resp.json();
};

const postRequest = async <T>(url: string, body = {}): Promise<T> => {
  const apiRequestContext = await createApiRequestContext();
  const resp = await apiRequestContext.post(url, { data: body });
  return await resp.json();
};

export const searchProducts = async (
  name: string,
): Promise<{ data: [{ id: string }] }> => {
  return await getRequest(`/products/search/?q=${name}`);
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
  return await getRequest(`/products/${id}`);
};

export const createCart = async (): Promise<{ id: string }> => {
  return await postRequest('/carts');
};

export const addToCart = async <T>(
  cartId: string,
  product: Product,
): Promise<T> => {
  return await postRequest(`carts/${cartId}`, {
    product_id: product.id,
    quantity: product.quantity,
  });
};

export const login = async (user: User): Promise<{ access_token: string }> => {
  return await postRequest('login', {
    email: user.email,
    password: user.password,
  });
};
