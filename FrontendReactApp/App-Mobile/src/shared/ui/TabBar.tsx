import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';

// ── Icons ──────────────────────────────────────────────────────

function IconHome({ active }: { active: boolean }) {
  const c = active ? colors.brand[600] : colors.text.disabled;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        fill={active ? colors.brand[100] : 'none'} />
      <Path d="M9 21V12h6v9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconGrid({ active }: { active: boolean }) {
  const c = active ? colors.brand[600] : colors.text.disabled;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="2" stroke={c} strokeWidth="1.8"
        fill={active ? colors.brand[100] : 'none'} />
      <Rect x="14" y="3" width="7" height="7" rx="2" stroke={c} strokeWidth="1.8"
        fill={active ? colors.brand[100] : 'none'} />
      <Rect x="3" y="14" width="7" height="7" rx="2" stroke={c} strokeWidth="1.8" />
      <Rect x="14" y="14" width="7" height="7" rx="2" stroke={c} strokeWidth="1.8" />
    </Svg>
  );
}

function IconDoc({ active }: { active: boolean }) {
  const c = active ? colors.brand[600] : colors.text.disabled;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        fill={active ? colors.brand[100] : 'none'} />
      <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function IconUser({ active }: { active: boolean }) {
  const c = active ? colors.brand[600] : colors.text.disabled;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8"
        fill={active ? colors.brand[100] : 'none'} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export type TabName = 'home' | 'products' | 'orders' | 'profile';

interface TabBarProps {
  active: TabName;
  onPress: (tab: TabName) => void;
}

const TABS: { name: TabName; label: string; Icon: React.ComponentType<{ active: boolean }> }[] = [
  { name: 'home',     label: 'Inicio',    Icon: IconHome },
  { name: 'products', label: 'Productos', Icon: IconGrid },
  { name: 'orders',   label: 'Pedidos',   Icon: IconDoc },
  { name: 'profile',  label: 'Perfil',    Icon: IconUser },
];

export function TabBar({ active, onPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {TABS.map(({ name, label, Icon }) => {
          const isActive = active === name;
          return (
            <TouchableOpacity
              key={name}
              style={styles.tab}
              onPress={() => onPress(name)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Icon active={isActive} />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconWrap: {
    width: 44, height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.brand[50],
  },
  label: {
    fontSize: 10.5,
    fontWeight: '500',
    color: colors.text.disabled,
    letterSpacing: 0.2,
  },
  labelActive: {
    color: colors.brand[600],
    fontWeight: '600',
  },
});