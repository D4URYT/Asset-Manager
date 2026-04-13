import type { Product } from '../types/productDetail.types';

export const mockProduct: Product = {
  id: 'prod-001',
  name: 'Wireless Pro Headphones',
  brand: 'SoundCore',
  description:
    'Engineered for audiophiles who demand more. Active noise cancellation, 40-hour battery life, and premium Hi-Res Audio support.',
  price: 189.99,
  originalPrice: 249.99,
  discount: 24,
  rating: 4.8,
  reviewCount: 1243,
  inStock: true,
  category: 'Electronics',
  tags: ['wireless', 'noise-cancelling', 'hi-res'],
  images: [
    { id: 'img-1', uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' },
    { id: 'img-2', uri: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600' },
    { id: 'img-3', uri: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600' },
  ],
  colors: ['#1F2937', '#1E3A8A', '#DC2626', '#F8FAFC'],
  sizes: ['S', 'M', 'L', 'XL'],
  reviews: [
    {
      id: 'rev-1',
      author: 'Carlos M.',
      rating: 5,
      comment: 'Exceptional sound quality. Best headphones I have ever owned.',
      date: '2024-11-15',
    },
    {
      id: 'rev-2',
      author: 'Laura P.',
      rating: 5,
      comment: 'The noise cancellation is unreal. Perfect for the office.',
      date: '2024-11-08',
    },
  ],
};
