import React from 'react';
import { EstadoEmpresa } from '../types/estadisticas.types';
import { colors, estadoEmpresaConfig } from '../theme/estadisticas.theme';

// ─── Estado Badge ─────────────────────────────────────────────────────────────
export function EstadoBadge({ estado }: { estado: EstadoEmpresa }) {
  const { label, color } = estadoEmpresaConfig[estado];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 9999, fontSize: 11.5, fontWeight: 600, backgroundColor: color.bg, color: color.text, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color.main, flexShrink: 0 }} />
      {label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function EmpresaAvatar({ iniciales, color, size = 36 }: { iniciales: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, backgroundColor: color, color: '#fff', fontSize: size * 0.33, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, letterSpacing: '0.03em' }}>
      {iniciales}
    </div>
  );
}

// ─── Crecimiento Badge ────────────────────────────────────────────────────────
export function CrecimientoBadge({ valor }: { valor: number }) {
  const pos = valor >= 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 700, color: pos ? '#10B981' : '#EF4444' }}>
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={pos ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
      </svg>
      {Math.abs(valor).toFixed(1)}%
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
export function StarRating({ valor }: { valor: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <span style={{ fontSize: 13, fontWeight: 700, color: colors.text.primary }}>{valor.toFixed(1)}</span>
    </div>
  );
}

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
export function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, backgroundColor: color, borderRadius: '2px 2px 0 0', height: `${(v / max) * 100}%`, opacity: i === data.length - 1 ? 1 : 0.45, minHeight: 2 }} />
      ))}
    </div>
  );
}

// ─── Rank Badge ───────────────────────────────────────────────────────────────
export function RankBadge({ rank }: { rank: number }) {
  const cfg: Record<number, { bg: string; color: string; label: string }> = {
    1: { bg: '#FEF3C7', color: '#D97706', label: '#1' },
    2: { bg: '#F1F5F9', color: '#475569', label: '#2' },
    3: { bg: '#FEF3C7', color: '#B45309', label: '#3' },
  };
  const c = cfg[rank] || { bg: colors.bg.alt, color: colors.text.secondary, label: `#${rank}` };
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: c.color, flexShrink: 0 }}>
      {c.label}
    </div>
  );
}