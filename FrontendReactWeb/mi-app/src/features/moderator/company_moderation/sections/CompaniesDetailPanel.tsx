"use client";

import React from "react";
import { X, Check, AlertTriangle, Building2, User, MapPin, Phone, Mail, Globe, Users, Hash } from "lucide-react";
import { Company } from "../types/companies.types";
import { StatusBadge, DocBadge } from "../ui/CompaniesUI";
import { companiesTheme as t } from "../theme/companies.theme";

interface CompaniesDetailPanelProps {
  company: Company;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (c: Company) => void;
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "10px 0", borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: t.bgAlt, color: t.textSecondary,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 1,
      }}>
        <Icon size={13} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: t.textDisabled, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </div>
        <div style={{ fontSize: 13, color: t.textPrimary, fontWeight: 500, marginTop: 2 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export function CompaniesDetailPanel({ company, onClose, onApprove, onReject }: CompaniesDetailPanelProps) {
  const isPending = company.status === "pending";
  const uploadedCount = company.documents.filter((d) => d.uploaded).length;

  return (
    <div style={{
      position: "fixed", top: 0, right: 0,
      width: 440, height: "100vh",
      background: "white", borderLeft: `1px solid ${t.border}`,
      boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
      zIndex: 500, overflowY: "auto",
      display: "flex", flexDirection: "column",
      animation: "slideInRight 0.25s ease",
    }}>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "20px 24px", borderBottom: `1px solid ${t.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, background: "white", zIndex: 1,
      }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>Company detail</h3>
          <p style={{ fontSize: 11, color: t.textDisabled, marginTop: 2 }}>{company.id}</p>
        </div>
        <button onClick={onClose} style={{
          border: "none", background: t.bgAlt, cursor: "pointer",
          width: 32, height: 32, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: t.textSecondary,
        }}>
          <X size={16} />
        </button>
      </div>

      {/* Avatar banner */}
      <div style={{
        margin: "20px 24px 0",
        padding: "24px", borderRadius: 14,
        background: company.avatarColor + "12",
        border: `2px dashed ${company.avatarColor}33`,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: company.avatarColor + "22",
          border: `2px solid ${company.avatarColor}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 800, color: company.avatarColor,
          flexShrink: 0,
        }}>
          {company.name.charAt(0)}
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, lineHeight: 1.3 }}>
            {company.name}
          </h2>
          <div style={{ marginTop: 6 }}>
            <StatusBadge status={company.status} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px", flex: 1 }}>
        {/* Description */}
        <div style={{
          padding: "12px 14px", background: t.bgAlt,
          borderRadius: 10, marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }}>
            {company.description}
          </p>
        </div>

        {/* Fields */}
        <InfoRow icon={Hash}      label="Tax ID"          value={company.taxId} />
        <InfoRow icon={Building2} label="Industry"        value={company.type} />
        <InfoRow icon={MapPin}    label="Location"        value={`${company.city}, ${company.country}`} />
        <InfoRow icon={User}      label="Representative"  value={company.representative} />
        <InfoRow icon={Mail}      label="Email"           value={company.email} />
        <InfoRow icon={Phone}     label="Phone"           value={company.phone} />
        <InfoRow icon={Globe}     label="Website"         value={company.website || "—"} />
        <InfoRow icon={Users}     label="Employees"       value={company.employees} />

        {/* Documents */}
        <div style={{ marginTop: 20 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Documents
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: uploadedCount === company.documents.length ? t.success : t.warning,
            }}>
              {uploadedCount}/{company.documents.length} uploaded
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {company.documents.map((doc) => (
              <DocBadge key={doc.name} doc={doc} />
            ))}
          </div>
        </div>

        {/* Rejection reason */}
        {company.status === "rejected" && company.rejectionReason && (
          <div style={{
            marginTop: 16, padding: "12px 14px",
            background: t.errorBg, borderRadius: 10,
            borderLeft: `4px solid ${t.error}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.error, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Rejection reason
            </div>
            <p style={{ fontSize: 12, color: t.error, lineHeight: 1.5 }}>
              {company.rejectionReason}
            </p>
          </div>
        )}
      </div>

      {/* Sticky footer actions */}
      {isPending && (
        <div style={{
          padding: "16px 24px", borderTop: `1px solid ${t.border}`,
          display: "flex", gap: 10,
          position: "sticky", bottom: 0, background: "white",
        }}>
          <button
            onClick={() => onReject(company)}
            style={{
              flex: 1, border: `1.5px solid ${t.error}`,
              background: "white", color: t.error,
              borderRadius: 10, padding: "11px",
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = t.errorBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <AlertTriangle size={15} /> Reject
          </button>
          <button
            onClick={() => onApprove(company.id)}
            style={{
              flex: 1, border: "none",
              background: t.success, color: "white",
              borderRadius: 10, padding: "11px",
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Check size={15} /> Approve
          </button>
        </div>
      )}
    </div>
  );
}