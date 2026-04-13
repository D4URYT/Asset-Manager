import { useState, useCallback } from 'react';
import { useAuthContext } from '../../../core/providers/AuthProvider';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export function useLogin() {
  const { login, isLoading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (payload: LoginPayload) => {
    setError(null);
    const result = await login(payload);
    if (!result.ok) setError(result.error ?? 'Error al iniciar sesión');
    return result;
  }, [login]);

  return { handleLogin, isLoading, error, clearError: () => setError(null) };
}

export function useRegister() {
  const { register, isLoading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    setError(null);
    setSuccess(false);
    const result = await register(payload);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error ?? 'Error al registrarse');
    }
    return result;
  }, [register]);

  return { handleRegister, isLoading, error, success, clearError: () => setError(null) };
}

export function useLogout() {
  const { logout } = useAuthContext();
  return { logout };
}

export function useAuth() {
  return useAuthContext();
}