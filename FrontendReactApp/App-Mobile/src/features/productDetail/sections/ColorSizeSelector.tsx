import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { productDetailTheme as t } from '../theme/productDetail.theme';
import { IconCheck } from '../../../shared/ui/Icons';

type Props = {
  colors: string[];
  sizes: string[];
  selectedColor: string;
  selectedSize: string;
  onColorSelect: (c: string) => void;
  onSizeSelect: (s: string) => void;
};

export function ColorSizeSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}: Props) {
  return (
    <View style={s.root}>
      {/* Color */}
      <View style={s.block}>
        <View style={s.labelRow}>
          <Text style={s.label}>Color</Text>
          <View style={[s.colorPreview, { backgroundColor: selectedColor }]} />
        </View>
        <View style={s.colorRow}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => onColorSelect(color)}
              activeOpacity={0.8}
              style={[
                s.colorBtn,
                { backgroundColor: color },
                color === '#F8FAFC' && s.lightBorder,
                selectedColor === color && s.colorBtnSelected,
              ]}
            >
              {selectedColor === color && (
                <IconCheck
                  size={12}
                  color={color === '#F8FAFC' || color === '#FFFFFF' ? '#1E3A8A' : '#fff'}
                  strokeWidth={3}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sizes */}
      <View style={s.block}>
        <View style={s.labelRow}>
          <Text style={s.label}>Size</Text>
          <TouchableOpacity>
            <Text style={s.sizeGuide}>Size guide</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.sizeRow}>
          {sizes.map((sz) => (
            <TouchableOpacity
              key={sz}
              onPress={() => onSizeSelect(sz)}
              activeOpacity={0.8}
              style={[s.sizeBtn, selectedSize === sz && s.sizeBtnSelected]}
            >
              <Text style={[s.sizeText, selectedSize === sz && s.sizeTextSelected]}>{sz}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    paddingHorizontal: t.spacing.xl,
  },
  block: {
    marginBottom: t.spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: t.spacing.md,
  },
  label: {
    fontSize: t.font.md,
    fontWeight: '600',
    color: t.colors.textPrimary,
  },
  colorPreview: {
    width: 18,
    height: 18,
    borderRadius: t.radius.full,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  sizeGuide: {
    fontSize: t.font.sm,
    color: t.colors.primaryLight,
    fontWeight: '500',
  },
  colorRow: {
    flexDirection: 'row',
    gap: t.spacing.md,
  },
  colorBtn: {
    width: 36,
    height: 36,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  lightBorder: {
    borderColor: t.colors.border,
  },
  colorBtnSelected: {
    borderColor: t.colors.primary,
  },
  sizeRow: {
    gap: t.spacing.sm,
  },
  sizeBtn: {
    minWidth: 50,
    height: 44,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.bgAlt,
    paddingHorizontal: t.spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  sizeBtnSelected: {
    backgroundColor: t.colors.primarySoft,
    borderColor: t.colors.primary,
  },
  sizeText: {
    fontSize: t.font.sm,
    fontWeight: '600',
    color: t.colors.textSecondary,
  },
  sizeTextSelected: {
    color: t.colors.primary,
  },
});