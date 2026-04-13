import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import {
  IconGrid, IconMonitor, IconSettings,
  IconShirt, IconHome, IconSmartphone,
} from '../../../shared/ui/Icons';
import { CATEGORIES } from '../data/homeData';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

function ChipIcon({ icon, active }: { icon: string; active: boolean }) {
  const c = active ? '#fff' : colors.text.tertiary;
  const s = 13;
  switch (icon) {
    case 'grid':       return <IconGrid size={s} color={c} />;
    case 'monitor':    return <IconMonitor size={s} color={c} />;
    case 'settings':   return <IconSettings size={s} color={c} strokeWidth={1.6} />;
    case 'shirt':      return <IconShirt size={s} color={c} />;
    case 'smartphone': return <IconSmartphone size={s} color={c} />;
    default:           return <IconGrid size={s} color={c} />;
  }
}

interface CategoriesSectionProps {
  active: string;
  onSelect: (id: string) => void;
}

export function CategoriesSection({ active, onSelect }: CategoriesSectionProps) {
  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {CATEGORIES.map(cat => {
          const isActive = active === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.75}
            >
              <ChipIcon icon={cat.icon} active={isActive} />
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 13, paddingVertical: 7,
    backgroundColor: colors.background.primary,
    borderWidth: 1.5, borderColor: colors.border.light,
    borderRadius: radius.full,
  },
  chipActive: {
    backgroundColor: colors.brand[600],
    borderColor: colors.brand[600],
  },
  chipText: {
    fontSize: 12, fontWeight: '500',
    color: colors.text.tertiary,
  },
  chipTextActive: {
    color: '#fff', fontWeight: '600',
  },
});