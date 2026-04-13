"use client";
// src/feature/company/ui/InfoCard.tsx

import { type LucideIcon } from "lucide-react";
import T from "@/features/seller/company_config/theme/appTheme";

interface Props {
  label:    string;
  value:    string;
  Icon?:    LucideIcon;
  fullWidth?: boolean;
}

export default function InfoCard({ label, value, Icon, fullWidth }: Props) {
  return (
    <div style={{
      background: T.bgAlt,
      borderRadius: 10,
      padding: "12px 16px",
      gridColumn: fullWidth ? "1 / -1" : undefined,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
        {Icon && <Icon size={14} />}
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: T.text1 }}>{value}</div>
    </div>
  );
}
