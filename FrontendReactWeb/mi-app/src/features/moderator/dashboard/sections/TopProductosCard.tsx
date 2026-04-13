import React from 'react';
import { ProductoTop } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

export function TopProductosCard({ productos }: { productos: ProductoTop[] }) {
  return (
    <div style={s.card}>
      <div style={s.title}>Top productos</div>
      <div style={s.list}>
        {productos.map((p) => (
          <div key={p.id} style={s.row}>
            <div style={s.info}>
              <div style={s.name}>{p.nombre}</div>
              <div style={s.meta}>{p.empresa}</div>
            </div>
            <div style={s.score}>{p.calificacion.toFixed(1)}</div>
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
  score: { fontSize: 12, fontWeight: 700, color: colors.estado.warning.main },
} as const;
