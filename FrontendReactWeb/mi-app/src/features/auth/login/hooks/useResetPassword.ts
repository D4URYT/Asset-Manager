"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../data/api";
import { validateReset } from "../data/validators";
import type { ResetPasswordPayload } from "../types/auth.types";

type ResetErrors = Partial<Record<keyof ResetPasswordPayload, string>>;

export function useResetPassword(defaultEmail = "", defaultToken = "") {
  const router = useRouter();
  const [values, setValues] = useState<ResetPasswordPayload>({
    email: defaultEmail,
    otp: "",
    token: defaultToken,
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasToken = useMemo(() => values.token.trim().length > 0, [values.token]);

  const onFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setServerError(null);
    },
    [],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nextErrors = validateReset(values);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      setIsLoading(true);
      setServerError(null);

      try {
        const res = await authApi.resetPassword(values);
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => router.push("/login"), 1800);
          return;
        }
        setServerError(res.error ?? "No fue posible restablecer la contraseña.");
      } catch {
        setServerError("No se pudo conectar con el servidor.");
      } finally {
        setIsLoading(false);
      }
    },
    [router, values],
  );

  return {
    values,
    errors,
    hasToken,
    isLoading,
    serverError,
    success,
    onFieldChange,
    onSubmit,
  };
}
