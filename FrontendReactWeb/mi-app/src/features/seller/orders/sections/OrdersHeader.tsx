"use client";
// src/feature/orders/sections/OrdersHeader.tsx

import { Download } from "lucide-react";
import T from "../theme/ordersTheme";

interface Props {
  totalOrders: number;
}

export default function OrdersHeader({ totalOrders }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text1, margin: 0 }}>
          Gestión de Pedidos
        </h1>
        <p style={{ fontSize: 13, color: T.text2, margin: "4px 0 0" }}>
          {totalOrders} pedidos registrados en total
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => alert("Exportando...")}
          style={{
            background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 8,
            padding: "9px 16px", fontSize: 13, fontWeight: 600, color: T.text2,
            cursor: "pointer", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}
        >
          <Download size={14} /> Exportar CSV
        </button>
        <button
          style={{ background: T.brand600, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.brand700)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.brand600)}
        >
          + Nuevo Pedido
        </button>
      </div>
    </div>
  );
}
