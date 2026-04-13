import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useAuth, useLogout } from '../../src/features/auth/hooks/useAuth';
import { colors } from '../../src/shared/theme/colors';

function MenuItem({
  icon, label, sublabel, onPress, danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>{icon}</View>
      <View style={styles.menuInfo}>
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
        {sublabel && <Text style={styles.menuSub}>{sublabel}</Text>}
      </View>
      {!danger && (
        <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <Path d="M9 18l6-6-6-6" stroke={colors.text.disabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </TouchableOpacity>
  );
}

export default function ProfileTab() {
  const { user } = useAuth();
  const { logout } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('../(auth)');
        },
      },
    ]);
  };

  const initials = (user?.name ?? user?.login ?? 'U')
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.root}>

      {/* Header with avatar */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? user?.login}</Text>
        <Text style={styles.loginTag}>@{user?.login}</Text>
      </View>

      {/* Menu sections */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Cuenta</Text>

        <View style={styles.menuGroup}>
          <MenuItem
            icon={
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="8" r="4" stroke={colors.brand[500]} strokeWidth="1.8" />
                <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={colors.brand[500]} strokeWidth="1.8" strokeLinecap="round" />
              </Svg>
            }
            label="Mi perfil"
            sublabel="Edita tu información personal"
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                  stroke={colors.brand[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            }
            label="Notificaciones"
            sublabel="Configura tus alertas"
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke={colors.brand[500]} strokeWidth="1.8" strokeLinejoin="round" />
              </Svg>
            }
            label="Seguridad"
            sublabel="Contraseña y autenticación"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>App</Text>
        <View style={styles.menuGroup}>
          <MenuItem
            icon={
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="3" stroke={colors.brand[500]} strokeWidth="1.8" />
                <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                  stroke={colors.brand[500]} strokeWidth="1.8" />
              </Svg>
            }
            label="Configuración"
            sublabel="Preferencias de la app"
          />
        </View>
      </View>

      {/* Logout */}
      <View style={[styles.section, { marginTop: 'auto' }]}>
        <View style={styles.menuGroup}>
          <MenuItem
            icon={
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                  stroke={colors.error.default} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            }
            label="Cerrar sesión"
            onPress={handleLogout}
            danger
          />
        </View>
      </View>

      <Text style={styles.version}>OdooApp v2.0 · Odoo ERP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.primary },

  // Header
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  avatar: {
    width: 72, height: 72,
    borderRadius: 36,
    backgroundColor: colors.brand[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 3,
  },
  loginTag: {
    fontSize: 13,
    color: colors.text.disabled,
    fontWeight: '400',
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.text.disabled,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginLeft: 58,
  },
  menuIcon: {
    width: 38, height: 38,
    borderRadius: 10,
    backgroundColor: colors.brand[50],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuIconDanger: {
    backgroundColor: colors.error.soft,
  },
  menuInfo: { flex: 1 },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  menuLabelDanger: {
    color: colors.error.default,
  },
  menuSub: {
    fontSize: 11.5,
    color: colors.text.disabled,
    marginTop: 1,
  },

  version: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.text.disabled,
    paddingVertical: 24,
  },
});