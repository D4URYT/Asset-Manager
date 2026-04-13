import React from 'react';
import { DistribucionCategoria } from '../types/dashboard.types';
import { colors } from '../theme/dashboard.theme';

export function DonutCategorias({ data }: { data: DistribucionCategoria[] }) {
  const size = 140;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div style={s.card}>
      <div style={s.title}>Ventas por Categoria</div>
      <div style={s.subtitle}>Distribucion porcentual</div>
      <div style={s.wrap}>
        <div style={s.donutWrap}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={s.donutSvg}>
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              {data.map((seg) => {
                const dash = (seg.porcentaje / 100) * circumference;
                const circle = (
                  <circle
                    key={seg.categoria}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                  />
                );
                offset += dash;
                return circle;
              })}
            </g>
          </svg>
          <div style={s.center}>
            <div style={s.centerValue}>100%</div>
            <div style={s.centerLabel}>total</div>
          </div>
        </div>
        <div style={s.legend}>
          {data.map((seg) => (
            <div key={seg.categoria} style={s.legendItem}>
              <span style={{ ...s.legendDot, background: seg.color }} />
              <span style={s.legendText}>{seg.categoria}</span>
              <span style={s.legendValue}>{seg.porcentaje}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  card: { background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 16, boxShadow: `0 1px 4px ${colors.shadow}` },
  title: { fontSize: 14, fontWeight: 700, color: colors.text.primary },
  subtitle: { fontSize: 12, color: colors.text.secondary, marginTop: 2 },
  wrap: { display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'center', marginTop: 12 },
  donutWrap: { position: 'relative', width: 140, height: 140 },
  donutSvg: { display: 'block' },
  center: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const },
  centerValue: { fontSize: 18, fontWeight: 700, color: colors.text.primary },
  centerLabel: { fontSize: 11, color: colors.text.secondary, marginTop: 2 },
  legend: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 3 },
  legendText: { fontSize: 12, color: colors.text.secondary, flex: 1 },
  legendValue: { fontSize: 12, fontWeight: 700, color: colors.text.primary },
} as const;
