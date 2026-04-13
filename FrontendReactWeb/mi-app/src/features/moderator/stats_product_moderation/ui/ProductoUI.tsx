import React from 'react';
import { EstadoProducto, CategoriaProducto } from '../types/productos.types';
import { colors, estadoProductoConfig, categoriaConfig } from '../theme/productos.theme';

export function EstadoBadge({ estado }: { estado: EstadoProducto }) {
  const { label, color } = estadoProductoConfig[estado];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 9999, fontSize: 11.5, fontWeight: 600, backgroundColor: color.bg, color: color.text, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color.main, flexShrink: 0 }} />
      {label}
    </span>
  );
}

export function CategoriaBadge({ cat }: { cat: CategoriaProducto }) {
  const { label, color } = categoriaConfig[cat];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 500, color, backgroundColor: color + '18', padding: '2px 9px', borderRadius: 9999, whiteSpace: 'nowrap', border: `1px solid ${color}33` }}>
      {label}
    </span>
  );
}

export function CrecimientoBadge({ valor }: { valor: number }) {
  const pos = valor >= 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11.5, fontWeight: 700, color: pos ? '#10B981' : '#EF4444' }}>
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={pos ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
      </svg>
      {Math.abs(valor).toFixed(1)}%
    </span>
  );
}

export function StarRating({ valor, small }: { valor: number; small?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <svg width={small ? 12 : 14} height={small ? 12 : 14} viewBox="0 0 24 24" fill="#F59E0B">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span style={{ fontSize: small ? 12 : 13, fontWeight: 700, color: colors.text.primary }}>{valor.toFixed(1)}</span>
    </div>
  );
}

export function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24, w = 60;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={parseFloat(pts.split(' ').at(-1)!.split(',')[0])} cy={parseFloat(pts.split(' ').at(-1)!.split(',')[1])} r={2.5} fill={color} />
    </svg>
  );
}

export function RankMedal({ rank }: { rank: number }) {
  const cfg: Record<number, { bg: string; color: string }> = {
    1: { bg: '#FEF3C7', color: '#D97706' },
    2: { bg: '#F1F5F9', color: '#64748B' },
    3: { bg: '#FEF3C7', color: '#B45309' },
  };
  const c = cfg[rank] || { bg: colors.bg.alt, color: colors.text.disabled };
  return (
    <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 800, color: c.color, flexShrink: 0 }}>
      #{rank}
    </div>
  );
}

export function StockIndicator({ stock }: { stock: number }) {
  const color = stock === 0 ? '#EF4444' : stock < 50 ? '#F59E0B' : '#10B981';
  return (
    <span style={{ fontSize: 12.5, fontWeight: 600, color }}>
      {stock === 0 ? 'Sin stock' : stock.toLocaleString()}
    </span>
  );
}