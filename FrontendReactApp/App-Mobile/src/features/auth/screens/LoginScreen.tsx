import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView,
  Platform, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthHeader } from '../components/AuthHeader';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { IconAt, IconLock, IconWarning } from '../../../shared/ui/Icons';
import { useLogin } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';

interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
}

export function LoginScreen({ onNavigateToRegister, onLoginSuccess }: LoginScreenProps) {
  const { handleLogin, isLoading, error, clearError } = useLogin();
  const [form, setForm] = useState({ login: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ login: '', password: '' });

  const validate = () => {
    const e = { login: '', password: '' };
    if (!form.login.trim()) e.login = 'El usuario es requerido';
    if (!form.password)     e.password = 'La contraseña es requerida';
    setFieldErrors(e);
    return !e.login && !e.password;
  };

  const handleSubmit = async () => {
    clearError();
    if (!validate()) return;
    const result = await handleLogin(form);
    if (result.ok) onLoginSuccess();
  };

  const update = (f: keyof typeof form) => (v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (fieldErrors[f]) setFieldErrors(p => ({ ...p, [f]: '' }));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Single clean gradient — no orbs */}
      <LinearGradient
        colors={['#0F1F4D', '#1E3A8A', '#2563EB']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Subtle circle accents */}
      <View style={styles.circleA} />
      <View style={styles.circleB} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <AuthHeader
              title="Bienvenido"
              titleSoft="de vuelta"
              subtitle="Tu plataforma empresarial"
            />
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.pill} />

            {/* Tab row */}
            <View style={styles.tabRow}>
              <View style={styles.tabOn}>
                <Text style={styles.tabOnText}>Iniciar sesión</Text>
              </View>
              <TouchableOpacity style={styles.tabOff} onPress={onNavigateToRegister}>
                <Text style={styles.tabOffText}>Registrarse</Text>
              </TouchableOpacity>
            </View>

            {/* API error */}
            {error && (
              <View style={styles.apiErr}>
                <IconWarning size={14} />
                <Text style={styles.apiErrText}>{error}</Text>
              </View>
            )}

            <Input
              label="Usuario"
              LeftIcon={IconAt}
              placeholder="usuario@empresa.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={form.login}
              onChangeText={update('login')}
              error={fieldErrors.login}
            />
            <Input
              label="Contraseña"
              LeftIcon={IconLock}
              placeholder="••••••••"
              isPassword
              value={form.password}
              onChangeText={update('password')}
              error={fieldErrors.password}
            />

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <Button
              label="Iniciar sesión"
              onPress={handleSubmit}
              isLoading={isLoading}
              style={styles.submitBtn}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o continúa con</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google only */}
            <Button
              label="Continuar con Google"
              variant="google"
              onPress={() => {/* Google OAuth */}}
              style={styles.googleBtn}
            />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Sin cuenta? </Text>
              <TouchableOpacity onPress={onNavigateToRegister}>
                <Text style={styles.footerLink}>Regístrate gratis</Text>
              </TouchableOpacity>
            </View>

            {/* Secure strip */}
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

  // Subtle geometry — just two faint ring strokes
  circleA: {
    position: 'absolute', width: 200, height: 200,
    top: -60, right: -40, borderRadius: 100,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  circleB: {
    position: 'absolute', width: 100, height: 100,
    top: 20, right: 20, borderRadius: 50,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },

  scroll: { flexGrow: 1, justifyContent: 'flex-end' },
  hero: { paddingHorizontal: 28, paddingTop: 80, paddingBottom: 20 },

  // Card
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 8,
  },
  pill: {
    width: 32, height: 3,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 3,
    gap: 3,
    marginBottom: 24,
  },
  tabOn: {
    flex: 1, height: 36,
    backgroundColor: '#fff',
    borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 5, elevation: 2,
  },
  tabOnText: { fontSize: 13, fontWeight: '600', color: colors.brand[600] },
  tabOff: { flex: 1, height: 36, alignItems: 'center', justifyContent: 'center' },
  tabOffText: { fontSize: 13, fontWeight: '500', color: colors.text.disabled },

  // API error
  apiErr: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: colors.error.soft,
    borderRadius: 10, padding: 11,
    marginBottom: 14,
    borderLeftWidth: 2.5,
    borderLeftColor: colors.error.default,
  },
  apiErrText: { flex: 1, fontSize: 12.5, color: colors.error.default },

  // Forgot
  forgotRow: { alignSelf: 'flex-end', marginTop: -4, marginBottom: 18, padding: 2 },
  forgotText: { fontSize: 12, fontWeight: '500', color: colors.brand[500] },

  submitBtn: { marginBottom: 18 },

  // Divider
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border.light },
  dividerText: { fontSize: 11, color: colors.text.disabled },

  googleBtn: { marginBottom: 22 },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  footerText: { fontSize: 12.5, color: colors.text.tertiary },
  footerLink: { fontSize: 12.5, fontWeight: '600', color: colors.brand[600] },

  // Secure
  secure: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  secureDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success.default },
  secureText: { fontSize: 10.5, color: colors.text.disabled },
});