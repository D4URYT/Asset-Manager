"use client";

import React from "react";
import { ProductoStatCard } from "../ui/ProductoCard";
import { PRODUCTO_STATS } from "../data/productos.data";

export function ProductosStatsSection() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16, marginBottom: 24,
      animation: "slideIn 0.5s ease 0.1s both",
    }}>
      {PRODUCTO_STATS.map((stat) => (
        <ProductoStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}