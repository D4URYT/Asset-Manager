import React from 'react';
import { ActividadReciente } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

export function ActividadCard({ actividad }: { actividad: ActividadReciente[] }) {
  return (
    <div style={s.card}>
      <div style={s.title}>Actividad reciente</div>
      <div style={s.list}>
        {actividad.map((a) => (
          <div key={a.id} style={s.row}>
            <div style={s.info}>
              <div style={s.name}>{a.titulo}</div>
              <div style={s.meta}>{a.descripcion}</div>
            </div>
            <div style={s.right}>
              <div style={s.time}>{a.tiempo}</div>
              {a.estado ? (
                <span style={{ ...s.badge, background: a.estadoColor ?? colors.estado.info.bg, color: a.estadoColor ?? colors.estado.info.text }}>
                  {a.estado}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  card: { background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 16, boxShadow: `0 1px 4px ${colors.shadow}` },
  title: { fontSize: 14, fontWeight: 700, color: colors.text.primary, marginBottom: 12 },
  list: { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  row: { display: 'flex', alignItems: 'center', gap: 10 },
  info: { flex: 1 },
  name: { fontSize: 12.5, fontWeight: 600, color: colors.text.primary },
  meta: { fontSize: 11, color: colors.text.secondary, marginTop: 2 },
  right: { display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 6 },
  time: { fontSize: 11, color: colors.text.disabled },
  badge: { fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 999 },
} as const;
