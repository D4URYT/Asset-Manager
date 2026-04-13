import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { IconSliders } from '../../../shared/ui/Icons';
import { ProductCard } from '../ui/productCard';
import { colors } from '../../../shared/theme/colors';
import type { Product } from '../types/home.types';

interface ProductsGridSectionProps {
  products: Product[];
  isLoading?: boolean;
  onProductPress?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
  onToggleFav?: (id: number) => void;
  onFilter?: () => void;
}

export function ProductsGridSection({
  products, isLoading,
  onProductPress, onAddToCart, onToggleFav, onFilter,
}: ProductsGridSectionProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Todo el catálogo</Text>
          <Text style={styles.count}>{products.length} productos</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={onFilter}>
          <IconSliders size={13} color={colors.brand[500]} strokeWidth={1.8} />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.brand[500]} />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Sin resultados</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {products.map(p => (
            <View key={p.id} style={styles.gridItem}>
              <ProductCard
                product={p}
                onPress={onProductPress}
                onAddToCart={onAddToCart}
                onToggleFav={onToggleFav}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingTop: 18 },
  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', marginBottom: 14,
  },
  title: { fontSize: 15, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.2 },
  count: { fontSize: 11, color: colors.text.disabled, marginTop: 2 },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: colors.brand[50],
    borderRadius: 20, borderWidth: 1, borderColor: colors.brand[100],
  },
  filterText: { fontSize: 12, fontWeight: '500', color: colors.brand[500] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { width: '47.5%' },
  loading: { paddingVertical: 40, alignItems: 'center' },
  empty: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { fontSize: 14, color: colors.text.disabled },
});