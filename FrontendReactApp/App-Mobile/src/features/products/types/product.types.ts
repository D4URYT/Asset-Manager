export interface Product {
  id: number;
  name: string;
  default_code: string | null;
  list_price: number;
}

export interface ProductsResponse {
  ok: boolean;
  data: Product[];
}

export interface ProductResponse {
  ok: boolean;
  data?: Product;
  error?: string;
}

export interface CreateProductPayload {
  name: string;
  default_code?: string;
  list_price?: number;
}

export interface UpdateProductPayload {
  name?: string;
  default_code?: string;
  list_price?: number;
}