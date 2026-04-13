import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../data/productsApi';
import { getProductImage } from '../data/homeData';
import type { Product } from '../types/home.types';

// ── useProducts ───────────────────────────────────────────────

export function useProducts() {
  const [products, setProducts]     = useState<Product[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    setError(null);

    const { data, error: err } = await productsApi.list();

    if (data?.ok && data.data) {
      // Enrich with client-side data (images, ratings, badges)
      const enriched: Product[] = data.data.map((p, i) => ({
        ...p,
        image_url:      getProductImage(p.id),
        rating:         3.5 + (p.id % 3) * 0.5,          // 3.5 – 5.0
        review_count:   20 + (p.id % 80),
        badge:          i % 5 === 0 ? 'sale' : i % 7 === 0 ? 'new' : null,
        discount_percent: i % 5 === 0 ? 10 + (i % 20) : undefined,
        is_favorite:    false,
        category:       ['Tecnología', 'Accesorios', 'Moda', 'Hogar', 'Servicios'][i % 5],
      }));
      setProducts(enriched);
    } else {
      setError(err ?? 'No se pudieron cargar los productos');
    }

    setIsLoading(false);
    setRefreshing(false);
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load(true);
  }, [load]);

  const toggleFavorite = useCallback((id: number) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, is_favorite: !p.is_favorite } : p)
    );
  }, []);

  useEffect(() => { load(); }, [load]);

  // Derived slices
  const featured = [...products].sort((a, b) => b.list_price - a.list_price).slice(0, 6);

  return { products, featured, isLoading, error, refreshing, refresh, toggleFavorite };
}

// ── useProductSearch ──────────────────────────────────────────

export function useProductSearch(products: Product[]) {
  const [query, setQuery]           = useState('');
  const [activeCategory, setActive] = useState('all');

  const filtered = products.filter(p => {
    const matchesQuery =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.default_code ?? '').toLowerCase().includes(query.toLowerCase());

    const matchesCat =
      activeCategory === 'all' ||
      (activeCategory === 'tech'     && p.category === 'Tecnología') ||
      (activeCategory === 'services' && p.category === 'Servicios') ||
      (activeCategory === 'clothing' && p.category === 'Moda') ||
      (activeCategory === 'home'     && p.category === 'Hogar') ||
      (activeCategory === 'mobile'   && p.category === 'Accesorios');

    return matchesQuery && matchesCat;
  });

  return { query, setQuery, activeCategory, setActive, filtered };
}