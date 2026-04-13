"use client";

import React from "react";
import {
  X,
  Check,
  AlertTriangle,
  Package,
  User,
  Tag,
  DollarSign,
  Hash,
} from "lucide-react";
import { ProductoPendiente } from "../types/moderation.types";
import { StatusBadge } from "../ui/ModerationUI";
import { moderationTheme as t } from "../theme/moderation.theme";

interface ModerationDetallePanelProps {
  producto: ProductoPendiente;
  onCerrar: () => void;
  onAprobar: (id: string) => void;
  onRechazar: (p: ProductoPendiente) => void;
}

function FilaInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 0",
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: t.bgAlt,
          color: t.textSecondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <Icon size={13} />
      </div>
      <div>
        <div
          style={{
            fontSize: 10,
            color: t.textDisabled,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            color: t.textPrimary,
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export function ModerationDetallePanel({
  producto,
  onCerrar,
  onAprobar,
  onRechazar,
}: ModerationDetallePanelProps) {
  const margen = (
    ((producto.precio - producto.costo) / producto.precio) *
    100
  ).toFixed(0);
  const isPending = producto.status === "pending";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 420,
        height: "100vh",
        background: "white",
        borderLeft: `1px solid ${t.border}`,
        boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
        zIndex: 500,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        animation: "slideInRight 0.25s ease",
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
        }}
      >
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>
            Detalle del producto
          </h3>
          <p style={{ fontSize: 11, color: t.textDisabled, marginTop: 2 }}>
            {producto.id}
          </p>
        </div>
        <button
          onClick={onCerrar}
          style={{
            border: "none",
            background: t.bgAlt,
            cursor: "pointer",
            width: 32,
            height: 32,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: t.textSecondary,
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Imagen placeholder */}
      <div
        style={{
          margin: "20px 24px 0",
          height: 160,
          borderRadius: 14,
          background: producto.imagenColor + "18",
          border: `2px dashed ${producto.imagenColor}44`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Package size={40} style={{ color: producto.imagenColor }} />
        <span style={{ fontSize: 11, color: t.textDisabled }}>
          Vista previa del producto
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "20px 24px", flex: 1 }}>
        {/* Nombre y status */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: t.textPrimary,
                lineHeight: 1.3,
              }}
            >
              {producto.nombre}
            </h2>
            <StatusBadge status={producto.status} />
          </div>
        </div>

        {/* Descripción */}
        <div
          style={{
            padding: "12px 14px",
            background: t.bgAlt,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            {producto.descripcion}
          </p>
        </div>

        {/* Campos */}
        <FilaInfo icon={Hash} label="SKU" value={producto.sku} />
        <FilaInfo icon={Tag} label="Categoría" value={producto.categoria} />
        <FilaInfo
          icon={User}
          label="Vendedor"
          value={`${producto.vendedor} · ${producto.vendedorEmail}`}
        />
        <FilaInfo
          icon={Package}
          label="Stock"
          value={`${producto.stock} unidades`}
        />
        <FilaInfo
          icon={DollarSign}
          label="Precio"
          value={`$${producto.precio.toFixed(2)}`}
        />
        <FilaInfo
          icon={DollarSign}
          label="Costo"
          value={`$${producto.costo.toFixed(2)}`}
        />

        {/* Margen */}
        <div
          style={{
            padding: "12px 0",
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: 12, color: t.textSecondary, fontWeight: 600 }}
          >
            Margen de ganancia
          </span>
          <span
            style={{
              background: Number(margen) >= 30 ? t.successBg : t.warningBg,
              color: Number(margen) >= 30 ? t.success : t.warning,
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {margen}%
          </span>
        </div>

        {/* Motivo de rechazo */}
        {producto.status === "rejected" && producto.motivoRechazo && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: t.errorBg,
              borderRadius: 10,
              borderLeft: `4px solid ${t.error}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: t.error,
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Motivo de rechazo
            </div>
            <p style={{ fontSize: 12, color: t.error, lineHeight: 1.5 }}>
              {producto.motivoRechazo}
            </p>
          </div>
        )}
      </div>

      {/* Acciones fijas al fondo */}
      {isPending && (
        <div
          style={{
            padding: "16px 24px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            gap: 10,
            position: "sticky",
            bottom: 0,
            background: "white",
          }}
        >
          <button
            onClick={() => onRechazar(producto)}
            style={{
              flex: 1,
              border: `1.5px solid ${t.error}`,
              background: "white",
              color: t.error,
              borderRadius: 10,
              padding: "11px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = t.errorBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <AlertTriangle size={15} /> Rechazar
          </button>
          <button
            onClick={() => onAprobar(producto.id)}
            style={{
              flex: 1,
              border: "none",
              background: t.success,
              color: "white",
              borderRadius: 10,
              padding: "11px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Check size={15} /> Aprobar
          </button>
        </div>
      )}
    </div>
  );
}
