import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { productDetailTheme as t } from '../theme/productDetail.theme';
import { IconPlus, IconArrowRight, IconCheck } from '../../../shared/ui/Icons';

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  cartAdded: boolean;
  price: number;
};

export function AddToCartBar({
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
  cartAdded,
  price,
}: Props) {
  return (
    <View style={s.root}>
      {/* Quantity control */}
      <View style={s.qtyControl}>
        <TouchableOpacity onPress={onDecrement} activeOpacity={0.7} style={s.qtyBtn}>
          <Text style={s.qtyOp}>−</Text>
        </TouchableOpacity>
        <Text style={s.qtyNum}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrement} activeOpacity={0.7} style={s.qtyBtn}>
          <IconPlus size={14} color={t.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Add to cart button */}
      <TouchableOpacity
        onPress={onAddToCart}
        activeOpacity={0.88}
        style={[s.ctaBtn, cartAdded && s.ctaBtnSuccess]}
      >
        {cartAdded ? (
          <>
            <IconCheck size={16} color="#fff" strokeWidth={2.5} />
            <Text style={s.ctaText}>Added!</Text>
          </>
        ) : (
          <>
            <Text style={s.ctaText}>Add to Cart · ${(price * quantity).toFixed(2)}</Text>
            <IconArrowRight size={16} color="#fff" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.lg,
    paddingBottom: 28,
    backgroundColor: t.colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: t.colors.borderLight,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.bgAlt,
    borderRadius: t.radius.md,
    paddingHorizontal: 4,
    height: 48,
  },
  qtyBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.sm,
  },
  qtyOp: {
    fontSize: 20,
    fontWeight: '400',
    color: t.colors.primary,
    lineHeight: 22,
  },
  qtyNum: {
    width: 28,
    textAlign: 'center',
    fontSize: t.font.lg,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
  ctaBtn: {
    flex: 1,
    height: 50,
    backgroundColor: t.colors.primary,
    borderRadius: t.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.sm,
    ...t.shadow.button,
  },
  ctaBtnSuccess: {
    backgroundColor: t.colors.success,
  },
  ctaText: {
    fontSize: t.font.md,
    fontWeight: '700',
    color: t.colors.white,
    letterSpacing: 0.2,
  },
});