export type CartProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUri: string;
  color: string;
  size: string;
};

export type CartItem = {
  id: string; // unique cart line id
  product: CartProduct;
  quantity: number;
};

export type PromoCode = {
  code: string;
  discount: number; // percentage
  label: string;
};