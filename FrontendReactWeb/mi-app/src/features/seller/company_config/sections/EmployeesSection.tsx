"use client";
// src/feature/company/sections/EmployeesSection.tsx

import { Ban, CheckCircle, Pencil, Users } from "lucide-react";
import { Employee } from "../types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";

interface Props {
  employees:    Employee[];
  onAdd:        () => void;
  onEdit:       (emp: Employee) => void;
  onToggle:     (id: string) => void;
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  Administrador: { bg: T.brand100,  color: T.brand700  },
  Vendedor:      { bg: T.successBg, color: "#065F46"   },
  Almacén:       { bg: "#FEF3C7",   color: "#92400E"   },
  Contabilidad:  { bg: "#EDE9FE",   color: "#5B21B6"   },
  Soporte:       { bg: "#F1F5F9",   color: T.text2     },
};

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: T.brand100, color: T.brand700,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export default function EmployeesSection({ employees, onAdd, onEdit, onToggle }: Props) {
  const active   = employees.filter((e) => e.status === "active").length;
  const disabled = employees.filter((e) => e.status === "disabled").length;

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* Section header */}
      <div style={{
        padding: "16px 24px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text1, margin: 0, display: "flex", alignItems: "center" }}>
            <Users size={16} style={{ marginRight: 8 }} /> Empleados
          </h2>
          <p style={{ fontSize: 12, color: T.text3, margin: "3px 0 0" }}>
            {active} activos · {disabled} deshabilitados
          </p>
        </div>
        <button
          onClick={onAdd}
          style={{
            background: T.brand600, border: "none", borderRadius: 8,
            padding: "8px 16px", fontSize: 12, fontWeight: 600, color: "#fff",
            cursor: "pointer", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.brand700)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.brand600)}
        >
          + Agregar empleado
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: T.bgAlt }}>
              {["Empleado", "Rol", "Correo", "Teléfono", "Estado", ""].map((h, i) => (
                <th key={i} style={{
                  padding: "10px 16px", fontSize: 11, fontWeight: 700, color: T.text3,
                  textAlign: "left", textTransform: "uppercase", letterSpacing: "0.06em",
                  borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const roleStyle = ROLE_COLORS[emp.role] ?? { bg: T.bgAlt, color: T.text2 };
              const isDisabled = emp.status === "disabled";
              return (
                <tr key={emp.id}
                  style={{ borderBottom: `1px solid ${T.border}`, opacity: isDisabled ? 0.55 : 1, transition: "background .1s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = T.bgAlt)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Empleado */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={emp.name} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: T.text1 }}>{emp.name}</span>
                    </div>
                  </td>

                  {/* Rol */}
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px",
                      borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: roleStyle.bg, color: roleStyle.color,
                    }}>
                      {emp.role}
                    </span>
                  </td>

                  {/* Correo */}
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text2 }}>{emp.email}</td>

                  {/* Teléfono */}
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text3, whiteSpace: "nowrap" }}>{emp.phone}</td>

                  {/* Estado */}
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: isDisabled ? T.errorBg  : T.successBg,
                      color:      isDisabled ? "#991B1B"  : "#065F46",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: isDisabled ? T.error : T.success }} />
                      {isDisabled ? "Deshabilitado" : "Activo"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => onEdit(emp)}
                        style={{
                          padding: "5px 10px", borderRadius: 7, border: `1px solid ${T.border}`,
                          background: T.bgAlt, fontSize: 11, fontWeight: 600, color: T.text2,
                          cursor: "pointer", fontFamily: "inherit",
                          display: "inline-flex", alignItems: "center", gap: 6,
                        }}
                      >
                        <Pencil size={12} /> Editar
                      </button>
                      <button
                        onClick={() => onToggle(emp.id)}
                        style={{
                          padding: "5px 10px", borderRadius: 7, border: `1px solid ${isDisabled ? T.successBg : T.errorBg}`,
                          background: isDisabled ? T.successBg : T.errorBg,
                          fontSize: 11, fontWeight: 600,
                          color: isDisabled ? "#065F46" : "#991B1B",
                          cursor: "pointer", fontFamily: "inherit",
                          display: "inline-flex", alignItems: "center", gap: 6,
                        }}
                      >
                        {isDisabled ? (<> <CheckCircle size={12} /> Activar </>) : (<> <Ban size={12} /> Deshabilitar </>)}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}