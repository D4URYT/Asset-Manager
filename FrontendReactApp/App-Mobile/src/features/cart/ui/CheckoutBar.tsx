import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cartTheme as t } from '../theme/cart.theme';
import { IconArrowRight } from '../../../shared/ui/Icons';

type Props = {
  total: number;
  totalItems: number;
  onCheckout: () => void;
};

export function CheckoutBar({ total, totalItems, onCheckout }: Props) {
  return (
    <View style={s.root}>
      <TouchableOpacity onPress={onCheckout} activeOpacity={0.88} style={s.btn}>
        <View>
          <Text style={s.itemCount}>{totalItems} item{totalItems !== 1 ? 's' : ''}</Text>
          <Text style={s.label}>Proceed to Checkout</Text>
        </View>
        <View style={s.right}>
          <Text style={s.total}>${total.toFixed(2)}</Text>
          <IconArrowRight size={18} color={t.colors.white} />
        </View>
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
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.lg,
    paddingBottom: 28,
    backgroundColor: t.colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: t.colors.borderLight,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 10,
  },
  btn: {
    backgroundColor: t.colors.primary,
    borderRadius: t.radius.lg,
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...t.shadow.button,
  },
  itemCount: {
    fontSize: t.font.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  label: {
    fontSize: t.font.md,
    fontWeight: '700',
    color: t.colors.white,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  total: {
    fontSize: t.font.xl,
    fontWeight: '800',
    color: t.colors.white,
  },
});