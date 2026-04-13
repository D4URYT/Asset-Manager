"use client";

import React from "react";
import { Search, Check, X, Eye, MapPin, User } from "lucide-react";
import { Company, StatusFilter } from "../types/companies.types";
import { StatusBadge } from "../ui/CompaniesUI";
import { companiesTheme as t } from "../theme/companies.theme";
import { STATUS_FILTERS, COMPANY_TYPES } from "../data/companies.data";

interface CompaniesListSectionProps {
  companies: Company[];
  search: string;
  activeFilter: StatusFilter;
  activeType: string;
  counters: Record<string, number>;
  onSearchChange: (v: string) => void;
  onFilterChange: (v: StatusFilter) => void;
  onTypeChange: (v: string) => void;
  onViewDetail: (c: Company) => void;
  onApprove: (id: string) => void;
  onReject: (c: Company) => void;
}

export function CompaniesListSection({
  companies, search, activeFilter, activeType, counters,
  onSearchChange, onFilterChange, onTypeChange,
  onViewDetail, onApprove, onReject,
}: CompaniesListSectionProps) {
  return (
    <div style={{
      background: "white", borderRadius: 16,
      border: `1px solid ${t.border}`,
      animation: "slideIn 0.5s ease 0.2s both",
    }}>
      {/* ── Toolbar ── */}
      <div style={{
        padding: "16px 24px", borderBottom: `1px solid ${t.border}`,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {/* Row 1: status filters + search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {STATUS_FILTERS.map((f) => (
              <button key={f.key} onClick={() => onFilterChange(f.key as StatusFilter)} style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                background: activeFilter === f.key ? t.brand600 : t.bgAlt,
                color: activeFilter === f.key ? "white" : t.textSecondary,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {f.label}
                <span style={{
                  background: activeFilter === f.key ? "rgba(255,255,255,0.25)" : t.border,
                  color: activeFilter === f.key ? "white" : t.textDisabled,
                  borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700,
                }}>
                  {counters[f.key]}
                </span>
              </button>
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: t.bgAlt, border: `1px solid ${t.border}`,
            borderRadius: 10, padding: "8px 14px",
          }}>
            <Search size={14} style={{ color: t.textDisabled }} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search company, tax ID or representative..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13, color: t.textPrimary, width: 240, fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Row 2: type filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {COMPANY_TYPES.map((type) => (
            <button key={type} onClick={() => onTypeChange(type)} style={{
              padding: "4px 12px", borderRadius: 20,
              border: `1px solid ${activeType === type ? t.brand400 : t.border}`,
              background: activeType === type ? t.brand100 : "white",
              color: activeType === type ? t.brand600 : t.textSecondary,
              fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
            }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ── List ── */}
      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {companies.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: t.textDisabled, fontSize: 13 }}>
            No companies found for this filter.
          </div>
        )}

        {companies.map((c) => {
          const isPending     = c.status === "pending";
          const allDocsUploaded = c.documents.every((d) => d.uploaded);
          const missingDocs   = c.documents.filter((d) => !d.uploaded).length;

          return (
            <div key={c.id} style={{
              border: `1.5px solid ${isPending ? t.warningBg : t.border}`,
              borderRadius: 14, padding: "18px 20px",
              background: isPending ? `${t.warningBg}33` : "white",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                {/* Avatar */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: c.avatarColor + "22",
                  border: `2px solid ${c.avatarColor}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, color: c.avatarColor,
                }}>
                  {c.name.charAt(0)}
                </div>

                {/* Main info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>{c.name}</span>
                    <StatusBadge status={c.status} />
                    {!allDocsUploaded && isPending && (
                      <span style={{
                        background: t.errorBg, color: t.error,
                        padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      }}>
                        ⚠ {missingDocs} missing doc{missingDocs > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: t.textDisabled, fontFamily: "'DM Mono', monospace" }}>
                      {c.taxId}
                    </span>
                    <span style={{
                      fontSize: 11, color: t.textSecondary,
                      background: t.bgAlt, padding: "2px 8px", borderRadius: 20, fontWeight: 600,
                    }}>
                      {c.type}
                    </span>
                    <span style={{ fontSize: 11, color: t.textSecondary, display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} /> {c.city}, {c.country}
                    </span>
                    <span style={{ fontSize: 11, color: t.textSecondary, display: "flex", alignItems: "center", gap: 4 }}>
                      <User size={11} /> {c.representative}
                    </span>
                    <span style={{ fontSize: 11, color: t.textDisabled }}>{c.registeredAt}</span>
                  </div>

                  {/* Rejection reason */}
                  {c.status === "rejected" && c.rejectionReason && (
                    <div style={{
                      padding: "8px 12px", background: t.errorBg,
                      borderRadius: 8, fontSize: 11, color: t.error,
                      fontWeight: 500, borderLeft: `3px solid ${t.error}`,
                    }}>
                      Reason: {c.rejectionReason}
                    </div>
                  )}
                </div>

                {/* Employees + actions */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: t.textDisabled }}>Employees</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary }}>{c.employees}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onViewDetail(c)} style={{
                      border: `1px solid ${t.border}`, background: "white",
                      color: t.brand400, borderRadius: 10, padding: "8px 12px",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                      fontSize: 12, fontWeight: 600, transition: "all 0.15s",
                    }}>
                      <Eye size={14} /> View
                    </button>
                    {isPending && (
                      <>
                        <button onClick={() => onApprove(c.id)} style={{
                          border: "none", background: t.success, color: "white",
                          borderRadius: 10, padding: "8px 14px",
                          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                          fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                        }}
                          onMouseEnter={(ev) => (ev.currentTarget.style.opacity = "0.85")}
                          onMouseLeave={(ev) => (ev.currentTarget.style.opacity = "1")}
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button onClick={() => onReject(c)} style={{
                          border: "none", background: t.errorBg, color: t.error,
                          borderRadius: 10, padding: "8px 14px",
                          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                          fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                        }}
                          onMouseEnter={(ev) => { ev.currentTarget.style.background = t.error; ev.currentTarget.style.color = "white"; }}
                          onMouseLeave={(ev) => { ev.currentTarget.style.background = t.errorBg; ev.currentTarget.style.color = t.error; }}
                        >
                          <X size={14} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}