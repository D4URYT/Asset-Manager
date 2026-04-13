import type { ForgotPasswordPayload, LoginPayload, ResetPasswordPayload } from "../types/auth.types";

type LoginErrors = Partial<Record<keyof LoginPayload, string>>;
type ForgotErrors = Partial<Record<keyof ForgotPasswordPayload, string>>;
type ResetErrors = Partial<Record<keyof ResetPasswordPayload, string>>;

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateStrongPassword(password: string): string | null {
  if (!password) return "La contrasena es requerida";
  if (password.length < 10) return "Minimo 10 caracteres";
  if (!/(?=.*[a-z])/.test(password)) return "Debe incluir al menos una minuscula";
  if (!/(?=.*[A-Z])/.test(password)) return "Debe incluir al menos una mayuscula";
  if (!/(?=.*[0-9])/.test(password)) return "Debe incluir al menos un numero";
  if (!/(?=.*[^a-zA-Z0-9])/.test(password)) return "Debe incluir al menos un caracter especial";
  if (/\s/.test(password)) return "No debe incluir espacios";
  return null;
}

export function validateLogin(values: LoginPayload): LoginErrors {
  const errors: LoginErrors = {};
  if (!values.username.trim()) errors.username = "El usuario es requerido";
  if (!values.password) errors.password = "La contrasena es requerida";
  return errors;
}

export function validateForgot(values: ForgotPasswordPayload): ForgotErrors {
  const errors: ForgotErrors = {};
  if (!values.email.trim()) errors.email = "El email es requerido";
  else if (!validateEmail(values.email)) errors.email = "Email invalido";
  if (!values.method) errors.method = "Selecciona OTP o link";
  return errors;
}

export function validateReset(values: ResetPasswordPayload): ResetErrors {
  const errors: ResetErrors = {};
  if (!values.email.trim()) errors.email = "El email es requerido";
  else if (!validateEmail(values.email)) errors.email = "Email invalido";

  if (!values.otp.trim() && !values.token.trim()) {
    errors.otp = "Ingresa OTP o token de recuperacion";
  }

  const passwordError = validateStrongPassword(values.newPassword);
  if (passwordError) errors.newPassword = passwordError;

  if (!values.confirmPassword) errors.confirmPassword = "Confirma la nueva contrasena";
  else if (values.confirmPassword !== values.newPassword) errors.confirmPassword = "Las contrasenas no coinciden";

  return errors;
}