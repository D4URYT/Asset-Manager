import React from 'react';
import { EstadoReporte, PrioridadReporte } from '../types/reportes.types';
import { estadoConfig, prioridadConfig } from '../theme/reportes.theme';

// ─── Estado Badge ─────────────────────────────────────────────────────────────
interface EstadoBadgeProps {
  estado: EstadoReporte;
  size?: 'sm' | 'md';
}

export function EstadoBadge({ estado, size = 'md' }: EstadoBadgeProps) {
  const config = estadoConfig[estado];
  const fontSize = size === 'sm' ? '11px' : '12px';
  const padding = size === 'sm' ? '2px 8px' : '4px 10px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding,
        borderRadius: 9999,
        fontSize,
        fontWeight: 600,
        backgroundColor: config.color.bg,
        color: config.color.text,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: config.color.main,
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}

// ─── Prioridad Badge ──────────────────────────────────────────────────────────
interface PrioridadBadgeProps {
  prioridad: PrioridadReporte;
}

export function PrioridadBadge({ prioridad }: PrioridadBadgeProps) {
  const config = prioridadConfig[prioridad];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: config.bg,
        color: config.color,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      {config.label}
    </span>
  );
}