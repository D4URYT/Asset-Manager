import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../api/productsApi';
import type { Product } from '../types/product.types';

export function useProducts() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    setError(null);
    const { data, error: err } = await productsApi.list();
    if (data?.ok && data.data) {
      setProducts(data.data);
    } else {
      setError(err ?? 'Error al cargar productos');
    }
    setIsLoading(false);
    setRefreshing(false);
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetch(true);
  }, [fetch]);

  useEffect(() => { fetch(); }, [fetch]);

  // Derived: featured = top 6 by price desc
  const featured = [...products]
    .sort((a, b) => b.list_price - a.list_price)
    .slice(0, 6);

  return { products, featured, isLoading, error, refreshing, refresh };
}

export function useProductSearch(products: Product[]) {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.default_code ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return { query, setQuery, results };
}