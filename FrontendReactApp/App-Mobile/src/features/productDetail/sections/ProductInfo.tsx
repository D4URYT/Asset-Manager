import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/productDetail.types';
import { productDetailTheme as t } from '../theme/productDetail.theme';
import { IconStar, IconStarEmpty, IconHeart, IconShield, IconZap } from '../../../shared/ui/Icons';

type Props = {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <View style={s.starRow}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(rating) ? (
          <IconStar key={i} size={13} />
        ) : (
          <IconStarEmpty key={i} size={13} />
        )
      )}
    </View>
  );
}

export function ProductInfo({ product, isWishlisted, onToggleWishlist }: Props) {
  return (
    <View style={s.root}>
      {/* Brand + wishlist */}
      <View style={s.topRow}>
        <View style={s.brandBadge}>
          <Text style={s.brandText}>{product.brand}</Text>
        </View>
        <TouchableOpacity onPress={onToggleWishlist} activeOpacity={0.75} style={s.wishBtn}>
          <IconHeart
            size={20}
            color={isWishlisted ? '#EF4444' : '#CBD5E1'}
            fill={isWishlisted ? '#EF4444' : 'none'}
          />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={s.name}>{product.name}</Text>

      {/* Rating */}
      <View style={s.ratingRow}>
        <StarRow rating={product.rating} />
        <Text style={s.ratingNum}>{product.rating}</Text>
        <Text style={s.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
      </View>

      {/* Price */}
      <View style={s.priceRow}>
        <Text style={s.price}>${product.price.toFixed(2)}</Text>
        {product.originalPrice && (
          <Text style={s.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
        )}
        {product.discount && (
          <View style={s.discountBadge}>
            <IconZap size={10} color="#10B981" fill="#10B981" />
            <Text style={s.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
      </View>

      {/* In stock badge */}
      <View style={s.stockRow}>
        <View style={[s.stockDot, !product.inStock && s.stockDotOff]} />
        <Text style={[s.stockText, !product.inStock && s.stockTextOff]}>
          {product.inStock ? 'In stock · Ready to ship' : 'Out of stock'}
        </Text>
      </View>

      {/* Description */}
      <Text style={s.desc}>{product.description}</Text>

      {/* Trust badges */}
      <View style={s.trustRow}>
        <View style={s.trustItem}>
          <IconShield size={14} color={t.colors.primaryLight} />
          <Text style={s.trustText}>2 year warranty</Text>
        </View>
        <View style={s.trustDivider} />
        <View style={s.trustItem}>
          <IconZap size={14} color={t.colors.primaryLight} />
          <Text style={s.trustText}>Fast delivery</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    paddingHorizontal: t.spacing.xl,
    paddingTop: t.spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.md,
  },
  brandBadge: {
    backgroundColor: t.colors.primarySoft,
    paddingHorizontal: t.spacing.md,
    paddingVertical: 4,
    borderRadius: t.radius.full,
  },
  brandText: {
    fontSize: t.font.xs,
    fontWeight: '600',
    color: t.colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  wishBtn: {
    width: 38,
    height: 38,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: t.font.xxl,
    fontWeight: '700',
    color: t.colors.textPrimary,
    lineHeight: 30,
    marginBottom: t.spacing.sm,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.xs,
    marginBottom: t.spacing.lg,
  },
  ratingNum: {
    fontSize: t.font.sm,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
  reviewCount: {
    fontSize: t.font.sm,
    color: t.colors.textDisabled,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
    marginBottom: t.spacing.md,
  },
  price: {
    fontSize: t.font.xxxl,
    fontWeight: '800',
    color: t.colors.primary,
  },
  originalPrice: {
    fontSize: t.font.lg,
    fontWeight: '400',
    color: t.colors.textDisabled,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: t.colors.successSoft,
    paddingHorizontal: t.spacing.sm,
    paddingVertical: 3,
    borderRadius: t.radius.full,
  },
  discountText: {
    fontSize: t.font.xs,
    fontWeight: '700',
    color: t.colors.success,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.xs,
    marginBottom: t.spacing.lg,
  },
  stockDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: t.colors.success,
  },
  stockDotOff: { backgroundColor: t.colors.error },
  stockText: {
    fontSize: t.font.sm,
    color: t.colors.success,
    fontWeight: '500',
  },
  stockTextOff: { color: t.colors.error },
  desc: {
    fontSize: t.font.md,
    color: t.colors.textSecondary,
    lineHeight: 23,
    marginBottom: t.spacing.xl,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.bgAlt,
    borderRadius: t.radius.md,
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.lg,
    marginBottom: t.spacing.xl,
  },
  trustItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.xs,
  },
  trustDivider: {
    width: 1,
    height: 20,
    backgroundColor: t.colors.border,
  },
  trustText: {
    fontSize: t.font.sm,
    color: t.colors.textSecondary,
    fontWeight: '500',
  },
});