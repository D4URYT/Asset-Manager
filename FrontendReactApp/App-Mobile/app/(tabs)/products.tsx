<<<<<<< HEAD
import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, RefreshControl,
} from 'react-native';
import { useProducts, useProductSearch } from '../../src/features/products/hooks/useProducts';
import { ProductCard } from '../../src/features/products/components/ProductCard';
import { SearchBar } from '../../src/shared/ui/SearchBar';
import { colors } from '../../src/shared/theme/colors';

export default function ProductsTab() {
  const { products, isLoading, error, refreshing, refresh } = useProducts();
  const { query, setQuery, results } = useProductSearch(products);

  return (
    <View style={styles.root}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo</Text>
        <Text style={styles.subtitle}>{products.length} productos disponibles</Text>
        <View style={{ marginTop: 14 }}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      </View>

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.brand[500]}
          />
        }
      >
        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator color={colors.brand[500]} size="large" />
          </View>
        )}

        {!isLoading && error && (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !error && results.map(p => (
          <ProductCard key={p.id} product={p} variant="list" />
        ))}

        {!isLoading && !error && results.length === 0 && query.length > 0 && (
          <View style={styles.center}>
            <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  list: { flex: 1 },
  listContent: { padding: 20 },
  center: { alignItems: 'center', paddingTop: 60, gap: 12 },
  errorText: { fontSize: 14, color: colors.error.default, textAlign: 'center' },
  emptyText: { fontSize: 14, color: colors.text.tertiary },
  retryBtn: {
    backgroundColor: colors.brand[600],
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: { color: '#fff', fontSize: 13.5, fontWeight: '600' },
});
=======
import React from "react";
import { useRouter } from "expo-router";
import { ProductsScreen } from "../../src/features/products/ProductsScreen";
import { useCart } from "../../src/features/cart/hooks/useCart";
import type { Product } from "../../src/features/home/types/home.types";

export default function ProductsTab() {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductPress = (product: Product) => {
    router.push(`/product-detail/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ product, quantity: 1 });
  };

  return (
    <ProductsScreen
      onProductPress={handleProductPress}
      onAddToCart={handleAddToCart}
    />
  );
}
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
