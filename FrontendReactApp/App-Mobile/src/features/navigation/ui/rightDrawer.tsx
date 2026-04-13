import React, { useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  IconX, IconUser, IconPackage, IconHeart,
  IconMapPin, IconBell, IconShield, IconChevronRight, IconLogOut,
} from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

interface ProfileItem {
  id: string;
  label: string;
  sub: string;
  Icon: React.ComponentType<any>;
}

const PROFILE_ITEMS: ProfileItem[] = [
  { id: 'profile',  label: 'Mi perfil',      sub: 'Editar información personal', Icon: IconUser },
  { id: 'orders',   label: 'Mis pedidos',     sub: '3 pedidos activos',           Icon: IconPackage },
  { id: 'wishlist', label: 'Favoritos',       sub: '12 guardados',                Icon: IconHeart },
  { id: 'address',  label: 'Direcciones',     sub: '2 guardadas',                 Icon: IconMapPin },
  { id: 'notifs',   label: 'Notificaciones',  sub: 'Configurar alertas',          Icon: IconBell },
  { id: 'security', label: 'Seguridad',       sub: 'Contraseña y acceso',         Icon: IconShield },
];

interface RightDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (id: string) => void;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

export function RightDrawer({
  open, onClose, onNavigate, onLogout,
  userName = 'Usuario', userEmail = '', userInitials = 'U',
}: RightDrawerProps) {
  const translateX = useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: open ? 0 : 300,
      useNativeDriver: true,
      tension: 80, friction: 12,
    }).start();
  }, [open]);

  const confirmLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: onLogout },
    ]);
  };

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.brand[900], colors.brand[600]]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <IconX size={14} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </LinearGradient>

      {/* Items */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {PROFILE_ITEMS.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => { onNavigate?.(item.id); onClose(); }}
              activeOpacity={0.75}
            >
              <View style={styles.rowIcon}>
                <item.Icon size={16} color={colors.brand[500]} strokeWidth={1.8} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <IconChevronRight size={14} color={colors.border.medium} strokeWidth={2} />
            </TouchableOpacity>
            {index < PROFILE_ITEMS.length - 1 && (
              [1, 3].includes(index) && <View style={styles.divider} />
            )}
          </React.Fragment>
        ))}
        <View style={{ height: 12 }} />
      </ScrollView>

      {/* Logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout} activeOpacity={0.85}>
          <IconLogOut size={15} color="#fff" strokeWidth={1.8} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute', top: 0, right: 0, bottom: 0,
    width: 270, backgroundColor: colors.background.secondary,
    zIndex: 200, flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15, shadowRadius: 20, elevation: 20,
  },
  header: { paddingTop: 48, paddingHorizontal: 18, paddingBottom: 26, alignItems: 'center' },
  closeBtn: {
    position: 'absolute', top: 10, left: 10,
    width: 28, height: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  avatar: {
    width: 62, height: 62, borderRadius: 31,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  name:  { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 3 },
  email: { fontSize: 11, color: 'rgba(255,255,255,0.45)' },
  body:  { flex: 1, paddingTop: 8 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 11,
    paddingHorizontal: 18, paddingVertical: 12,
  },
  rowIcon: {
    width: 34, height: 34,
    backgroundColor: colors.brand[50],
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 13.5, fontWeight: '600', color: colors.text.primary },
  rowSub:   { fontSize: 10.5, color: colors.text.disabled, marginTop: 1 },
  divider:  { height: 1, backgroundColor: colors.border.light, marginHorizontal: 18, marginVertical: 2 },
  footer: { padding: 18, borderTopWidth: 1, borderTopColor: colors.border.light },
  logoutBtn: {
    backgroundColor: colors.error.default,
    borderRadius: radius.lg, paddingVertical: 12,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
  },
  logoutText: { color: '#fff', fontSize: 13.5, fontWeight: '600' },
});