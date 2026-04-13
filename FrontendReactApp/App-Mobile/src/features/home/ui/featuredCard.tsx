import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { IconPlus } from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';
import type { Product } from '../types/home.types';

interface FeaturedCardProps {
  product: Product;
  onPress?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
}

export function FeaturedCard({ product, onPress, onAddToCart }: FeaturedCardProps) {
  const formatPrice = (n: number) =>
    n.toLocaleString('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 0 });

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)} activeOpacity={0.84}>
      {/* Image */}
      <View style={styles.imgWrap}>
        <Image
          source={{ uri: product.image_url }}
          style={styles.img}
          resizeMode="cover"
        />
        {product.badge && (
          <View style={[styles.badge, product.badge === 'new' ? styles.badgeNew : styles.badgeSale]}>
            <Text style={styles.badgeText}>
              {product.badge === 'new' ? 'Nuevo' : `-${product.discount_percent}%`}
            </Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        {product.default_code && (
          <Text style={styles.code}>#{product.default_code}</Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.list_price)}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart?.(product)}>
            <IconPlus size={13} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 155,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
    marginRight: 12,
    shadowColor: colors.brand[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imgWrap: { height: 110, position: 'relative' },
  img: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute', top: 8, left: 8,
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgeSale: { backgroundColor: colors.error.default },
  badgeNew:  { backgroundColor: colors.success.default },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },
  body: { padding: 10 },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 17,
    marginBottom: 2,
  },
  code:  { fontSize: 10, color: colors.text.disabled, marginBottom: 8 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 13.5, fontWeight: '700', color: colors.brand[600] },
  addBtn: {
    width: 26, height: 26,
    backgroundColor: colors.brand[600],
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});