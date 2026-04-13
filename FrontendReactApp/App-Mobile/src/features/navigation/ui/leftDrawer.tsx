import React, { useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Animated, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  IconX, IconBriefcase, IconSearch, IconHome,
  IconPackage, IconShoppingBag, IconFileText,
  IconHeart, IconMonitor, IconShirt, IconSettings,
  IconHelpCircle, IconPhone, IconLogOut,
} from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

interface NavItem {
  id: string;
  label: string;
  Icon: React.ComponentType<any>;
  badge?: number;
  badgeColor?: string;
}

const MAIN_NAV: NavItem[] = [
  { id: 'home',     label: 'Inicio',      Icon: IconHome },
  { id: 'products', label: 'Productos',   Icon: IconPackage, badge: 142 },
  { id: 'cart',     label: 'Mi Carrito',  Icon: IconShoppingBag, badge: 3, badgeColor: '#059669' },
  { id: 'orders',   label: 'Mis Pedidos', Icon: IconFileText },
  { id: 'wishlist', label: 'Favoritos',   Icon: IconHeart },
];

const CAT_NAV: NavItem[] = [
  { id: 'cat-tech',     label: 'Tecnología',   Icon: IconMonitor },
  { id: 'cat-clothing', label: 'Ropa & Moda',  Icon: IconShirt },
  { id: 'cat-services', label: 'Servicios',    Icon: IconSettings },
];

const SUPPORT_NAV: NavItem[] = [
  { id: 'help',    label: 'Centro de ayuda', Icon: IconHelpCircle },
  { id: 'contact', label: 'Contacto',        Icon: IconPhone },
];

interface LeftDrawerProps {
  open: boolean;
  activeItem?: string;
  onClose: () => void;
  onNavigate?: (id: string) => void;
  onLogout?: () => void;
}

export function LeftDrawer({
  open, activeItem = 'home', onClose, onNavigate, onLogout,
}: LeftDrawerProps) {
  const translateX = useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: open ? 0 : -300,
      useNativeDriver: true,
      tension: 80, friction: 12,
    }).start();
  }, [open]);

  function NavRow({ item }: { item: NavItem }) {
    const isActive = activeItem === item.id;
    return (
      <TouchableOpacity
        style={[styles.row, isActive && styles.rowActive]}
        onPress={() => { onNavigate?.(item.id); onClose(); }}
        activeOpacity={0.75}
      >
        <View style={[styles.rowIcon, isActive && styles.rowIconActive]}>
          <item.Icon size={15} color={isActive ? colors.brand[500] : colors.text.tertiary} strokeWidth={1.8} />
        </View>
        <Text style={[styles.rowLabel, isActive && styles.rowLabelActive]}>{item.label}</Text>
        {item.badge && (
          <View style={[styles.badge, { backgroundColor: item.badgeColor ?? colors.error.default }]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.brand[900], colors.brand[600]]}
        style={styles.header}
      >
        <View style={styles.headerCircle} />
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <IconX size={14} color="#fff" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <IconBriefcase size={14} color="#fff" strokeWidth={2} />
          </View>
          <Text style={styles.brandName}>BillNova</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <IconSearch size={13} color="rgba(255,255,255,0.5)" strokeWidth={1.8} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos, servicios..."
            placeholderTextColor="rgba(255,255,255,0.35)"
          />
        </View>
      </LinearGradient>

      {/* Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Principal</Text>
        {MAIN_NAV.map(item => <NavRow key={item.id} item={item} />)}

        <Text style={styles.sectionLabel}>Categorías</Text>
        {CAT_NAV.map(item => <NavRow key={item.id} item={item} />)}

        <Text style={styles.sectionLabel}>Soporte</Text>
        {SUPPORT_NAV.map(item => <NavRow key={item.id} item={item} />)}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Footer - logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutRow} onPress={onLogout} activeOpacity={0.7}>
          <View style={styles.logoutIcon}>
            <IconLogOut size={14} color={colors.error.default} strokeWidth={1.8} />
          </View>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    width: 285, backgroundColor: colors.background.secondary,
    zIndex: 200, flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15, shadowRadius: 20, elevation: 20,
  },
  header: { paddingTop: 48, paddingHorizontal: 18, paddingBottom: 22, position: 'relative', overflow: 'hidden' },
  headerCircle: {
    position: 'absolute', width: 160, height: 160,
    top: -50, right: -50, borderRadius: 80,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  closeBtn: {
    position: 'absolute', top: 10, right: 10,
    width: 28, height: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  brandIcon: {
    width: 30, height: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center',
  },
  brandName: { fontSize: 17, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.md, paddingHorizontal: 11, paddingVertical: 8,
  },
  searchInput: {
    flex: 1, color: '#fff',
    fontSize: 12.5, paddingVertical: 0,
  },
  body: { flex: 1, paddingTop: 8 },
  sectionLabel: {
    fontSize: 9.5, fontWeight: '700', letterSpacing: 1.5,
    textTransform: 'uppercase', color: colors.text.disabled,
    paddingHorizontal: 18, paddingTop: 14, paddingBottom: 5,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 11,
    paddingHorizontal: 18, paddingVertical: 10,
  },
  rowActive: { backgroundColor: colors.brand[50] },
  rowIcon: {
    width: 32, height: 32,
    backgroundColor: colors.background.primary,
    borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  rowIconActive: { backgroundColor: colors.brand[100] },
  rowLabel: { flex: 1, fontSize: 13.5, fontWeight: '500', color: colors.text.secondary },
  rowLabelActive: { color: colors.brand[600], fontWeight: '600' },
  badge: {
    borderRadius: radius.full, paddingHorizontal: 7, paddingVertical: 1,
  },
  badgeText: { fontSize: 9.5, fontWeight: '700', color: '#fff' },
  footer: { paddingHorizontal: 18, paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.border.light },
  logoutRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  logoutIcon: {
    width: 32, height: 32,
    backgroundColor: colors.error.soft,
    borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center',
  },
  logoutText: { fontSize: 13.5, fontWeight: '500', color: colors.error.default },
});