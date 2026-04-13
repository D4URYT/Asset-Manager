import { CartItem, PromoCode } from '../types/cart.types';

export const mockCartItems: CartItem[] = [
  {
    id: 'line-001',
    quantity: 1,
    product: {
      id: 'prod-001',
      name: 'Wireless Pro Headphones',
      brand: 'SoundCore',
      price: 189.99,
      imageUri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      color: '#1F2937',
      size: 'M',
    },
  },
  {
    id: 'line-002',
    quantity: 2,
    product: {
      id: 'prod-002',
      name: 'Slim Leather Wallet',
      brand: 'Montem',
      price: 54.99,
      imageUri: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
      color: '#92400E',
      size: 'S',
    },
  },
  {
    id: 'line-003',
    quantity: 1,
    product: {
      id: 'prod-003',
      name: 'Minimalist Watch',
      brand: 'Luno',
      price: 219.00,
      imageUri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      color: '#F8FAFC',
      size: 'M',
    },
  },
];

export const validPromoCodes: PromoCode[] = [
  { code: 'SAVE10', discount: 10, label: '10% discount applied 🎉' },
  { code: 'FIRST20', discount: 20, label: '20% welcome discount 🎉' },
];

export const SHIPPING_THRESHOLD = 250;
export const SHIPPING_COST = 12.99;
export const TAX_RATE = 0.07;