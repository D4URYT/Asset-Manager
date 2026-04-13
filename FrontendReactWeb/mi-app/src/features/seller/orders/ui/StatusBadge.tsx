"use client";
// src/feature/orders/ui/StatusBadge.tsx

import { OrderStatus } from "../types/order.types";
import T from "../theme/ordersTheme";

interface StatusMeta {
  label: string;
  bg:    string;
  color: string;
  dot:   string;
}

const STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending:   { label: "Pendiente",  bg: T.warnBg,    color: "#92400E", dot: T.warn     },
  sent:      { label: "Enviado",    bg: T.brand100,  color: T.brand700, dot: T.brand400 },
  delivered: { label: "Entregado",  bg: T.successBg, color: "#065F46", dot: T.success  },
  cancelled: { label: "Cancelado",  bg: T.errorBg,   color: "#991B1B", dot: T.error    },
};

interface Props {
  status: OrderStatus;
}

export default function StatusBadge({ status }: Props) {
  const m = STATUS_META[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: m.bg, color: m.color,
      fontSize: 11, fontWeight: 700,
      padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
      {m.label}
    </span>
  );
}