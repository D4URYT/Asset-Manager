"use client";

import React from 'react';
import { Empresa } from '../types/estadisticas.types';
import { colors, categoriaConfig } from '../theme/estadisticas.theme';
import { EmpresaAvatar, EstadoBadge, StarRating, CrecimientoBadge, MiniBarChart } from '../ui/EmpresaUI';

const cols = ['#', 'Empresa', 'Categoría', 'Ventas', 'Ingresos', 'Tendencia', 'Calif.', 'Clientes', 'Devol.', 'Estado'];

export function EmpresasTable({ empresas, onSelect }: { empresas: Empresa[]; onSelect: (e: Empresa) => void }) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr style={{ backgroundColor: colors.bg.alt, borderBottom: `2px solid ${colors.border}` }}>
              {cols.map(c => <th key={c} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: colors.text.secondary, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {empresas.length === 0 ? (
              <tr><td colSpan={10} style={{ padding: 48, textAlign: 'center', color: colors.text.disabled, fontSize: 14 }}>No se encontraron empresas</td></tr>
            ) : empresas.map((e, i) => (
              <EmpresaRow key={e.id} empresa={e} rank={i + 1} onClick={onSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmpresaRow({ empresa: e, rank, onClick }: { empresa: Empresa; rank: number; onClick: (e: Empresa) => void }) {
  const [hov, setHov] = React.useState(false);
  const miniData = e.ventasMensuales.slice(-6).map(v => v.ventas);
  const barColor = e.crecimiento >= 0 ? '#10B981' : '#EF4444';
  return (
    <tr onClick={() => onClick(e)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', backgroundColor: hov ? colors.bg.alt : colors.bg.secondary, transition: 'background .12s', borderBottom: `1px solid ${colors.border}` }}>
      <td style={{ padding: '12px 14px' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: rank <= 3 ? '#F59E0B' : colors.text.disabled, width: 22, display: 'inline-block', textAlign: 'center' }}>#{rank}</span>
      </td>
      <td style={{ padding: '12px 14px', minWidth: 190 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <EmpresaAvatar iniciales={e.iniciales} color={e.colorAvatar} size={34} />
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text.primary }}>{e.nombre}</p>
            <p style={{ margin: '1px 0 0', fontSize: 10.5, color: colors.text.secondary }}>{e.totalProductos} productos</p>
          </div>
        </div>
      </td>
      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 12, color: colors.text.secondary, backgroundColor: colors.bg.alt, padding: '2px 8px', borderRadius: 6, border: `1px solid ${colors.border}` }}>{categoriaConfig[e.categoria].label}</span>
      </td>
      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: colors.text.primary }}>{e.totalVentas.toLocaleString()}</p>
        <CrecimientoBadge valor={e.crecimiento} />
      </td>
      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#10B981' }}>RD$ {(e.totalIngresos / 1000000).toFixed(2)}M</p>
      </td>
      <td style={{ padding: '12px 14px', width: 80 }}>
        <MiniBarChart data={miniData} color={barColor} />
      </td>
      <td style={{ padding: '12px 14px' }}>
        <StarRating valor={e.calificacion} />
        <p style={{ margin: '1px 0 0', fontSize: 10.5, color: colors.text.disabled }}>{e.totalResenas.toLocaleString()} reseñas</p>
      </td>
      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text.primary }}>{e.clientesUnicos.toLocaleString()}</p>
      </td>
      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: e.tasaDevolucion > 5 ? '#EF4444' : e.tasaDevolucion > 3 ? '#F59E0B' : '#10B981' }}>
          {e.tasaDevolucion}%
        </span>
      </td>
      <td style={{ padding: '12px 14px' }}>
        <EstadoBadge estado={e.estado} />
      </td>
    </tr>
  );
}