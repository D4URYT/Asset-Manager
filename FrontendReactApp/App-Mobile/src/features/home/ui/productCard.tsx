import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { IconHeart, IconPlus } from '../../../shared/ui/Icons';
import { StarRating } from './starRating';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';
import type { Product } from '../types/home.types';

// Dynamic category icon labels
import { IconMonitor, IconSmartphone, IconShirt, IconGrid } from '../../../shared/ui/Icons';

function CategoryIcon({ category }: { category?: string }) {
  const c = colors.text.disabled;
  const s = 9;
  switch (category) {
    case 'Tecnología': return <IconMonitor size={s} color={c} />;
    case 'Accesorios': return <IconSmartphone size={s} color={c} />;
    case 'Moda':       return <IconShirt size={s} color={c} />;
    default:           return <IconGrid size={s} color={c} />;
  }
}

interface ProductCardProps {
  product: Product;
  onPress?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
  onToggleFav?: (id: number) => void;
}

export function ProductCard({ product, onPress, onAddToCart, onToggleFav }: ProductCardProps) {
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
        <TouchableOpacity
          style={[styles.fav, product.is_favorite && styles.favOn]}
          onPress={() => onToggleFav?.(product.id)}
        >
          <IconHeart
            size={13}
            color={product.is_favorite ? colors.error.default : colors.text.disabled}
            fill={product.is_favorite ? colors.error.default : 'none'}
            strokeWidth={1.8}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <View style={styles.catRow}>
          <CategoryIcon category={product.category} />
          <Text style={styles.catText}>{product.category ?? 'General'}</Text>
        </View>
        {product.rating && (
          <View style={styles.starsRow}>
            <StarRating rating={product.rating} size={11} />
            {product.review_count && (
              <Text style={styles.reviewCount}>({product.review_count})</Text>
            )}
          </View>
        )}
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.list_price)}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart?.(product)}>
            <IconPlus size={14} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.brand[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imgWrap: { height: 130, position: 'relative' },
  img: { width: '100%', height: '100%' },
  fav: {
    position: 'absolute', top: 8, right: 8,
    width: 28, height: 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border.light,
  },
  favOn: {
    borderColor: colors.error.soft,
    backgroundColor: '#fff',
  },
  body: { padding: 10 },
  name: {
    fontSize: 12.5, fontWeight: '600',
    color: colors.text.primary, marginBottom: 3,
  },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 6 },
  catText: { fontSize: 10, color: colors.text.disabled },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 7 },
  reviewCount: { fontSize: 10, color: colors.text.disabled },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 14, fontWeight: '700', color: colors.text.primary },
  addBtn: {
    width: 28, height: 28,
    backgroundColor: colors.brand[600],
    borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
});