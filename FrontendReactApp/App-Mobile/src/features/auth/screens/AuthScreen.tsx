import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView,
  Platform, StatusBar, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { AuthHeader } from '../components/AuthHeader';
import {
  IconAt, IconLock, IconUser, IconMail,
  IconShield, IconWarning, IconCheck,
} from '../../../shared/ui/Icons';
import { useLogin, useRegister } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

type Tab = 'login' | 'register';

export function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [tab, setTab] = useState<Tab>('login');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // ── Login state ──────────────────────────────────────────────
  const { handleLogin, isLoading: loginLoading, error: loginError, clearError: clearLoginError } = useLogin();
  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ login: '', password: '' });

  // ── Register state ───────────────────────────────────────────
  const { handleRegister, isLoading: registerLoading, error: registerError, success, clearError: clearRegisterError } = useRegister();
  const [registerForm, setRegisterForm] = useState({
    name: '', login: '', email: '', password: '', confirmPassword: '',
  });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  // ── Tab switch with fade animation ───────────────────────────
  const switchTab = (next: Tab) => {
    if (next === tab) return;
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
    // swap mid-fade
    setTimeout(() => setTab(next), 120);
  };

  // ── Validators ───────────────────────────────────────────────
  const validateLogin = () => {
    const e = { login: '', password: '' };
    if (!loginForm.login.trim()) e.login = 'El usuario es requerido';
    if (!loginForm.password)     e.password = 'La contraseña es requerida';
    setLoginErrors(e);
    return !e.login && !e.password;
  };

  const validateRegister = () => {
    const e: Record<string, string> = {};
    if (!registerForm.name.trim())  e.name = 'El nombre es requerido';
    if (!registerForm.login.trim()) e.login = 'El usuario es requerido';
    if (registerForm.login.includes(' ')) e.login = 'No puede tener espacios';
    if (!registerForm.email.trim()) e.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) e.email = 'Email inválido';
    if (!registerForm.password)     e.password = 'La contraseña es requerida';
    else if (registerForm.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (registerForm.password !== registerForm.confirmPassword) e.confirmPassword = 'No coinciden';
    setRegisterErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit handlers ──────────────────────────────────────────
  const handleLoginSubmit = async () => {
    clearLoginError();
    if (!validateLogin()) return;
    const result = await handleLogin(loginForm);
    if (result.ok) onLoginSuccess();
  };

  const handleRegisterSubmit = async () => {
    clearRegisterError();
    if (!validateRegister()) return;
    await handleRegister({
      name:     registerForm.name.trim(),
      login:    registerForm.login.trim(),
      email:    registerForm.email.trim(),
      password: registerForm.password,
    });
    // on success, switch to login after short delay
    if (success) setTimeout(() => switchTab('login'), 1200);
  };

  // ── Field helpers ────────────────────────────────────────────
  const updateLogin = (f: keyof typeof loginForm) => (v: string) => {
    setLoginForm(p => ({ ...p, [f]: v }));
    if (loginErrors[f]) setLoginErrors(p => ({ ...p, [f]: '' }));
  };

  const updateRegister = (f: string) => (v: string) => {
    setRegisterForm(p => ({ ...p, [f]: v }));
    if (registerErrors[f]) setRegisterErrors(p => ({ ...p, [f]: '' }));
  };

  const isLogin = tab === 'login';

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
      <View style={styles.circleB} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero — title changes with tab */}
          <View style={styles.hero}>
            <AuthHeader
              title={isLogin ? 'Bienvenido' : 'Crear cuenta'}
              titleSoft={isLogin ? 'de vuelta' : undefined}
              subtitle={isLogin
                ? 'Tu plataforma empresarial'
                : 'Únete y empieza a gestionar tu negocio'}
            />
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.pill} />

            {/* ── Tab switcher ── */}
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.tab, isLogin && styles.tabActive]}
                onPress={() => switchTab('login')}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, !isLogin && styles.tabActive]}
                onPress={() => switchTab('register')}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>

            {/* ── Animated form content ── */}
            <Animated.View style={{ opacity: fadeAnim }}>

              {/* ── LOGIN FORM ── */}
              {isLogin && (
                <View>
                  {loginError && (
                    <View style={styles.alertErr}>
                      <IconWarning size={14} />
                      <Text style={styles.alertErrText}>{loginError}</Text>
                    </View>
                  )}

                  <Input
                    label="Usuario"
                    LeftIcon={IconAt}
                    placeholder="usuario@empresa.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={loginForm.login}
                    onChangeText={updateLogin('login')}
                    error={loginErrors.login}
                  />
                  <Input
                    label="Contraseña"
                    LeftIcon={IconLock}
                    placeholder="••••••••"
                    isPassword
                    value={loginForm.password}
                    onChangeText={updateLogin('password')}
                    error={loginErrors.password}
                  />

                  <TouchableOpacity style={styles.forgotRow}>
                    <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>

                  <Button
                    label="Iniciar sesión"
                    onPress={handleLoginSubmit}
                    isLoading={loginLoading}
                    style={styles.submitBtn}
                  />

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>o continúa con</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <Button
                    label="Continuar con Google"
                    variant="google"
                    onPress={() => { /* Google OAuth */ }}
                    style={styles.googleBtn}
                  />

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>¿Sin cuenta? </Text>
                    <TouchableOpacity onPress={() => switchTab('register')}>
                      <Text style={styles.footerLink}>Regístrate gratis</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* ── REGISTER FORM ── */}
              {!isLogin && (
                <View>
                  {registerError && (
                    <View style={styles.alertErr}>
                      <IconWarning size={14} />
                      <Text style={styles.alertErrText}>{registerError}</Text>
                    </View>
                  )}
                  {success && (
                    <View style={styles.alertOk}>
                      <IconCheck size={14} />
                      <Text style={styles.alertOkText}>¡Cuenta creada! Inicia sesión</Text>
                    </View>
                  )}

                  <Input
                    label="Nombre completo"
                    LeftIcon={IconUser}
                    placeholder="Juan Pérez"
                    value={registerForm.name}
                    onChangeText={updateRegister('name')}
                    error={registerErrors.name}
                  />
                  <Input
                    label="Email"
                    LeftIcon={IconMail}
                    placeholder="juan@empresa.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={registerForm.email}
                    onChangeText={updateRegister('email')}
                    error={registerErrors.email}
                  />
                  <Input
                    label="Usuario"
                    LeftIcon={IconAt}
                    placeholder="juan.perez"
                    autoCapitalize="none"
                    value={registerForm.login}
                    onChangeText={updateRegister('login')}
                    error={registerErrors.login}
                  />
                  <Input
                    label="Contraseña"
                    LeftIcon={IconLock}
                    placeholder="Mínimo 6 caracteres"
                    isPassword
                    value={registerForm.password}
                    onChangeText={updateRegister('password')}
                    error={registerErrors.password}
                  />
                  <Input
                    label="Confirmar contraseña"
                    LeftIcon={IconShield}
                    placeholder="••••••••"
                    isPassword
                    value={registerForm.confirmPassword}
                    onChangeText={updateRegister('confirmPassword')}
                    error={registerErrors.confirmPassword}
                  />

                  <Button
                    label="Crear cuenta"
                    onPress={handleRegisterSubmit}
                    isLoading={registerLoading}
                    style={styles.submitBtn}
                  />

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => switchTab('login')}>
                      <Text style={styles.footerLink}>Inicia sesión</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

            </Animated.View>

            {/* Secure strip — always visible */}
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

  // ── Card ──
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

  // ── Tabs ──
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 3,
    gap: 3,
    marginBottom: 24,
  },
  tab: {
    flex: 1, height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.disabled,
  },
  tabTextActive: {
    fontWeight: '600',
    color: colors.brand[600],
  },

  // ── Alerts ──
  alertErr: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: colors.error.soft,
    borderRadius: 10, padding: 11, marginBottom: 14,
    borderLeftWidth: 2.5, borderLeftColor: colors.error.default,
  },
  alertErrText: { flex: 1, fontSize: 12.5, color: colors.error.default },
  alertOk: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: colors.success.soft,
    borderRadius: 10, padding: 11, marginBottom: 14,
    borderLeftWidth: 2.5, borderLeftColor: colors.success.default,
  },
  alertOkText: { flex: 1, fontSize: 12.5, color: colors.success.default, fontWeight: '500' },

  // ── Fields / actions ──
  forgotRow: { alignSelf: 'flex-end', marginTop: -4, marginBottom: 18, padding: 2 },
  forgotText: { fontSize: 12, fontWeight: '500', color: colors.brand[500] },

  submitBtn: { marginBottom: 18 },

  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border.light },
  dividerText: { fontSize: 11, color: colors.text.disabled },

  googleBtn: { marginBottom: 22 },

  footer: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginBottom: 20,
  },
  footerText: { fontSize: 12.5, color: colors.text.tertiary },
  footerLink: { fontSize: 12.5, fontWeight: '600', color: colors.brand[600] },

  // ── Secure strip ──
  secure: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 5, marginTop: 4,
  },
  secureDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success.default },
  secureText: { fontSize: 10.5, color: colors.text.disabled },
});