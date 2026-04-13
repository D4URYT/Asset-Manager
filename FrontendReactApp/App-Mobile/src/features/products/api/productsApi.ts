import { odooClient } from '../../../core/api/odooClient';
import type {
  ProductsResponse,
  ProductResponse,
  CreateProductPayload,
  UpdateProductPayload,
} from '../types/product.types';

export const productsApi = {
  list: () =>
    odooClient.get<ProductsResponse>('/api/products', { requiresAuth: true }),

  getById: (id: number) =>
    odooClient.get<ProductResponse>(`/api/products/${id}`, { requiresAuth: true }),

  create: (payload: CreateProductPayload) =>
    odooClient.post<{ ok: boolean; id: number }>('/api/products', payload, { requiresAuth: true }),

  update: (id: number, payload: UpdateProductPayload) =>
    odooClient.put<{ ok: boolean }>(`/api/products/${id}`, payload, { requiresAuth: true }),

  delete: (id: number) =>
    odooClient.delete<{ ok: boolean }>(`/api/products/${id}`, { requiresAuth: true }),
};