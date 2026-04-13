import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cartTheme as t } from '../theme/cart.theme';
import { IconZap } from '../../../shared/ui/Icons';

type Props = {
  remaining: number;
  threshold: number;
};

export function FreeShippingBanner({ remaining, threshold }: Props) {
  const progress = Math.min(1, 1 - remaining / threshold);
  const isFree = remaining === 0;

  return (
    <View style={s.root}>
      <View style={s.topRow}>
        <IconZap size={13} color={isFree ? t.colors.success : t.colors.warning} fill={isFree ? t.colors.success : t.colors.warning} />
        <Text style={[s.text, isFree && s.textSuccess]}>
          {isFree
            ? 'You unlocked free shipping! 🎉'
            : `Add $${remaining.toFixed(2)} more for free shipping`}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={s.track}>
        <View style={[s.fill, { width: `${progress * 100}%` }, isFree && s.fillSuccess]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: t.colors.warningSoft,
    borderRadius: t.radius.md,
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
    marginBottom: t.spacing.lg,
    gap: t.spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  text: {
    fontSize: t.font.sm,
    fontWeight: '600',
    color: t.colors.warning,
    flex: 1,
  },
  textSuccess: {
    color: t.colors.success,
  },
  track: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: t.radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: t.colors.warning,
    borderRadius: t.radius.full,
  },
  fillSuccess: {
    backgroundColor: t.colors.success,
  },
});