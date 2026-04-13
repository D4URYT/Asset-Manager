import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { useLogin } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface LoginFormProps {
  onForgotPassword?: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onForgotPassword, onSuccess }: LoginFormProps) {
  const { handleLogin, isLoading, error, clearError } = useLogin();

  const [form, setForm] = useState({ login: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ login: '', password: '' });

  const validate = () => {
    const errors = { login: '', password: '' };
    if (!form.login.trim()) errors.login = 'El usuario es requerido';
    if (!form.password)     errors.password = 'La contraseña es requerida';
    setFieldErrors(errors);
    return !errors.login && !errors.password;
  };

  const handleSubmit = async () => {
    clearError();
    if (!validate()) return;

    const result = await handleLogin({ login: form.login.trim(), password: form.password });
    if (result.ok) onSuccess?.();
  };

  const updateField = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <View>
      {/* API-level error */}
      {error && (
        <View style={styles.apiError}>
          <Text style={styles.apiErrorText}>{error}</Text>
        </View>
      )}

      <Input
        label="Usuario / Email"
        placeholder="usuario@empresa.com"
        leftIcon="person-outline"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.login}
        onChangeText={updateField('login')}
        error={fieldErrors.login}
      />

      <Input
        label="Contraseña"
        placeholder="••••••••"
        leftIcon="lock-closed-outline"
        isPassword
        value={form.password}
        onChangeText={updateField('password')}
        error={fieldErrors.password}
      />

      {onForgotPassword && (
        <TouchableOpacity onPress={onForgotPassword} style={styles.forgotRow}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      )}

      <Button
        label="Iniciar sesión"
        onPress={handleSubmit}
        isLoading={isLoading}
        style={styles.submitBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  apiError: {
    backgroundColor: colors.error.soft,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.error.default,
  },
  apiErrorText: {
    ...typography.body,
    color: colors.error.default,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotText: {
    ...typography.bodyMedium,
    color: colors.brand[400],
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
});