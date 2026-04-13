"use client";
// src/feature/orders/ui/StatCard.tsx

import { type LucideIcon } from "lucide-react";
import T from "../theme/ordersTheme";

interface Props {
  label:   string;
  value:   string | number;
  Icon:    LucideIcon;
  accent:  string;
  trend?:  string;
}

export default function StatCard({ label, value, Icon, accent, trend }: Props) {
  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "18px 20px",
      borderLeft: `4px solid ${accent}`,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <Icon size={18} color={accent} />
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: T.text1, lineHeight: 1 }}>{value}</div>
      {trend && <div style={{ fontSize: 12, color: T.text3 }}>{trend}</div>}
    </div>
  );
}
