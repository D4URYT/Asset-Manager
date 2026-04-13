import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cartTheme as t } from '../theme/cart.theme';
import { IconShoppingBag, IconArrowRight } from '../../../shared/ui/Icons';

type Props = { onContinue: () => void };

export function EmptyCart({ onContinue }: Props) {
  return (
    <View style={s.root}>
      <View style={s.iconWrap}>
        <IconShoppingBag size={40} color={t.colors.primaryLight} />
      </View>
      <Text style={s.title}>Your cart is empty</Text>
      <Text style={s.subtitle}>Looks like you haven't added anything yet. Let's fix that.</Text>
      <TouchableOpacity onPress={onContinue} activeOpacity={0.85} style={s.btn}>
        <Text style={s.btnText}>Start Shopping</Text>
        <IconArrowRight size={16} color={t.colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.spacing.xxxl,
    gap: t.spacing.lg,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: t.spacing.sm,
  },
  title: {
    fontSize: t.font.xxl,
    fontWeight: '700',
    color: t.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: t.font.md,
    color: t.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    backgroundColor: t.colors.primary,
    paddingHorizontal: t.spacing.xxl,
    paddingVertical: t.spacing.lg,
    borderRadius: t.radius.lg,
    marginTop: t.spacing.sm,
    ...t.shadow.button,
  },
  btnText: {
    fontSize: t.font.md,
    fontWeight: '700',
    color: t.colors.white,
  },
});