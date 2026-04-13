import React from 'react';
import { KpiGlobal } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

interface KPIGridProps {
  kpis: KpiGlobal;
}

export function KPIGrid({ kpis }: KPIGridProps) {
  const cards = [
    { label: 'Empresas', value: kpis.totalEmpresas, sub: `${kpis.empresasActivas} activas`, color: colors.brand[600], bg: colors.brand[100] },
    { label: 'Productos', value: kpis.totalProductos, sub: `Vistas ${kpis.totalVistas.toLocaleString()}`, color: colors.estado.info.main, bg: colors.estado.info.bg },
    { label: 'Ventas', value: kpis.totalVentas, sub: `+${kpis.crecimientoVentas}%`, color: colors.estado.success.main, bg: colors.estado.success.bg },
    { label: 'Reportes', value: kpis.totalReportes, sub: `${kpis.reportesPendientes} pendientes`, color: colors.estado.warning.main, bg: colors.estado.warning.bg },
  ];

  return (
    <div style={s.grid}>
      {cards.map((c) => (
        <div key={c.label} style={s.card}>
          <div style={{ ...s.badge, color: c.color, background: c.bg }}>{c.label}</div>
          <div style={s.value}>{c.value.toLocaleString()}</div>
          <div style={{ ...s.sub, color: c.color }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

const s = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 },
  card: {
    background: colors.bg.secondary,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: `0 1px 4px ${colors.shadow}`,
  },
  badge: { fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, display: 'inline-flex', alignSelf: 'flex-start' as const },
  value: { marginTop: 10, fontSize: 22, fontWeight: 700, color: colors.text.primary },
  sub: { marginTop: 4, fontSize: 12, fontWeight: 600 },
} as const;
