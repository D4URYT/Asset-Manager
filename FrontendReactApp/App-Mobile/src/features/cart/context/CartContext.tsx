import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { CartItem, CartProduct, PromoCode } from '../types/cart.types';
import {
  mockCartItems,
  validPromoCodes,
  SHIPPING_THRESHOLD,
  SHIPPING_COST,
  TAX_RATE,
} from '../data/mockCart.data';
import type { Product as DetailProduct } from '../../productDetail/types/productDetail.types';
import type { Product as HomeProduct } from '../../home/types/home.types';

type CartProductSource = HomeProduct | DetailProduct;

type AddToCartPayload = {
  product: CartProductSource;
  quantity?: number;
  color?: string;
  size?: string;
  imageUri?: string;
};

interface CartContextValue {
  items: CartItem[];
  promoInput: string;
  setPromoInput: (value: string) => void;
  appliedPromo: null | PromoCode;
  promoError: string;
  removingId: string | null;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  applyPromo: () => void;
  removePromo: () => void;
  subtotal: number;
  promoSaving: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
  freeShippingRemaining: number;
  SHIPPING_THRESHOLD: number;
  addToCart: (payload: AddToCartPayload) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900';
const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

const isDetailProduct = (product: CartProductSource): product is DetailProduct =>
  'images' in product && Array.isArray(product.images);

function normalizeProduct(payload: AddToCartPayload): CartProduct {
  const { product, color, size, imageUri } = payload;
  const basePrice = 'price' in product ? product.price : product.list_price ?? 0;
  const normalizedColor =
    color ?? (isDetailProduct(product) ? product.colors[0] : undefined) ?? '#111827';
  const normalizedSize =
    size ?? (isDetailProduct(product) ? product.sizes[0] : undefined) ?? 'M';
  const normalizedImage =
    imageUri ??
    (isDetailProduct(product)
      ? product.images[0]?.uri
      : product.image_url) ??
    FALLBACK_IMAGE;
  const brand =
    'brand' in product && product.brand
      ? product.brand
      : product.default_code ?? 'Marca';
  const name = product.name ?? 'Producto';

  return {
    id: String(product.id),
    name,
    brand,
    price: Number(basePrice ?? 0),
    imageUri: normalizedImage,
    color: normalizedColor,
    size: normalizedSize,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<null | PromoCode>(null);
  const [promoError, setPromoError] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item
      )
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  }, []);

  const applyPromo = useCallback(() => {
    const found = validPromoCodes.find(
      (promo) => promo.code.toUpperCase() === promoInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedPromo(found);
      setPromoError('');
    } else {
      setAppliedPromo(null);
      setPromoError('Invalid promo code. Try SAVE10 or FIRST20.');
    }
  }, [promoInput]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  }, []);

  const addToCart = useCallback((payload: AddToCartPayload) => {
    const normalized = normalizeProduct(payload);
    const quantityToAdd = Math.min(
      Math.max(payload.quantity ?? 1, MIN_QUANTITY),
      MAX_QUANTITY
    );

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === normalized.id &&
          item.product.color === normalized.color &&
          item.product.size === normalized.size
      );

      if (existingIndex >= 0) {
        return prev.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantityToAdd, MAX_QUANTITY),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          product: normalized,
          quantity: quantityToAdd,
        },
      ];
    });
  }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [items]
  );

  const promoSaving = useMemo(
    () => (appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0),
    [subtotal, appliedPromo]
  );

  const taxable = subtotal - promoSaving;
  const shipping = taxable >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = taxable * TAX_RATE;
  const total = taxable + tax + shipping;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - taxable);

  const value = useMemo(
    () => ({
      items,
      promoInput,
      setPromoInput,
      appliedPromo,
      promoError,
      removingId,
      increment,
      decrement,
      removeItem,
      applyPromo,
      removePromo,
      subtotal,
      promoSaving,
      shipping,
      tax,
      total,
      totalItems,
      freeShippingRemaining,
      SHIPPING_THRESHOLD,
      addToCart,
    }),
    [
      items,
      promoInput,
      appliedPromo,
      promoError,
      removingId,
      increment,
      decrement,
      removeItem,
      applyPromo,
      removePromo,
      subtotal,
      promoSaving,
      shipping,
      tax,
      total,
      totalItems,
      freeShippingRemaining,
      addToCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
