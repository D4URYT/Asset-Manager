import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cartTheme as t } from '../theme/cart.theme';
import { IconShield } from '../../../shared/ui/Icons';

type Props = {
  subtotal: number;
  promoSaving: number;
  shipping: number;
  tax: number;
  total: number;
};

function Row({
  label,
  value,
  highlight,
  saving,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  saving?: boolean;
}) {
  return (
    <View style={s.row}>
      <Text style={[s.rowLabel, highlight && s.labelBold]}>{label}</Text>
      <Text
        style={[
          s.rowValue,
          highlight && s.valueBold,
          saving && s.valueSaving,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export function OrderSummary({ subtotal, promoSaving, shipping, tax, total }: Props) {
  return (
    <View style={s.root}>
      <Text style={s.title}>Order Summary</Text>

      <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
      {promoSaving > 0 && (
        <Row label="Promo discount" value={`-$${promoSaving.toFixed(2)}`} saving />
      )}
      <Row
        label="Shipping"
        value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
        saving={shipping === 0}
      />
      <Row label={`Tax (7%)`} value={`$${tax.toFixed(2)}`} />

      <View style={s.divider} />

      <Row label="Total" value={`$${total.toFixed(2)}`} highlight />

      {/* Trust note */}
      <View style={s.trust}>
        <IconShield size={13} color={t.colors.primaryLight} />
        <Text style={s.trustText}>Secure checkout · SSL encrypted</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: t.colors.bgCard,
    borderRadius: t.radius.lg,
    padding: t.spacing.xl,
    borderWidth: 1,
    borderColor: t.colors.borderLight,
    ...t.shadow.card,
    marginBottom: t.spacing.lg,
  },
  title: {
    fontSize: t.font.lg,
    fontWeight: '700',
    color: t.colors.textPrimary,
    marginBottom: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.md,
  },
  rowLabel: {
    fontSize: t.font.md,
    color: t.colors.textSecondary,
    fontWeight: '400',
  },
  labelBold: {
    fontWeight: '700',
    color: t.colors.textPrimary,
    fontSize: t.font.lg,
  },
  rowValue: {
    fontSize: t.font.md,
    fontWeight: '600',
    color: t.colors.textPrimary,
  },
  valueBold: {
    fontSize: t.font.xl,
    fontWeight: '800',
    color: t.colors.primary,
  },
  valueSaving: {
    color: t.colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: t.colors.borderLight,
    marginVertical: t.spacing.md,
  },
  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.xs,
    marginTop: t.spacing.md,
  },
  trustText: {
    fontSize: t.font.xs,
    color: t.colors.textDisabled,
    fontWeight: '500',
  },
});