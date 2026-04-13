"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../data/api";
import {
  getRememberMeDefault,
  getRememberedEmail,
  persistAuthState,
} from "../data/storage";
import { validateLogin } from "../data/validators";
import type { LoginPayload } from "../types/auth.types";

type LoginErrors = Partial<Record<keyof LoginPayload, string>>;

const INITIAL_VALUES: LoginPayload = {
  username: "",
  password: "",
  rememberMe: false,
};

export function useLogin() {
  const router = useRouter();

  const [values, setValues] = useState<LoginPayload>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const remembered = getRememberMeDefault();
    const username = remembered ? getRememberedEmail() : "";

    if (remembered || username) {
      setValues((prev) => ({
        ...prev,
        rememberMe: remembered,
        username,
      }));
    }
  }, []);

  const onFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = e.target;

      setValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setServerError(null);
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const nextErrors = validateLogin(values);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      setIsLoading(true);
      setServerError(null);

      try {
        const response = await authApi.login(values);

        /**
         * 🔥 CLAVE:
         * En Odoo el login es exitoso si existe UID.
         */
        if (response?.uid) {
          persistAuthState(
            {
              uid: response.uid,
              email: response.email ?? values.username,
              name: response.name ?? values.username,
              sessionToken: response.session_token ?? response.session_id ?? null,
              sessionExpiresAt: response.session_expires_at ?? null,
            },
            values.rememberMe
          );

          router.push("/dashboard");
          return;
        }

        // Si no hay UID, es error real
        setServerError(response?.error ?? "Credenciales inválidas.");
      } catch (error) {
        console.error("Login error:", error);
        setServerError("No se pudo conectar con el servidor.");
      } finally {
        setIsLoading(false);
      }
    },
    [router, values]
  );

  return {
    values,
    errors,
    isLoading,
    serverError,
    onFieldChange,
    onSubmit,
  };
}
