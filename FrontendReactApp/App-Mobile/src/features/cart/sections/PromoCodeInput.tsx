import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { cartTheme as t } from '../theme/cart.theme';
import { IconCheck, IconX } from '../../../shared/ui/Icons';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onApply: () => void;
  onRemove: () => void;
  applied: { discount: number; label: string } | null;
  error: string;
};

export function PromoCodeInput({ value, onChange, onApply, onRemove, applied, error }: Props) {
  if (applied) {
    return (
      <View style={s.appliedRow}>
        <View style={s.appliedBadge}>
          <IconCheck size={13} color={t.colors.success} strokeWidth={2.5} />
          <Text style={s.appliedText}>{applied.label}</Text>
        </View>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.7} style={s.removePromo}>
          <IconX size={13} color={t.colors.textDisabled} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <View style={[s.inputRow, !!error && s.inputRowError]}>
        <TextInput
          style={s.input}
          placeholder="Promo code"
          placeholderTextColor={t.colors.textDisabled}
          value={value}
          onChangeText={onChange}
          autoCapitalize="characters"
          returnKeyType="done"
          onSubmitEditing={onApply}
        />
        <TouchableOpacity onPress={onApply} activeOpacity={0.8} style={s.applyBtn}>
          <Text style={s.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={s.errorText}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  root: { gap: t.spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: t.colors.border,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.bgCard,
    overflow: 'hidden',
  },
  inputRowError: { borderColor: t.colors.error },
  input: {
    flex: 1,
    height: 46,
    paddingHorizontal: t.spacing.lg,
    fontSize: t.font.md,
    color: t.colors.textPrimary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  applyBtn: {
    paddingHorizontal: t.spacing.lg,
    height: 46,
    backgroundColor: t.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: t.font.sm,
    fontWeight: '700',
    color: t.colors.primary,
  },
  errorText: {
    fontSize: t.font.xs,
    color: t.colors.error,
    marginTop: 2,
    paddingLeft: 2,
  },
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: t.colors.successSoft,
    borderRadius: t.radius.md,
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
  },
  appliedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    flex: 1,
  },
  appliedText: {
    fontSize: t.font.sm,
    fontWeight: '600',
    color: t.colors.success,
  },
  removePromo: {
    width: 26,
    height: 26,
    borderRadius: t.radius.full,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});