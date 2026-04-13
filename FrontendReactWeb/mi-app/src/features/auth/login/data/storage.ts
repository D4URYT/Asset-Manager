import type { AuthUser } from "../types/auth.types";

const AUTH_STORAGE_KEY = "billnova.auth.user";
const REMEMBER_KEY = "billnova.auth.remember";
const REMEMBERED_EMAIL_KEY = "billnova.auth.rememberedEmail";

interface StoredAuthState {
  user: AuthUser;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function persistAuthState(user: AuthUser, rememberMe: boolean) {
  if (!isBrowser()) return;
  const serialized = JSON.stringify({ user } satisfies StoredAuthState);

  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, serialized);
    localStorage.setItem(REMEMBER_KEY, "1");
    localStorage.setItem(REMEMBERED_EMAIL_KEY, user.email);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

export function getStoredAuthState(): AuthUser | null {
  if (!isBrowser()) return null;
  const localValue = localStorage.getItem(AUTH_STORAGE_KEY);
  const sessionValue = sessionStorage.getItem(AUTH_STORAGE_KEY);
  const rawValue = localValue ?? sessionValue;
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as StoredAuthState;
    return parsed.user;
  } catch {
    clearStoredAuthState();
    return null;
  }
}

export function clearStoredAuthState() {
  if (!isBrowser()) return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getRememberedEmail(): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
}

export function getRememberMeDefault(): boolean {
  if (!isBrowser()) return false;
  return localStorage.getItem(REMEMBER_KEY) === "1";
}
