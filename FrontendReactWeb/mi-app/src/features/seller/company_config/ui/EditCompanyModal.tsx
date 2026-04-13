"use client";
// src/feature/company/ui/EditCompanyModal.tsx

import { useState, FormEvent } from "react";
import { X } from "lucide-react";
import { Company } from "../types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";

interface Props {
  company:  Company;
  onClose:  () => void;
  onSave:   (fields: Partial<Company>) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px",
  borderRadius: 8, border: `1px solid ${T.border}`,
  fontSize: 13, color: T.text1, background: T.bgCard,
  outline: "none", fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: T.text2,
  marginBottom: 5, display: "block",
};

export default function EditCompanyModal({ company, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name:      company.name,
    legalName: company.legalName,
    rnc:       company.rnc,
    email:     company.email,
    phone:     company.phone,
    address:   company.address,
    city:      company.city,
    country:   company.country,
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(15,23,42,.45)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.bgCard, borderRadius: 16,
        width: "100%", maxWidth: 540,
        boxShadow: "0 24px 64px rgba(0,0,0,.2)",
        overflow: "hidden", maxHeight: "90vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ background: T.brand600, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Editar Empresa</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px", overflowY: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Nombre comercial</label>
              <input style={inputStyle} value={form.name} onChange={set("name")} required />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Razón social</label>
              <input style={inputStyle} value={form.legalName} onChange={set("legalName")} />
            </div>

            <div>
              <label style={labelStyle}>RNC</label>
              <input style={inputStyle} value={form.rnc} onChange={set("rnc")} />
            </div>

            <div>
              <label style={labelStyle}>Teléfono</label>
              <input style={inputStyle} value={form.phone} onChange={set("phone")} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Correo electrónico</label>
              <input style={inputStyle} type="email" value={form.email} onChange={set("email")} required />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Dirección</label>
              <input style={inputStyle} value={form.address} onChange={set("address")} />
            </div>

            <div>
              <label style={labelStyle}>Ciudad</label>
              <input style={inputStyle} value={form.city} onChange={set("city")} />
            </div>

            <div>
              <label style={labelStyle}>País</label>
              <input style={inputStyle} value={form.country} onChange={set("country")} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} style={{
              padding: "9px 20px", borderRadius: 8, border: `1px solid ${T.border}`,
              background: T.bgAlt, fontSize: 13, fontWeight: 600, color: T.text2,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              Cancelar
            </button>
            <button type="submit" style={{
              padding: "9px 20px", borderRadius: 8, border: "none",
              background: T.brand600, fontSize: 13, fontWeight: 600, color: "#fff",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}