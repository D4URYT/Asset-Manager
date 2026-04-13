"use client";
// src/feature/company/sections/CompanyInfo.tsx

import { Building, Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Company } from "../types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";
import InfoCard from "../ui/InfoCard";

interface Props {
  company: Company;
}

export default function CompanyInfo({ company }: Props) {
  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "20px 24px", marginBottom: 20,
    }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text1, margin: "0 0 16px", display: "flex", alignItems: "center" }}>
        <Building2 size={16} style={{ marginRight: 8 }} /> Información de la empresa
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <InfoCard label="Correo electrónico" value={company.email}   Icon={Mail} />
        <InfoCard label="Teléfono"           value={company.phone}   Icon={Phone} />
        <InfoCard label="Ciudad"             value={company.city}    Icon={Building} />
        <InfoCard label="País"               value={company.country} Icon={Globe} />
        <InfoCard label="Dirección completa" value={company.address} Icon={MapPin} fullWidth />
      </div>
    </div>
  );
}