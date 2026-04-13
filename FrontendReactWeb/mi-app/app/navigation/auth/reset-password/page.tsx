"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useResetPassword } from "@/features/auth/login";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  const {
    values,
    errors,
    hasToken,
    isLoading,
    serverError,
    success,
    onFieldChange,
    onSubmit,
  } = useResetPassword(email, token);

  return (
    <main className="page">
      <section className="left">
        <div className="left-shape-1" aria-hidden />
        <div className="left-shape-2" aria-hidden />
        <div className="left-shape-3" aria-hidden />
        <div className="left-pattern" aria-hidden />

        <div className="brand">
          <div className="brand-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L13 4v6L7 13 1 10V4L7 1z"
                stroke="#fff"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="brand-name">
            Bill<span>Nova</span>
          </p>
        </div>

        <div className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">Nueva contrasena</span>
          </div>
          <h1 className="hero-title">
            Protege tu cuenta con una <em>clave fuerte</em>.
          </h1>
          <p className="hero-desc">
            Usa OTP o token valido para definir tu nueva contrasena.
          </p>
        </div>

        <p className="left-foot">RF-06 Reset</p>
      </section>

      <section className="right">
        <div className="form-wrap">
          <div className="mob-brand">
            <div className="mob-brand-icon" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L13 4v6L7 13 1 10V4L7 1z"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mob-brand-name">
              Bill<span>Nova</span>
            </p>
          </div>

          <header className="fh">
            <div className="fh-step">
              <span>Actualizar</span>
              <span className="fh-step-line" />
              <span>RF-06</span>
            </div>
            <h2 className="fh-title">Definir nueva contrasena</h2>
            <p className="fh-sub">
              Completa los datos de verificacion para actualizar tu acceso.
            </p>
          </header>

          <div className="card">
            <div className="card-accent" aria-hidden />
            <div className="card-body">
              {success ? (
                <div className="success-wrap show">
                  <div className="success-ring" aria-hidden>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <path
                        d="M5.5 13l5 5L20.5 8"
                        stroke="#10B981"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="success-title">Contrasena actualizada</h3>
                  <p className="success-sub">Redirigiendo a login...</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="form" noValidate>
                  <div className="field">
                    <label className="field-label" htmlFor="email">
                      Email
                    </label>
                    <div className="field-wrap">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={onFieldChange}
                        className={`input${errors.email ? " err" : values.email ? " ok" : ""}`}
                      />
                    </div>
                    <p className={`field-err${errors.email ? " show" : ""}`}>
                      {errors.email}
                    </p>
                  </div>

                  {!hasToken && (
                    <div className="field">
                      <label className="field-label" htmlFor="otp">
                        OTP
                      </label>
                      <div className="field-wrap">
                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          value={values.otp}
                          onChange={onFieldChange}
                          className={`input${errors.otp ? " err" : values.otp ? " ok" : ""}`}
                        />
                      </div>
                      <p className={`field-err${errors.otp ? " show" : ""}`}>
                        {errors.otp}
                      </p>
                    </div>
                  )}

                  {hasToken && (
                    <div className="field">
                      <label className="field-label" htmlFor="token">
                        Token
                      </label>
                      <div className="field-wrap">
                        <input
                          id="token"
                          name="token"
                          type="text"
                          value={values.token}
                          onChange={onFieldChange}
                          className="input"
                        />
                      </div>
                    </div>
                  )}

                  <div className="field">
                    <label className="field-label" htmlFor="newPassword">
                      Nueva contrasena
                    </label>
                    <div className="field-wrap">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={values.newPassword}
                        onChange={onFieldChange}
                        className={`input${errors.newPassword ? " err" : values.newPassword ? " ok" : ""}`}
                      />
                    </div>
                    <p
                      className={`field-err${errors.newPassword ? " show" : ""}`}
                    >
                      {errors.newPassword}
                    </p>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="confirmPassword">
                      Confirmar contrasena
                    </label>
                    <div className="field-wrap">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={onFieldChange}
                        className={`input${errors.confirmPassword ? " err" : values.confirmPassword ? " ok" : ""}`}
                      />
                    </div>
                    <p
                      className={`field-err${errors.confirmPassword ? " show" : ""}`}
                    >
                      {errors.confirmPassword}
                    </p>
                  </div>

                  {serverError && (
                    <div className="alert show">
                      <p className="alert-msg">{serverError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-submit"
                  >
                    {isLoading ? "Actualizando..." : "Guardar nueva contrasena"}
                  </button>
                </form>
              )}

              <p className="terms" style={{ marginTop: "1rem" }}>
                <Link href="/login">Volver a login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
