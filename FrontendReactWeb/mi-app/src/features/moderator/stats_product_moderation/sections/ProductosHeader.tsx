"use client";

import React from 'react';
import { EstadisticasGlobales } from '../types/productos.types';
import { colors } from '../theme/productos.theme';

const IconBox = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const IconTag = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const IconCash = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const IconEye = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconTrend = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

function StatCard({ label, value, sub, iconColor, iconBg, icon }: {
  label: string; value: string; sub?: string;
  iconColor: string; iconBg: string; icon: React.ReactNode;
}) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 13, flex: 1, minWidth: 148, boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: colors.text.primary, lineHeight: 1 }}>{value}</p>
        <p style={{ margin: '3px 0 0', fontSize: 11, color: colors.text.secondary }}>{label}</p>
        {sub && <p style={{ margin: '1px 0 0', fontSize: 10.5, color: '#10B981', fontWeight: 600 }}>{sub}</p>}
      </div>
    </div>
  );
}

export function ProductosHeader({ globales }: { globales: EstadisticasGlobales }) {
  const ingresos = (globales.totalIngresos / 1000000).toFixed(0);
  const vistas = globales.totalVistas >= 1000
    ? `${(globales.totalVistas / 1000).toFixed(0)}k`
    : globales.totalVistas.toLocaleString();

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: colors.text.primary }}>Estadísticas de Productos</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13.5, color: colors.text.secondary }}>Panel de moderación — rendimiento de todos los productos de la plataforma</p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
        <StatCard label="Total Productos"   value={String(globales.totalProductos)}     sub={`${globales.productosActivos} activos`} iconColor={colors.brand[600]} iconBg={colors.brand[100]} icon={<IconBox />} />
        <StatCard label="Unidades Vendidas" value={globales.totalVentas.toLocaleString()} iconColor="#F59E0B" iconBg="#FEF3C7" icon={<IconTag />} />
        <StatCard label="Ingresos Totales"  value={`RD$ ${ingresos}M`}                  iconColor="#10B981" iconBg="#D1FAE5" icon={<IconCash />} />
        <StatCard label="Vistas Totales"    value={vistas}                               iconColor={colors.brand[400]} iconBg={colors.brand[100]} icon={<IconEye />} />
        <StatCard label="Calificación Prom" value={globales.promedioCalificacion.toFixed(2)} iconColor="#F59E0B" iconBg="#FEF3C7" icon={<IconStar />} />
        <StatCard label="Crecimiento Gral." value={`+${globales.crecimientoGeneral}%`}  iconColor="#10B981" iconBg="#D1FAE5" icon={<IconTrend />} />
      </div>
    </div>
  );
}