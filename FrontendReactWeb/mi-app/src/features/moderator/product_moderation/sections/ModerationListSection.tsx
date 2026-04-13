"use client";

import React from "react";
import { Search, Check, X, Eye, Package } from "lucide-react";
import { ProductoPendiente, FiltroStatus } from "../types/moderation.types";
import { StatusBadge } from "../ui/ModerationUI";
import { moderationTheme as t } from "../theme/moderation.theme";
import { FILTROS_STATUS } from "../data/moderation.data";

interface ModerationListaSectionProps {
  productos: ProductoPendiente[];
  search: string;
  filtroActivo: FiltroStatus;
  contadores: Record<string, number>;
  onSearchChange: (v: string) => void;
  onFiltroChange: (v: FiltroStatus) => void;
  onVerDetalle: (p: ProductoPendiente) => void;
  onAprobar: (id: string) => void;
  onRechazar: (p: ProductoPendiente) => void;
}

export function ModerationListaSection({
  productos,
  search,
  filtroActivo,
  contadores,
  onSearchChange,
  onFiltroChange,
  onVerDetalle,
  onAprobar,
  onRechazar,
}: ModerationListaSectionProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        border: `1px solid ${t.border}`,
        animation: "slideIn 0.5s ease 0.2s both",
      }}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Filtros con contadores */}
        <div style={{ display: "flex", gap: 6 }}>
          {FILTROS_STATUS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFiltroChange(f.key as FiltroStatus)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "none",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                background: filtroActivo === f.key ? t.brand600 : t.bgAlt,
                color: filtroActivo === f.key ? "white" : t.textSecondary,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {f.label}
              <span
                style={{
                  background:
                    filtroActivo === f.key
                      ? "rgba(255,255,255,0.25)"
                      : t.border,
                  color: filtroActivo === f.key ? "white" : t.textDisabled,
                  borderRadius: 10,
                  padding: "1px 7px",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {contadores[f.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: t.bgAlt,
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            padding: "8px 14px",
          }}
        >
          <Search size={14} style={{ color: t.textDisabled }} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar producto o vendedor..."
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: 13,
              color: t.textPrimary,
              width: 200,
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* ── Lista de productos ── */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {productos.length === 0 && (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: t.textDisabled,
              fontSize: 13,
            }}
          >
            No hay productos en este estado.
          </div>
        )}

        {productos.map((p) => {
          const margen = (((p.precio - p.costo) / p.precio) * 100).toFixed(0);
          const isPending = p.status === "pending";

          return (
            <div
              key={p.id}
              style={{
                border: `1.5px solid ${isPending ? t.warningBg : t.border}`,
                borderRadius: 14,
                padding: "18px 20px",
                background: isPending ? `${t.warningBg}33` : "white",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Imagen placeholder */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: p.imagenColor + "22",
                  border: `2px solid ${p.imagenColor}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Package size={24} style={{ color: p.imagenColor }} />
              </div>

              {/* Info principal */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: t.textPrimary,
                    }}
                  >
                    {p.nombre}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: t.textDisabled,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {p.sku}
                  </span>
                  <span style={{ fontSize: 11, color: t.textSecondary }}>
                    {p.categoria}
                  </span>
                  <span style={{ fontSize: 11, color: t.textSecondary }}>
                    Vendedor: <strong>{p.vendedor}</strong>
                  </span>
                  <span style={{ fontSize: 11, color: t.textDisabled }}>
                    {p.fechaSubida}
                  </span>
                </div>

                {/* Motivo de rechazo si aplica */}
                {p.status === "rejected" && p.motivoRechazo && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "8px 12px",
                      background: t.errorBg,
                      borderRadius: 8,
                      fontSize: 11,
                      color: t.error,
                      fontWeight: 500,
                      borderLeft: `3px solid ${t.error}`,
                    }}
                  >
                    Motivo: {p.motivoRechazo}
                  </div>
                )}
              </div>

              {/* Precio, costo, margen */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: t.textPrimary,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    ${p.precio.toFixed(2)}
                  </div>
                  <div style={{ fontSize: 11, color: t.textDisabled }}>
                    Costo: ${p.costo.toFixed(2)}
                  </div>
                </div>
                <span
                  style={{
                    background:
                      Number(margen) >= 30 ? t.successBg : t.warningBg,
                    color: Number(margen) >= 30 ? t.success : t.warning,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {margen}% margen
                </span>
              </div>

              {/* Acciones */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {/* Ver detalle */}
                <button
                  onClick={() => onVerDetalle(p)}
                  title="Ver detalle"
                  style={{
                    border: `1px solid ${t.border}`,
                    background: "white",
                    color: t.brand400,
                    borderRadius: 10,
                    padding: "8px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    transition: "all 0.15s",
                  }}
                >
                  <Eye size={14} /> Ver
                </button>

                {/* Solo para pendientes */}
                {isPending && (
                  <>
                    <button
                      onClick={() => onAprobar(p.id)}
                      style={{
                        border: "none",
                        background: t.success,
                        color: "white",
                        borderRadius: 10,
                        padding: "8px 14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.85")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      <Check size={14} /> Aprobar
                    </button>
                    <button
                      onClick={() => onRechazar(p)}
                      style={{
                        border: "none",
                        background: t.errorBg,
                        color: t.error,
                        borderRadius: 10,
                        padding: "8px 14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.background = t.error),
                        (e.currentTarget.style.color = "white")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.background = t.errorBg),
                        (e.currentTarget.style.color = t.error)
                      )}
                    >
                      <X size={14} /> Rechazar
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
