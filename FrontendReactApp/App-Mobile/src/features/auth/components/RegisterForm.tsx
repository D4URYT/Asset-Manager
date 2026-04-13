import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { useRegister } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { handleRegister, isLoading, error, success, clearError } = useRegister();

  const [form, setForm] = useState({
    name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim())     errors.name = 'El nombre es requerido';
    if (!form.login.trim())    errors.login = 'El usuario es requerido';
    if (!form.email.trim())    errors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email inválido';
    if (!form.password)        errors.password = 'La contraseña es requerida';
    else if (form.password.length < 6) errors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    clearError();
    if (!validate()) return;
    const result = await handleRegister({
      name:     form.name.trim(),
      login:    form.login.trim(),
      email:    form.email.trim(),
      password: form.password,
      phone:    form.phone || undefined,
      address:  form.address || undefined,
    });
    if (result.ok) onSuccess?.();
  };

  const update = (field: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <View>
      {error && (
        <View style={styles.apiError}>
          <Text style={styles.apiErrorText}>{error}</Text>
        </View>
      )}
      {success && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ Cuenta creada exitosamente</Text>
        </View>
      )}

      <Input label="Nombre completo" placeholder="Juan Pérez" leftIcon="person-outline"
        value={form.name} onChangeText={update('name')} error={fieldErrors.name} />

      <Input label="Usuario" placeholder="juan.perez" leftIcon="at-outline"
        autoCapitalize="none" value={form.login} onChangeText={update('login')} error={fieldErrors.login} />

      <Input label="Email" placeholder="juan@empresa.com" leftIcon="mail-outline"
        keyboardType="email-address" autoCapitalize="none"
        value={form.email} onChangeText={update('email')} error={fieldErrors.email} />

      <Input label="Contraseña" placeholder="••••••••" leftIcon="lock-closed-outline"
        isPassword value={form.password} onChangeText={update('password')} error={fieldErrors.password} />

      <Input label="Confirmar contraseña" placeholder="••••••••" leftIcon="lock-closed-outline"
        isPassword value={form.confirmPassword} onChangeText={update('confirmPassword')}
        error={fieldErrors.confirmPassword} />

      <Input label="Teléfono (opcional)" placeholder="+57 300 000 0000" leftIcon="call-outline"
        keyboardType="phone-pad" value={form.phone} onChangeText={update('phone')} />

      <Input label="Dirección (opcional)" placeholder="Calle 123 #45-67" leftIcon="location-outline"
        value={form.address} onChangeText={update('address')} />

      <Button label="Crear cuenta" onPress={handleSubmit} isLoading={isLoading} style={styles.submitBtn} />
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
  apiErrorText: { ...typography.body, color: colors.error.default },
  successBox: {
    backgroundColor: colors.success.soft,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.success.default,
  },
  successText: { ...typography.bodyMedium, color: colors.success.default },
  submitBtn: { marginTop: spacing.sm },
});