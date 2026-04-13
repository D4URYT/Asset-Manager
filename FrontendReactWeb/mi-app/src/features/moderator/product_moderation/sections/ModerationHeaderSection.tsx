"use client";

import React from "react";
import { moderationTheme as t } from "../theme/moderation.theme";
import { ModerationStatCardUI } from "../ui/ModerationUI";
import { MODERACION_STATS } from "../data/moderation.data";

export function ModerationHeaderSection() {
  return (
    <div style={{ marginBottom: 28, animation: "slideIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Moderación de Productos
        </h1>
        <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
          Revisa y aprueba los productos subidos por los vendedores antes de
          publicarlos.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          animation: "slideIn 0.5s ease 0.1s both",
        }}
      >
        {MODERACION_STATS.map((stat) => (
          <ModerationStatCardUI key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}
