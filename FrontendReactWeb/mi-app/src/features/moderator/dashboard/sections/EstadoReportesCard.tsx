import React from 'react';
import { ReporteReciente } from '../types/dashboard.types';
import { colors, reporteEstadoCfg } from '../theme/dashboard.theme';

export function EstadoReportesCard({ reportes }: { reportes: ReporteReciente[] }) {
  const counts = reportes.reduce(
    (acc, r) => {
      acc[r.estado] += 1;
      return acc;
    },
    { pendiente: 0, en_proceso: 0, solucionado: 0, rechazado: 0 }
  );

  const rows = [
    { key: 'pendiente', value: counts.pendiente },
    { key: 'en_proceso', value: counts.en_proceso },
    { key: 'solucionado', value: counts.solucionado },
    { key: 'rechazado', value: counts.rechazado },
  ] as const;

  return (
    <div style={s.card}>
      <div style={s.title}>Estado de reportes</div>
      <div style={s.list}>
        {rows.map((row) => {
          const cfg = reporteEstadoCfg[row.key];
          return (
            <div key={row.key} style={s.row}>
              <span style={{ ...s.dot, background: cfg.dot }} />
              <span style={s.label}>{cfg.label}</span>
              <span style={s.value}>{row.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  card: { background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 16, boxShadow: `0 1px 4px ${colors.shadow}` },
  title: { fontSize: 14, fontWeight: 700, color: colors.text.primary, marginBottom: 12 },
  list: { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  row: { display: 'flex', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  label: { flex: 1, fontSize: 12, color: colors.text.secondary },
  value: { fontSize: 12, fontWeight: 700, color: colors.text.primary },
} as const;
