import React from 'react';
import { ReporteReciente } from '../types/dashboard.types';
import { colors, prioridadCfg, reporteEstadoCfg } from '../theme/dashboard.theme';

export function ReportesCard({ reportes }: { reportes: ReporteReciente[] }) {
  return (
    <div style={s.card}>
      <div style={s.title}>Reportes recientes</div>
      <div style={s.list}>
        {reportes.map((r) => {
          const estado = reporteEstadoCfg[r.estado];
          const prioridad = prioridadCfg[r.prioridad];
          return (
            <div key={r.id} style={s.row}>
              <div style={s.code}>{r.codigo}</div>
              <div style={s.info}>
                <div style={s.name}>{r.titulo}</div>
                <div style={s.meta}>{r.usuario}</div>
              </div>
              <span style={{ ...s.badge, color: estado.text, background: estado.bg }}>
                {estado.label}
              </span>
              <span style={{ ...s.badge, color: prioridad.color, background: prioridad.bg }}>
                {prioridad.label}
              </span>
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
  code: { fontSize: 11, fontWeight: 700, color: colors.brand[600], background: colors.brand[100], padding: '2px 6px', borderRadius: 6 },
  info: { flex: 1 },
  name: { fontSize: 12.5, fontWeight: 600, color: colors.text.primary },
  meta: { fontSize: 11, color: colors.text.secondary, marginTop: 2 },
  badge: { fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 999 },
} as const;
