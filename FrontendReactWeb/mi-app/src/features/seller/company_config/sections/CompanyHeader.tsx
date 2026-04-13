"use client";
// src/feature/company/sections/CompanyHeader.tsx

import { Pencil } from "lucide-react";
import { Company } from "../types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";

interface Props {
  company:  Company;
  onEdit:   () => void;
}

export default function CompanyHeader({ company, onEdit }: Props) {
  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "24px 28px", marginBottom: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* Logo / Initials */}
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: T.brand600,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "#fff", flexShrink: 0,
          letterSpacing: 1,
        }}>
          {company.logoInitials}
        </div>

        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text1, margin: 0 }}>
            {company.name}
          </h1>
          <p style={{ fontSize: 13, color: T.text2, margin: "3px 0 0" }}>
            {company.legalName}
          </p>
          <p style={{ fontSize: 12, color: T.text3, margin: "2px 0 0" }}>
            RNC: {company.rnc} · Desde {company.foundedYear}
          </p>
        </div>
      </div>

      <button
        onClick={onEdit}
        style={{
          background: T.brand600, border: "none", borderRadius: 8,
          padding: "9px 18px", fontSize: 13, fontWeight: 600, color: "#fff",
          cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = T.brand700)}
        onMouseLeave={(e) => (e.currentTarget.style.background = T.brand600)}
      >
        <Pencil size={14} /> Editar empresa
      </button>
    </div>
  );
}