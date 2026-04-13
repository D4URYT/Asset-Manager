import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import {
  IconMenu, IconBriefcase, IconSearch, IconShoppingBag,
} from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

interface TopNavProps {
  cartCount?: number;
  onMenuPress: () => void;
  onSearchPress: () => void;
  onCartPress: () => void;
  onAvatarPress: () => void;
  userInitials?: string;
}

export function TopNav({
  cartCount = 0, onMenuPress, onSearchPress,
  onCartPress, onAvatarPress, userInitials = 'U',
}: TopNavProps) {
  return (
    <View style={styles.nav}>
      {/* Hamburger */}
      <TouchableOpacity style={styles.iconBtn} onPress={onMenuPress} activeOpacity={0.7}>
        <IconMenu size={19} color={colors.text.primary} strokeWidth={1.8} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logo}>
        <View style={styles.logoIcon}>
          <IconBriefcase size={14} color="#fff" strokeWidth={2} />
        </View>
        <Text style={styles.logoName}>
          Bill<Text style={styles.logoDot}>N</Text>ova
        </Text>
      </View>

      {/* Search pill */}
      <TouchableOpacity style={styles.searchPill} onPress={onSearchPress} activeOpacity={0.75}>
        <IconSearch size={13} color={colors.text.disabled} strokeWidth={1.8} />
        <Text style={styles.searchText}>Buscar...</Text>
      </TouchableOpacity>

      {/* Cart */}
      <TouchableOpacity style={styles.iconBtn} onPress={onCartPress} activeOpacity={0.7}>
        <IconShoppingBag size={19} color={colors.text.primary} strokeWidth={1.8} />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress} activeOpacity={0.8}>
        <Text style={styles.avatarText}>{userInitials}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 58,
    backgroundColor: colors.background.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  iconBtn: {
    width: 36, height: 36,
    borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  logo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 },
  logoIcon: {
    width: 28, height: 28,
    backgroundColor: colors.brand[600],
    borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  logoName: {
    fontSize: 18, fontWeight: '800',
    color: colors.text.primary, letterSpacing: -0.4,
  },
  logoDot: { color: colors.brand[500] },
  searchPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    height: 34, backgroundColor: colors.background.primary,
    borderWidth: 1, borderColor: colors.border.light,
    borderRadius: radius.full,
    paddingHorizontal: 11,
    width: 100, flexShrink: 0,
  },
  searchText: { fontSize: 12, color: colors.text.disabled },
  badge: {
    position: 'absolute', top: 3, right: 3,
    width: 16, height: 16,
    backgroundColor: colors.error.default,
    borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.background.secondary,
  },
  badgeText: { fontSize: 8.5, fontWeight: '700', color: '#fff' },
  avatar: {
    width: 32, height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.brand[600],
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 3,
  },
  avatarText: { fontSize: 12, fontWeight: '700', color: '#fff' },
});