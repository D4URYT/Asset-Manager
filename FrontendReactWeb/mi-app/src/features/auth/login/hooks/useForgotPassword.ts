"use client";

import { useCallback, useState } from "react";
import { authApi } from "../data/api";
import { validateForgot } from "../data/validators";
import type { ForgotPasswordPayload, ForgotPasswordResponse } from "../types/auth.types";

type ForgotErrors = Partial<Record<keyof ForgotPasswordPayload, string>>;

const INITIAL_VALUES: ForgotPasswordPayload = {
  email: "",
  method: "link",
};

export function useForgotPassword() {
  const [values, setValues] = useState<ForgotPasswordPayload>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ForgotErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [response, setResponse] = useState<ForgotPasswordResponse | null>(null);

  const onFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const nextErrors = validateForgot(values);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      setIsLoading(true);
      setServerError(null);
      setResponse(null);
      try {
        const res = await authApi.forgotPassword(values);
        if (res.ok) {
          setResponse(res);
          return;
        }
        setServerError(res.error ?? "No fue posible iniciar la recuperación.");
      } catch {
        setServerError("No se pudo conectar con el servidor.");
      } finally {
        setIsLoading(false);
      }
    },
    [values],
  );

  return {
    values,
    errors,
    isLoading,
    serverError,
    response,
    onFieldChange,
    onSubmit,
  };
}
