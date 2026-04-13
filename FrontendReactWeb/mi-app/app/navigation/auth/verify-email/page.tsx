"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/features/auth/login";

export default function VerifyEmailPage() {
  const search = useSearchParams();
  const initialEmail = search.get("email") ?? "";
  const {
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
  } = useVerifyEmail(initialEmail);

  return (
    <main className="min-h-screen bg-[#080b12] text-[#e4ebf5] flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-[#1a2235] bg-[#0d1117] p-8 rounded-[2px]">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#4f8ef7] mb-2">
          RF-03 / RF-04
        </p>
        <h1 className="text-2xl font-semibold mb-1">Verifica tu correo</h1>
        <p className="text-sm text-[#7a8fa8] mb-6">
          Ingresa el codigo OTP recibido por email.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#7a8fa8]">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full border border-[#1e2d42] bg-transparent p-3 text-sm outline-none focus:border-[#4f8ef7]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#7a8fa8]">
              Codigo
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              maxLength={8}
              placeholder="123456"
              className="mt-1 w-full border border-[#1e2d42] bg-transparent p-3 text-sm outline-none focus:border-[#4f8ef7]"
            />
          </div>

          <button
            type="button"
            onClick={verify}
            disabled={isLoading}
            className="w-full bg-[#4f8ef7] text-[#07101d] py-3 font-semibold disabled:opacity-60"
          >
            {isLoading ? "Verificando..." : "Verificar cuenta"}
          </button>

          <button
            type="button"
            onClick={resend}
            disabled={isResending || cooldown > 0}
            className="w-full border border-[#2a4063] py-3 text-[#9ec2ec] disabled:opacity-60"
          >
            {cooldown > 0
              ? `Reenviar en ${cooldown}s`
              : isResending
                ? "Reenviando..."
                : "Reenviar codigo"}
          </button>

          {error && <p className="text-sm text-[#f47c7c]">{error}</p>}
          {message && <p className="text-sm text-[#9ce5b9]">{message}</p>}
          {devCode && (
            <p className="text-xs text-[#9fb4d1]">
              Codigo de desarrollo: {devCode}
            </p>
          )}
        </div>

        <div className="mt-5 text-xs text-[#7a8fa8]">
          <Link href="/login" className="text-[#6ba3ff] underline">
            Volver a login
          </Link>
        </div>
      </div>
    </main>
  );
}
