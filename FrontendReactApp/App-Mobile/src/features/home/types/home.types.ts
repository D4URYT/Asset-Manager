export interface Product {
  id: number;
  name: string;
  default_code: string | null;
  list_price: number;
  category?: string;
  image_url?: string;
  rating?: number;
  review_count?: number;
  badge?: 'sale' | 'new' | null;
  discount_percent?: number;
  is_favorite?: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: 'grid' | 'monitor' | 'settings' | 'shirt' | 'home' | 'smartphone';
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