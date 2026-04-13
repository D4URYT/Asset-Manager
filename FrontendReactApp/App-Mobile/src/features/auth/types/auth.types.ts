export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  login: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface LoginResponse {
  ok: boolean;
  uid?: number;
  error?: string;
}

export interface RegisterResponse {
  ok: boolean;
  user_id?: number;
  error?: string;
}

export interface AuthUser {
  uid: number;
  login: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}