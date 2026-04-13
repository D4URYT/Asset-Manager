"use client";

import React from 'react';
import { Reporte } from '../types/reportes.types';
import { colors } from '../theme/reportes.theme';
import { ReporteRow } from '../ui/ReporteRow';

interface ReportesTableProps {
  reportes: Reporte[];
  isLoading: boolean;
  onSelectReporte: (reporte: Reporte) => void;
}

const headers = [
  { label: 'Código', width: 130 },
  { label: 'Título / Categoría', width: 'auto' },
  { label: 'Usuario', width: 200 },
  { label: 'Estado', width: 130 },
  { label: 'Prioridad', width: 100 },
  { label: 'Fecha', width: 120 },
  { label: 'Pedido', width: 130 },
];

const EmptyIcon = () => (
  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke={colors.text.disabled} strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

export function ReportesTable({ reportes, isLoading, onSelectReporte }: ReportesTableProps) {
  return (
    <div
      style={{
        backgroundColor: colors.background.secondary,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: `0 1px 4px ${colors.shadow}`,
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr
              style={{
                backgroundColor: colors.background.alt,
                borderBottom: `2px solid ${colors.border}`,
              }}
            >
              {headers.map((h) => (
                <th
                  key={h.label}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 700,
                    color: colors.text.secondary,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    width: typeof h.width === 'number' ? h.width : undefined,
                  }}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} style={{ padding: 48, textAlign: 'center', color: colors.text.disabled }}>
                  Cargando reportes...
                </td>
              </tr>
            ) : reportes.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 56, textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <EmptyIcon />
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: colors.text.secondary }}>
                      No se encontraron reportes
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: colors.text.disabled }}>
                      Ajusta los filtros para ver más resultados
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              reportes.map((reporte) => (
                <ReporteRow key={reporte.id} reporte={reporte} onClick={onSelectReporte} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}