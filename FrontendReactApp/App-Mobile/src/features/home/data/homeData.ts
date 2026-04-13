import type { Category } from '../types/home.types';

export const CATEGORIES: Category[] = [
  { id: 'all',        label: 'Todo',       icon: 'grid' },
  { id: 'tech',       label: 'Tech',       icon: 'monitor' },
  { id: 'services',   label: 'Servicios',  icon: 'settings' },
  { id: 'clothing',   label: 'Ropa',       icon: 'shirt' },
  { id: 'home',       label: 'Hogar',      icon: 'home' },
  { id: 'mobile',     label: 'Móviles',    icon: 'smartphone' },
];

// Real product images from Unsplash (free, no auth needed)
export const PRODUCT_IMAGES: Record<string, string> = {
  macbook:   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format',
  iphone:    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  headphones:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format',
  watch:     'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&auto=format',
  monitor:   'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&auto=format',
  keyboard:  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&auto=format',
  camera:    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop&auto=format',
  laptop:    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop&auto=format',
  speaker:   'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400&h=300&fit=crop&auto=format',
  shoes:     'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format',
  tablet:    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format',
  drone:     'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop&auto=format',
};

// Assign a consistent image to a product based on its id
const IMAGE_KEYS = Object.keys(PRODUCT_IMAGES);
export function getProductImage(productId: number): string {
  return PRODUCT_IMAGES[IMAGE_KEYS[productId % IMAGE_KEYS.length]];
}