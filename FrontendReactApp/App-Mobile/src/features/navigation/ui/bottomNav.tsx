import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import {
  IconHome, IconPackage, IconShoppingBag, IconFileText,
} from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';
import type { TabName } from '../hooks/useNavDrawer';

interface TabConfig {
  name: TabName;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string; fill?: string; strokeWidth?: number }>;
  badge?: number;
}

const TABS: TabConfig[] = [
  { name: 'home',     label: 'Inicio',    Icon: IconHome },
  { name: 'products', label: 'Productos', Icon: IconPackage },
  { name: 'cart',     label: 'Carrito',   Icon: IconShoppingBag, badge: 3 },
  { name: 'orders',   label: 'Pedidos',   Icon: IconFileText },
];

interface BottomNavProps {
  active: TabName;
  onPress: (tab: TabName) => void;
}

export function BottomNav({ active, onPress }: BottomNavProps) {
  return (
    <View style={styles.nav}>
      {TABS.map(({ name, label, Icon, badge }) => {
        const isActive = active === name;
        const iconColor = isActive ? colors.brand[600] : colors.text.disabled;
        const iconFill  = isActive ? colors.brand[100] : 'none';

        return (
          <TouchableOpacity
            key={name}
            style={styles.tab}
            onPress={() => onPress(name)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Icon size={21} color={iconColor} fill={iconFill} strokeWidth={1.8} />
              {badge && badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
  },
  tab: {
    flex: 1, alignItems: 'center', gap: 3,
  },
  iconWrap: {
    width: 42, height: 30,
    borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  iconWrapActive: { backgroundColor: colors.brand[50] },
  badge: {
    position: 'absolute', top: -2, right: -2,
    width: 15, height: 15,
    backgroundColor: colors.error.default,
    borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.background.secondary,
  },
  badgeText: { fontSize: 8, fontWeight: '700', color: '#fff' },
  label: { fontSize: 10.5, fontWeight: '500', color: colors.text.disabled },
  labelActive: { fontWeight: '600', color: colors.brand[600] },
});