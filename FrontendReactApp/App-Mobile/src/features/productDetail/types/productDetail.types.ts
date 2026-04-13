export type ProductImage = {
  id: string;
  uri: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  reviews: ProductReview[];
  category: string;
  tags: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

export type ApiProductRecord = {
  id: number;
  name: string;
  default_code: string | null;
  list_price: number;
};

export type ApiProductResponse = {
  ok: boolean;
  data?: ApiProductRecord;
  error?: string;
};
