import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { colors } from '../../../shared/theme/colors';
import type { Product } from '../types/product.types';

function IconBox({ size = 24, color = colors.brand[400] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <Path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

function IconTag({ size = 12, color = colors.brand[500] }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <Circle cx="7" cy="7" r="1.5" fill={color} />
    </Svg>
  );
}

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  variant?: 'featured' | 'list';
}

export function ProductCard({ product, onPress, variant = 'list' }: ProductCardProps) {
  // Generate a consistent pastel bg from product id
  const bgPalette = [
    { bg: '#EFF6FF', icon: colors.brand[400] },
    { bg: '#F0FDF4', icon: '#22C55E' },
    { bg: '#FFF7ED', icon: '#F97316' },
    { bg: '#FDF4FF', icon: '#A855F7' },
    { bg: '#ECFEFF', icon: '#06B6D4' },
    { bg: '#FFF1F2', icon: '#F43F5E' },
  ];
  const palette = bgPalette[product.id % bgPalette.length];

  const formatPrice = (price: number) =>
    price.toLocaleString('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 });

  if (variant === 'featured') {
    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => onPress?.(product)}
        activeOpacity={0.82}
      >
        {/* Icon area */}
        <View style={[styles.featuredIconWrap, { backgroundColor: palette.bg }]}>
          <IconBox size={28} color={palette.icon} />
        </View>

        {/* Info */}
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredName} numberOfLines={2}>{product.name}</Text>
          {product.default_code && (
            <View style={styles.codeRow}>
              <IconTag size={10} color={colors.text.disabled} />
              <Text style={styles.codeText}>{product.default_code}</Text>
            </View>
          )}
          <Text style={styles.featuredPrice}>{formatPrice(product.list_price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => onPress?.(product)}
      activeOpacity={0.82}
    >
      <View style={[styles.listIconWrap, { backgroundColor: palette.bg }]}>
        <IconBox size={20} color={palette.icon} />
      </View>

      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={1}>{product.name}</Text>
        {product.default_code && (
          <Text style={styles.listCode}>#{product.default_code}</Text>
        )}
      </View>

      <Text style={styles.listPrice}>{formatPrice(product.list_price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Featured (horizontal scroll card)
  featuredCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredIconWrap: {
    width: 52, height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredInfo: { flex: 1 },
  featuredName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 18,
    marginBottom: 4,
  },
  codeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8,
  },
  codeText: {
    fontSize: 10, color: colors.text.disabled, fontWeight: '400',
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brand[600],
  },

  // List card
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: 12,
  },
  listIconWrap: {
    width: 42, height: 42,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  listInfo: { flex: 1 },
  listName: {
    fontSize: 13.5, fontWeight: '600',
    color: colors.text.primary, marginBottom: 2,
  },
  listCode: {
    fontSize: 11, color: colors.text.disabled,
  },
  listPrice: {
    fontSize: 13.5, fontWeight: '700',
    color: colors.brand[600], flexShrink: 0,
  },
});