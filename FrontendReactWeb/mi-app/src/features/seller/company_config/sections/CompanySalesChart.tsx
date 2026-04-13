"use client";
// src/feature/company/sections/CompanySalesChart.tsx

import { LineChart } from "lucide-react";
import { MonthlySale } from "../types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";

interface Props {
  salesHistory: MonthlySale[];
}

export default function CompanySalesChart({ salesHistory }: Props) {
  const maxSales  = Math.max(...salesHistory.map((s) => s.sales));
  const maxOrders = Math.max(...salesHistory.map((s) => s.orders));
  const totalSales  = salesHistory.reduce((a, s) => a + s.sales, 0);
  const totalOrders = salesHistory.reduce((a, s) => a + s.orders, 0);
  const avgSales    = Math.round(totalSales / salesHistory.length);

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "20px 24px", marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text1, margin: 0, display: "flex", alignItems: "center" }}>
          <LineChart size={16} style={{ marginRight: 8 }} /> Ventas últimos 6 meses
        </h2>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: T.text3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.text1 }}>RD$ {totalSales.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: T.text3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Pedidos</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.text1 }}>{totalOrders}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: T.text3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Prom. mes</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.brand400 }}>RD$ {avgSales.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
        {salesHistory.map((s) => {
          const heightPct = (s.sales / maxSales) * 100;
          const ordersPct = (s.orders / maxOrders) * 100;
          return (
            <div key={s.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
              {/* Value label */}
              <div style={{ fontSize: 10, color: T.text3, fontWeight: 600, flexShrink: 0 }}>
                {(s.sales / 1000).toFixed(0)}k
              </div>
              {/* Bars container */}
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: 3 }}>
                {/* Sales bar */}
                <div style={{ flex: 1, height: `${heightPct}%`, background: T.brand400, borderRadius: "4px 4px 0 0", minHeight: 4, transition: "height 0.3s ease" }} />
                {/* Orders bar */}
                <div style={{ flex: 1, height: `${ordersPct}%`, background: T.successBg, borderRadius: "4px 4px 0 0", minHeight: 4, border: `1px solid ${T.success}`, transition: "height 0.3s ease" }} />
              </div>
              {/* Month label */}
              <div style={{ fontSize: 11, color: T.text2, fontWeight: 600, flexShrink: 0 }}>{s.month}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: T.brand400 }} />
          <span style={{ fontSize: 12, color: T.text3 }}>Ventas (RD$)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: T.successBg, border: `1px solid ${T.success}` }} />
          <span style={{ fontSize: 12, color: T.text3 }}>Pedidos</span>
        </div>
      </div>
    </div>
  );
}