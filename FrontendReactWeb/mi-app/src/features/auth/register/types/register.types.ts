/* ─────────────────────────────────────────
   REGISTER FEATURE — Types
   Fuente única de verdad para interfaces
───────────────────────────────────────── */
export interface RegisterFormState {
  values: {
    name: string;
    login: string;
    password: string;
    email: string;
    phone?: string;
    address?: string;
  };
  errors: {
    name?: string;
    login?: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  isLoading: boolean;
  serverError?: string;
}


/** Payload que se envía al endpoint Odoo POST /api/auth/register */
export interface RegisterPayload {
  name: string;
  login: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface RegisterResponse {
  ok: boolean;
  user_id?: number;
  email?: string;
  requires_verification?: boolean;
  dev_code?: string;
  error?: string;
}

/** Configuración declarativa de cada campo del form */
export interface FieldConfig {
  name: keyof RegisterPayload;
  label: string;
  type: "text" | "email" | "password" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
  colSpan?: "full" | "half";
}

/** Nivel de fortaleza de contraseña */
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;