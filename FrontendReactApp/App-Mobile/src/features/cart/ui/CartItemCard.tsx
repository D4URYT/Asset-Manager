import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { CartItem } from '../types/cart.types';
import { cartTheme as t } from '../theme/cart.theme';
import { IconPlus, IconX } from '../../../shared/ui/Icons';

type Props = {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  isRemoving: boolean;
};

export function CartItemCard({ item, onIncrement, onDecrement, onRemove, isRemoving }: Props) {
  const { product, quantity } = item;

  return (
    <View style={[s.card, isRemoving && s.cardRemoving]}>
      {/* Product image */}
      <Image source={{ uri: product.imageUri }} style={s.image} resizeMode="cover" />

      {/* Info */}
      <View style={s.info}>
        <View style={s.infoTop}>
          <View style={{ flex: 1 }}>
            <Text style={s.brand}>{product.brand}</Text>
            <Text style={s.name} numberOfLines={2}>{product.name}</Text>

            {/* Variants */}
            <View style={s.variantRow}>
              <View style={[s.colorDot, { backgroundColor: product.color }]} />
              <Text style={s.variantText}>Size {product.size}</Text>
            </View>
          </View>

          {/* Remove */}
          <TouchableOpacity onPress={onRemove} activeOpacity={0.7} style={s.removeBtn}>
            <IconX size={14} color={t.colors.textDisabled} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Price + qty */}
        <View style={s.bottomRow}>
          <Text style={s.price}>${(product.price * quantity).toFixed(2)}</Text>

          <View style={s.qtyControl}>
            <TouchableOpacity onPress={onDecrement} activeOpacity={0.7} style={s.qtyBtn}>
              <Text style={s.qtyMinus}>−</Text>
            </TouchableOpacity>
            <Text style={s.qtyNum}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrement} activeOpacity={0.7} style={s.qtyBtn}>
              <IconPlus size={12} color={t.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: t.colors.bgCard,
    borderRadius: t.radius.lg,
    padding: t.spacing.md,
    marginBottom: t.spacing.md,
    borderWidth: 1,
    borderColor: t.colors.borderLight,
    ...t.shadow.card,
    opacity: 1,
  },
  cardRemoving: {
    opacity: 0.3,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.bgAlt,
  },
  info: {
    flex: 1,
    marginLeft: t.spacing.md,
    justifyContent: 'space-between',
  },
  infoTop: {
    flexDirection: 'row',
    gap: t.spacing.sm,
  },
  brand: {
    fontSize: t.font.xs,
    fontWeight: '600',
    color: t.colors.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  name: {
    fontSize: t.font.md,
    fontWeight: '600',
    color: t.colors.textPrimary,
    lineHeight: 20,
    marginBottom: t.spacing.xs,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.xs,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  variantText: {
    fontSize: t.font.xs,
    color: t.colors.textDisabled,
    fontWeight: '500',
  },
  removeBtn: {
    width: 26,
    height: 26,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: t.font.lg,
    fontWeight: '800',
    color: t.colors.primary,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.bgAlt,
    borderRadius: t.radius.sm,
    paddingHorizontal: 2,
  },
  qtyBtn: {
    width: 30,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyMinus: {
    fontSize: 18,
    fontWeight: '400',
    color: t.colors.primary,
    lineHeight: 20,
  },
  qtyNum: {
    width: 22,
    textAlign: 'center',
    fontSize: t.font.md,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
});