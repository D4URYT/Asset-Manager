"use client";

import Link from "next/link";
import { useForgotPassword } from "@/features/auth/login";

export default function ForgotPasswordPage() {
  const {
    values,
    errors,
    isLoading,
    serverError,
    response,
    onFieldChange,
    onSubmit,
  } = useForgotPassword();

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
            <span className="hero-badge-text">Recuperacion</span>
          </div>
          <h1 className="hero-title">
            Recupera tu cuenta de forma <em>segura</em>.
          </h1>
          <p className="hero-desc">
            Te enviaremos OTP o enlace de restablecimiento con expiracion corta.
          </p>
        </div>

        <p className="left-foot">RF-06 Recovery</p>
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
              <span>Recuperar</span>
              <span className="fh-step-line" />
              <span>RF-06</span>
            </div>
            <h2 className="fh-title">Recuperar contrasena</h2>
            <p className="fh-sub">Recibe instrucciones por enlace o OTP.</p>
          </header>

          <div className="card">
            <div className="card-accent" aria-hidden />
            <div className="card-body">
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
                      placeholder="admin@empresa.com"
                      className={`input${errors.email ? " err" : values.email ? " ok" : ""}`}
                    />
                  </div>
                  <p className={`field-err${errors.email ? " show" : ""}`}>
                    {errors.email}
                  </p>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="method">
                    Metodo
                  </label>
                  <div className="field-wrap">
                    <select
                      id="method"
                      name="method"
                      value={values.method}
                      onChange={onFieldChange}
                      className="input"
                    >
                      <option value="link">Link de reseteo</option>
                      <option value="otp">OTP por email</option>
                    </select>
                  </div>
                  <p className={`field-err${errors.method ? " show" : ""}`}>
                    {errors.method}
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
                  {isLoading ? "Enviando..." : "Enviar instrucciones"}
                </button>
              </form>

              {response?.ok && (
                <div
                  className="info-box"
                  style={{ marginTop: "1rem", alignItems: "flex-start" }}
                >
                  <div>
                    <p className="info-box-text">{response.message}</p>
                    {response.dev_otp && (
                      <p className="info-box-text">
                        OTP de desarrollo: {response.dev_otp}
                      </p>
                    )}
                    {response.dev_token && (
                      <p className="info-box-text">
                        Token de desarrollo: {response.dev_token}
                      </p>
                    )}
                    <p className="fh-sub" style={{ marginTop: "0.25rem" }}>
                      <Link href="/reset-password">
                        Ir a restablecer contrasena
                      </Link>
                    </p>
                  </div>
                </div>
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
