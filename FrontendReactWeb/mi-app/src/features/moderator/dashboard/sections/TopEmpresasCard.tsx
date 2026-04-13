import React from 'react';
import { EmpresaTop } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

export function TopEmpresasCard({ empresas }: { empresas: EmpresaTop[] }) {
  return (
    <div style={s.card}>
      <div style={s.title}>Top empresas</div>
      <div style={s.list}>
        {empresas.map((e) => (
          <div key={e.id} style={s.row}>
            <div style={{ ...s.avatar, background: e.color }}>{e.iniciales}</div>
            <div style={s.info}>
              <div style={s.name}>{e.nombre}</div>
              <div style={s.meta}>Ventas {e.ventas.toLocaleString()}</div>
            </div>
            <div style={s.growth}>{e.crecimiento}%</div>
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
  avatar: { width: 28, height: 28, borderRadius: 8, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 12.5, fontWeight: 600, color: colors.text.primary },
  meta: { fontSize: 11, color: colors.text.secondary, marginTop: 2 },
  growth: { fontSize: 12, fontWeight: 700, color: colors.estado.success.main },
} as const;
