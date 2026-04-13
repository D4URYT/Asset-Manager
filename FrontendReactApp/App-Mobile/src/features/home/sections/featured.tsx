import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { IconChevronRight } from '../../../shared/ui/Icons';
import { FeaturedCard } from '../ui/featuredCard';
import { colors } from '../../../shared/theme/colors';
import type { Product } from '../types/home.types';

interface FeaturedSectionProps {
  products: Product[];
  onProductPress?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
  onSeeAll?: () => void;
}

export function FeaturedSection({
  products, onProductPress, onAddToCart, onSeeAll,
}: FeaturedSectionProps) {
  if (products.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Destacados</Text>
        <TouchableOpacity style={styles.seeAll} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>Ver todo</Text>
          <IconChevronRight size={13} color={colors.brand[500]} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {products.map(p => (
          <FeaturedCard
            key={p.id}
            product={p}
            onPress={onProductPress}
            onAddToCart={onAddToCart}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 18, paddingBottom: 4 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, marginBottom: 14,
  },
  title: { fontSize: 15, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.2 },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText: { fontSize: 12.5, fontWeight: '500', color: colors.brand[500] },
  scroll: { paddingHorizontal: 20, paddingBottom: 4 },
});