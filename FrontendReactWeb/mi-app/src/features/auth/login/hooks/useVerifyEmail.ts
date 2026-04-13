"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../data/api";

export function useVerifyEmail(initialEmail = "") {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const verify = useCallback(async () => {
    if (!email.trim() || !code.trim()) {
      setError("Ingresa email y codigo.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await authApi.verifyEmail({ email, code });
      if (res.ok) {
        setMessage("Correo verificado. Ya puedes iniciar sesion.");
        setTimeout(() => router.push("/login"), 1200);
        return;
      }
      if (res.retry_after_seconds) setCooldown(res.retry_after_seconds);
      setError(res.error ?? "No se pudo verificar el correo.");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }, [code, email, router]);

  const resend = useCallback(async () => {
    if (!email.trim()) {
      setError("Ingresa tu email para reenviar.");
      return;
    }
    if (cooldown > 0) return;
    setIsResending(true);
    setError(null);
    setMessage(null);
    try {
      const res = await authApi.resendVerificationCode(email);
      if (res.ok) {
        setMessage(res.message ?? "Codigo reenviado.");
        setCooldown(60);
        setDevCode(res.dev_code ?? null);
        return;
      }
      if (res.retry_after_seconds) setCooldown(res.retry_after_seconds);
      setError(res.error ?? "No se pudo reenviar.");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsResending(false);
    }
  }, [cooldown, email]);

  return {
    email,
    code,
    cooldown,
    isLoading,
    isResending,
    error,
    message,
    devCode,
    setEmail,
    setCode,
    verify,
    resend,
  };
}
