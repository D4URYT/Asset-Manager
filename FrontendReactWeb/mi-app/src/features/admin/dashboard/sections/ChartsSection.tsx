'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import type { ChartDataPoint } from '../types/dashboard.types';
import { theme } from '../theme/dashboardTheme';

const CHART_H = 160;
const BAR_W = 10;
const BAR_GAP = 4;
const GROUP_GAP = 24;
const PAD_LEFT = 52;
const PAD_BOT = 28;

const series = [
  { key: 'sales', label: 'Ventas', color: theme.colors.chartSales },
  { key: 'collections', label: 'Cobros', color: theme.colors.chartCollections },
  { key: 'pending', label: 'Pendientes', color: theme.colors.chartPending },
] as const;

function fmtK(v: number) {
  return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;
}

export function ChartsSection({ data }: { data: ChartDataPoint[] }) {
  const [tooltip, setTooltip] = useState<{ label: string; key: string; value: number; x: number; y: number } | null>(null);

  if (!data || data.length === 0) {
    return (
      <section style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <TrendingUp size={16} color="var(--color-primary)" strokeWidth={2} />
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Rendimiento Financiero</h2>
        </div>
        <p style={{ fontSize: 12, color: 'var(--color-text-disabled)', margin: 0 }}>Sin datos para mostrar.</p>
      </section>
    );
  }

  const maxVal = Math.max(1, ...data.flatMap(d => [d.sales, d.collections, d.pending]));
  const groupW = series.length * BAR_W + (series.length - 1) * BAR_GAP;
  const totalW = PAD_LEFT + data.length * groupW + (data.length - 1) * GROUP_GAP + 16;
  const svgH = CHART_H + PAD_BOT + 8;
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <TrendingUp size={16} color="var(--color-primary)" strokeWidth={2} />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Rendimiento Financiero</h2>
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-text-disabled)', margin: 0 }}>Últimos 7 meses</p>
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', gap: 16 }}>
          {series.map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto', position: 'relative' }}>
        <svg width={totalW} height={svgH} style={{ display: 'block' }}>
          {/* Grid lines + Y labels */}
          {gridLines.map(ratio => {
            const y = 8 + CHART_H * (1 - ratio);
            return (
              <g key={ratio}>
                <line x1={PAD_LEFT} y1={y} x2={totalW - 8} y2={y} stroke="var(--color-border-light)" strokeWidth={1} />
                <text x={PAD_LEFT - 6} y={y + 4} textAnchor="end" fontSize={9} fill="var(--color-text-disabled)">
                  {fmtK(Math.round(maxVal * ratio))}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((point, gi) => {
            const gx = PAD_LEFT + gi * (groupW + GROUP_GAP);
            return (
              <g key={gi}>
                {series.map((s, si) => {
                  const val = point[s.key];
                  const bh = (val / maxVal) * CHART_H;
                  const bx = gx + si * (BAR_W + BAR_GAP);
                  const by = 8 + CHART_H - bh;
                  return (
                    <rect
                      key={s.key}
                      x={bx} y={by} width={BAR_W} height={bh}
                      rx={3} fill={s.color}
                      style={{ cursor: 'pointer', transition: 'opacity .15s' }}
                      onMouseEnter={e => {
                        setTooltip({ label: point.label, key: s.label, value: val, x: bx, y: by });
                        (e.target as SVGRectElement).style.opacity = '0.75';
                      }}
                      onMouseLeave={e => {
                        setTooltip(null);
                        (e.target as SVGRectElement).style.opacity = '1';
                      }}
                    />
                  );
                })}
                {/* X label */}
                <text x={gx + groupW / 2} y={8 + CHART_H + 18} textAnchor="middle" fontSize={10} fill="var(--color-text-disabled)" fontWeight={500}>
                  {point.label}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect x={tooltip.x - 4} y={tooltip.y - 36} width={82} height={32} rx={6}
                fill={theme.colors.primary} />
              <text x={tooltip.x + 37} y={tooltip.y - 20} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,.8)" fontWeight={500}>
                {tooltip.label} - {tooltip.key}
              </text>
              <text x={tooltip.x + 37} y={tooltip.y - 8} textAnchor="middle" fontSize={12} fill="white" fontWeight={700}>
                {fmtK(tooltip.value)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  );
}
