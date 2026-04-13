import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ProductDetailPage } from '../../../src/features/productDetail/ProductDetailPage';

export default function ProductDetailRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();

  const rawId = Array.isArray(id) ? id[0] : id;
  const productId = rawId ? Number(rawId) : null;

  return (
    <ProductDetailPage
      productId={Number.isFinite(productId ?? NaN) ? productId : null}
      navigation={{
        goBack: () => router.back(),
      }}
    />
  );
}
