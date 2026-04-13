"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { moderationTheme as t } from "../theme/moderation.theme";
import { ProductoStatus, ModerationStatCard } from "../types/moderation.types";

// ─── Status Badge ─────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: ProductoStatus }) {
  const map: Record<ProductoStatus, { label: string; color: string; bg: string }> = {
    pending:  { label: "Pendiente", color: t.warning,      bg: t.warningBg  },
    approved: { label: "Aprobado",  color: t.success,      bg: t.successBg  },
    rejected: { label: "Rechazado", color: t.error,        bg: t.errorBg    },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "4px 12px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: s.color, display: "inline-block",
      }} />
      {s.label}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────
export function ModerationStatCardUI({ stat }: { stat: ModerationStatCard }) {
  const { Icon } = stat;
  return (
    <div className="stat-card" style={{
      borderRadius: 16, padding: "20px 24px",
      background: "white", border: `1px solid ${t.border}`,
      transition: "all 0.2s ease",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: stat.bg, color: stat.color,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} />
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{
          fontSize: 28, fontWeight: 700, color: t.textPrimary,
          letterSpacing: "-0.03em", fontFamily: "'DM Mono', monospace",
        }}>
          {stat.value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary, marginTop: 2 }}>
          {stat.label}
        </div>
        <div style={{ fontSize: 11, color: stat.color, marginTop: 4, fontWeight: 500 }}>
          {stat.delta}
        </div>
      </div>
    </div>
  );
}

// ─── Modal Rechazar ───────────────────────────────────────────────────
interface ModalRechazarProps {
  nombreProducto: string;
  motivo: string;
  onMotivoChange: (v: string) => void;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ModalRechazar({
  nombreProducto, motivo, onMotivoChange, onConfirmar, onCancelar,
}: ModalRechazarProps) {
  return (
    // Overlay
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "toastIn 0.2s ease",
    }}>
      <div style={{
        background: "white", borderRadius: 20,
        padding: "32px", width: 480, maxWidth: "90vw",
        boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: t.errorBg, color: t.error,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary }}>
                Rechazar producto
              </h3>
              <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 2 }}>
                {nombreProducto}
              </p>
            </div>
          </div>
          <button onClick={onCancelar} style={{
            border: "none", background: t.bgAlt, cursor: "pointer",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: t.textSecondary,
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Textarea motivo */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            fontSize: 12, fontWeight: 600, color: t.textSecondary,
            display: "block", marginBottom: 8,
          }}>
            Motivo del rechazo <span style={{ color: t.error }}>*</span>
          </label>
          <textarea
            value={motivo}
            onChange={(e) => onMotivoChange(e.target.value)}
            placeholder="Describe el motivo del rechazo para notificar al vendedor..."
            rows={4}
            style={{
              width: "100%", padding: "12px 14px",
              border: `1.5px solid ${t.border}`, borderRadius: 12,
              fontSize: 13, color: t.textPrimary,
              fontFamily: "inherit", resize: "none", outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = t.brand400)}
            onBlur={(e) => (e.target.style.borderColor = t.border)}
          />
          <p style={{ fontSize: 11, color: t.textDisabled, marginTop: 6 }}>
            Este mensaje será enviado al vendedor como notificación.
          </p>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            style={{
              background: t.error, color: "white", border: "none",
              padding: "10px 20px", borderRadius: 10,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────
export function Toast({
  message, visible, tipo,
}: {
  message: string;
  visible: boolean;
  tipo: "success" | "error";
}) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: tipo === "success" ? t.brand600 : t.error,
      color: "white", padding: "12px 20px", borderRadius: 12,
      fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      animation: "toastIn 0.3s ease", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {message}
    </div>
  );
}