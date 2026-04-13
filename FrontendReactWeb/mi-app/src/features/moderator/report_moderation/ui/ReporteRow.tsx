import React from 'react';
import { Reporte } from '../types/reportes.types';
import { colors, categoriaConfig } from '../theme/reportes.theme';
import { EstadoBadge, PrioridadBadge } from './StatusBadge';

interface ReporteRowProps {
  reporte: Reporte;
  onClick: (reporte: Reporte) => void;
}

function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(nombre: string): string {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ReporteRow({ reporte, onClick }: ReporteRowProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <tr
      onClick={() => onClick(reporte)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        backgroundColor: hovered ? colors.background.alt : colors.background.secondary,
        transition: 'background-color 0.15s ease',
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {/* Código */}
      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 600,
            color: colors.brand[600],
            backgroundColor: colors.brand[100],
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          {reporte.codigo}
        </span>
      </td>

      {/* Título & categoría */}
      <td style={{ padding: '14px 16px', minWidth: 220 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 500,
            color: colors.text.primary,
            lineHeight: 1.3,
          }}
        >
          {reporte.titulo}
        </p>
        <p
          style={{
            margin: '2px 0 0',
            fontSize: 12,
            color: colors.text.secondary,
          }}
        >
          {categoriaConfig[reporte.categoria].label}
        </p>
      </td>

      {/* Usuario */}
      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: colors.brand[600],
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {getInitials(reporte.usuario.nombre)}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: colors.text.primary }}>
              {reporte.usuario.nombre}
            </p>
            <p style={{ margin: 0, fontSize: 11, color: colors.text.secondary }}>
              {reporte.usuario.email}
            </p>
          </div>
        </div>
      </td>

      {/* Estado */}
      <td style={{ padding: '14px 16px' }}>
        <EstadoBadge estado={reporte.estado} />
      </td>

      {/* Prioridad */}
      <td style={{ padding: '14px 16px' }}>
        <PrioridadBadge prioridad={reporte.prioridad} />
      </td>

      {/* Fecha */}
      <td
        style={{
          padding: '14px 16px',
          fontSize: 13,
          color: colors.text.secondary,
          whiteSpace: 'nowrap',
        }}
      >
        {formatFecha(reporte.fechaCreacion)}
      </td>

      {/* Pedido */}
      <td
        style={{
          padding: '14px 16px',
          fontSize: 12,
          color: colors.brand[400],
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        {reporte.pedido?.numero ?? '—'}
      </td>
    </tr>
  );
}