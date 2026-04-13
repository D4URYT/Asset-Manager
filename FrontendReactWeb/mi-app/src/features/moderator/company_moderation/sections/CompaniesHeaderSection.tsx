"use client";

import React from "react";
import { companiesTheme as t } from "../theme/companies.theme";
import { CompanyStatCardUI } from "../ui/CompaniesUI";
import { COMPANIES_STATS } from "../data/companies.data";

export function CompaniesHeaderSection() {
  return (
    <div style={{ marginBottom: 28, animation: "slideIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em" }}>
          Company Moderation
        </h1>
        <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
          Review and approve registered companies before activating them on the platform.
        </p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16, animation: "slideIn 0.5s ease 0.1s both",
      }}>
        {COMPANIES_STATS.map((stat) => (
          <CompanyStatCardUI key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}