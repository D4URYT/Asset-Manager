"use client";

import React from 'react';
import { EstadisticasGlobales } from '../types/estadisticas.types';
import { colors } from '../theme/estadisticas.theme';

const IconBuilding = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const IconCheckCircle = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconCash = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const IconShoppingBag = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconTrend = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

interface StatCard { label: string; value: string; iconColor: string; iconBg: string; icon: React.ReactNode; sub?: string; }

function Card({ label, value, iconColor, iconBg, icon, sub }: StatCard) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 150, boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.text.primary, lineHeight: 1 }}>{value}</p>
        <p style={{ margin: '3px 0 0', fontSize: 11, color: colors.text.secondary }}>{label}</p>
        {sub && <p style={{ margin: '2px 0 0', fontSize: 11, color: '#10B981', fontWeight: 600 }}>{sub}</p>}
      </div>
    </div>
  );
}

export function EstadisticasHeader({ globales }: { globales: EstadisticasGlobales }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: colors.text.primary }}>Estadísticas de Empresas</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13.5, color: colors.text.secondary }}>Panel de moderación — rendimiento y actividad de empresas registradas en la plataforma</p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
        <Card label="Total Empresas"     value={String(globales.totalEmpresas)}    iconColor={colors.brand[600]} iconBg={colors.brand[100]} icon={<IconBuilding />} sub={`${globales.empresasActivas} activas`} />
        <Card label="Ventas Totales"     value={globales.totalVentas.toLocaleString()} iconColor="#F59E0B" iconBg="#FEF3C7" icon={<IconShoppingBag />} />
        <Card label="Ingresos Plataforma" value={`RD$ ${(globales.totalIngresos / 1000000).toFixed(1)}M`} iconColor="#10B981" iconBg="#D1FAE5" icon={<IconCash />} />
        <Card label="Calif. Promedio"    value={globales.promedioCalificacion.toFixed(1)} iconColor="#F59E0B" iconBg="#FEF3C7" icon={<IconStar />} />
        <Card label="Crecimiento Gral."  value={`+${globales.crecimientoGeneral}%`} iconColor={colors.brand[400]} iconBg={colors.brand[100]} icon={<IconTrend />} />
      </div>
    </div>
  );
}