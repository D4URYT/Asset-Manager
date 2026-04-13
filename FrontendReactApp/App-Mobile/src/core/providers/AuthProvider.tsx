import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { authApi } from '../../features/auth/api/authApi';
import { tokenStorage } from '../storage/tokenStorage';
import type { AuthState, AuthUser, LoginPayload, RegisterPayload } from '../../features/auth/types/auth.types';

// ─── State & Actions ─────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: AuthUser }
  | { type: 'CLEAR_USER' };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'CLEAR_USER':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<{ ok: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const user = await tokenStorage.getUser<AuthUser>();
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { data, error } = await authApi.login(payload);

    if (!data?.ok || error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { ok: false, error: data?.error ?? error ?? 'Login failed' };
    }

    const user: AuthUser = {
      uid:   data.uid!,
      login: payload.login,
      name:  payload.login,
    };

    await tokenStorage.saveUser(user);
    dispatch({ type: 'SET_USER', payload: user });
    return { ok: true };
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { data, error } = await authApi.register(payload);

    if (!data?.ok || error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { ok: false, error: data?.error ?? error ?? 'Registration failed' };
    }

    dispatch({ type: 'SET_LOADING', payload: false });
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    await tokenStorage.clearAll();
    dispatch({ type: 'CLEAR_USER' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}