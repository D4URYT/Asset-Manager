import { odooClient } from '../../../core/api/odooClient';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types/auth.types';

export const authApi = {
  login: (payload: LoginPayload) =>
    odooClient.post<LoginResponse>('/api/auth/login', payload),

  register: (payload: RegisterPayload) =>
    odooClient.post<RegisterResponse>('/api/auth/register', payload),

  logout: () =>
    odooClient.post<{ ok: boolean }>('/api/auth/logout', {}, { requiresAuth: true }),
};