import React from 'react';
import { VentaDia } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

export function VentasChart({ data }: { data: VentaDia[] }) {
  const max = Math.max(...data.map((d) => d.ventas), 1);
  return (
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.title}>Actividad por modulo</div>
        <div style={s.subtitle}>Ventas semanales</div>
      </div>
      <div style={s.chart}>
        {data.map((d) => (
          <div key={d.dia} style={s.col}>
            <div style={{ ...s.bar, height: `${(d.ventas / max) * 100}%` }} />
            <div style={s.label}>{d.dia}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  card: { background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 16, boxShadow: `0 1px 4px ${colors.shadow}` },
  header: { marginBottom: 12 },
  title: { fontSize: 14, fontWeight: 700, color: colors.text.primary },
  subtitle: { fontSize: 12, color: colors.text.secondary, marginTop: 2 },
  chart: { display: 'flex', alignItems: 'flex-end', gap: 10, height: 160 },
  col: { flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 },
  bar: { width: '100%', minHeight: 6, borderRadius: 6, background: colors.brand[400] },
  label: { fontSize: 11, color: colors.text.secondary },
} as const;
