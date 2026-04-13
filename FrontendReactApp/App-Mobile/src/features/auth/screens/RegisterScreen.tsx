import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView,
  Platform, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import {
  IconUser, IconMail, IconAt, IconLock,
  IconShield, IconBriefcase, IconCheck, IconWarning,
} from '../../../shared/ui/Icons';
import { useRegister } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

// Back arrow as inline SVG component
function IconArrowLeft({ size = 18, color = 'rgba(255,255,255,0.75)' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M11 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function RegisterScreen({ onNavigateToLogin, onRegisterSuccess }: RegisterScreenProps) {
  const { handleRegister, isLoading, error, success, clearError } = useRegister();
  const [form, setForm] = useState({
    name: '', login: '', email: '',
    password: '', confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())   e.name = 'El nombre es requerido';
    if (!form.login.trim())  e.login = 'El usuario es requerido';
    if (form.login.includes(' ')) e.login = 'No puede tener espacios';
    if (!form.email.trim())  e.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.password)      e.password = 'La contraseña es requerida';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'No coinciden';
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    clearError();
    if (!validate()) return;
    const result = await handleRegister({
      name: form.name.trim(),
      login: form.login.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    if (result.ok) onRegisterSuccess();
  };

  const update = (f: string) => (v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (fieldErrors[f]) setFieldErrors(p => ({ ...p, [f]: '' }));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#0F1F4D', '#1E3A8A', '#2563EB']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.circleA} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <TouchableOpacity onPress={onNavigateToLogin} style={styles.backBtn}>
              <IconArrowLeft />
            </TouchableOpacity>

            <View style={styles.logoRow}>
              <View style={styles.logoBox}>
                <IconBriefcase size={16} color="#fff" strokeWidth={1.8} />
              </View>
              <Text style={styles.logoName}>OdooApp</Text>
              <View style={styles.versionPill}>
                <Text style={styles.versionText}>v2.0</Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>Crear cuenta</Text>
            <Text style={styles.heroSub}>Únete y empieza a gestionar tu negocio</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.pill} />

            {/* Tabs */}
            <View style={styles.tabRow}>
              <TouchableOpacity style={styles.tabOff} onPress={onNavigateToLogin}>
                <Text style={styles.tabOffText}>Iniciar sesión</Text>
              </TouchableOpacity>
              <View style={styles.tabOn}>
                <Text style={styles.tabOnText}>Registrarse</Text>
              </View>
            </View>

            {/* Feedback */}
            {error && (
              <View style={styles.apiErr}>
                <IconWarning size={14} />
                <Text style={styles.apiErrText}>{error}</Text>
              </View>
            )}
            {success && (
              <View style={styles.successBox}>
                <IconCheck size={14} />
                <Text style={styles.successText}>¡Cuenta creada exitosamente!</Text>
              </View>
            )}

            <Input label="Nombre completo" LeftIcon={IconUser} placeholder="Juan Pérez"
              value={form.name} onChangeText={update('name')} error={fieldErrors.name} />
            <Input label="Email" LeftIcon={IconMail} placeholder="juan@empresa.com"
              keyboardType="email-address" autoCapitalize="none"
              value={form.email} onChangeText={update('email')} error={fieldErrors.email} />
            <Input label="Usuario" LeftIcon={IconAt} placeholder="juan.perez"
              autoCapitalize="none"
              value={form.login} onChangeText={update('login')} error={fieldErrors.login} />
            <Input label="Contraseña" LeftIcon={IconLock} placeholder="Mínimo 6 caracteres"
              isPassword value={form.password} onChangeText={update('password')} error={fieldErrors.password} />
            <Input label="Confirmar contraseña" LeftIcon={IconShield} placeholder="••••••••"
              isPassword value={form.confirmPassword} onChangeText={update('confirmPassword')}
              error={fieldErrors.confirmPassword} />

            <Button label="Crear cuenta" onPress={handleSubmit} isLoading={isLoading} style={styles.submitBtn} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.footerLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.secure}>
              <View style={styles.secureDot} />
              <Text style={styles.secureText}>Conexión cifrada · Odoo ERP</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  circleA: {
    position: 'absolute', width: 180, height: 180,
    top: -50, right: -30, borderRadius: 90,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  scroll: { flexGrow: 1, justifyContent: 'flex-end' },
  hero: { paddingHorizontal: 28, paddingTop: 64, paddingBottom: 20 },
  backBtn: {
    width: 36, height: 36, borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 22,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  logoBox: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  logoName: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600' },
  versionPill: {
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2,
  },
  versionText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '500', letterSpacing: 0.8 },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 6 },
  heroSub: { color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: '300' },

  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 28, paddingTop: 14, paddingBottom: 48,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06, shadowRadius: 16, elevation: 8,
  },
  pill: {
    width: 32, height: 3, backgroundColor: colors.border.light,
    borderRadius: 2, alignSelf: 'center', marginBottom: 20,
  },
  tabRow: {
    flexDirection: 'row', backgroundColor: colors.background.primary,
    borderRadius: 12, padding: 3, gap: 3, marginBottom: 24,
  },
  tabOn: {
    flex: 1, height: 36, backgroundColor: '#fff', borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.brand[700], shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 5, elevation: 2,
  },
  tabOnText: { fontSize: 13, fontWeight: '600', color: colors.brand[600] },
  tabOff: { flex: 1, height: 36, alignItems: 'center', justifyContent: 'center' },
  tabOffText: { fontSize: 13, fontWeight: '500', color: colors.text.disabled },

  apiErr: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: colors.error.soft, borderRadius: 10, padding: 11,
    marginBottom: 14, borderLeftWidth: 2.5, borderLeftColor: colors.error.default,
  },
  apiErrText: { flex: 1, fontSize: 12.5, color: colors.error.default },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: colors.success.soft, borderRadius: 10, padding: 11,
    marginBottom: 14, borderLeftWidth: 2.5, borderLeftColor: colors.success.default,
  },
  successText: { flex: 1, fontSize: 12.5, color: colors.success.default, fontWeight: '500' },

  submitBtn: { marginTop: 6, marginBottom: 22 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  footerText: { fontSize: 12.5, color: colors.text.tertiary },
  footerLink: { fontSize: 12.5, fontWeight: '600', color: colors.brand[600] },
  secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  secureDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success.default },
  secureText: { fontSize: 10.5, color: colors.text.disabled },
});