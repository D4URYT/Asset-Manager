import React from 'react';
import { colors } from '../theme/dashboard.theme';

export function SaludPlataformaCard() {
  const items = [
    { label: 'Servicios activos', value: '98%', color: colors.estado.success.main },
    { label: 'Alertas criticas', value: '2', color: colors.estado.error.main },
    { label: 'Latencia promedio', value: '220ms', color: colors.estado.warning.main },
  ];

  return (
    <div style={s.card}>
      <div style={s.title}>Salud de la plataforma</div>
      <div style={s.list}>
        {items.map((i) => (
          <div key={i.label} style={s.row}>
            <span style={s.label}>{i.label}</span>
            <span style={{ ...s.value, color: i.color }}>{i.value}</span>
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
  row: { display: 'flex', alignItems: 'center', gap: 8 },
  label: { flex: 1, fontSize: 12, color: colors.text.secondary },
  value: { fontSize: 12, fontWeight: 700 },
} as const;
