"use client";

import React from 'react';
import { Producto } from '../types/productos.types';
import { colors } from '../theme/productos.theme';
import { EstadoBadge, CategoriaBadge, StarRating, CrecimientoBadge, MiniSparkline, StockIndicator } from '../ui/ProductoUI';

const cols = ['#', 'Producto', 'Empresa', 'Ventas', 'Ingresos', 'Tendencia', 'Precio', 'Stock', 'Calif.', 'Conversión', 'Devol.', 'Estado'];

export function ProductosTable({ productos, onSelect }: { productos: Producto[]; onSelect: (p: Producto) => void }) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1060 }}>
          <thead>
            <tr style={{ backgroundColor: colors.bg.alt, borderBottom: `2px solid ${colors.border}` }}>
              {cols.map(c => (
                <th key={c} style={{ padding: '10px 13px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: colors.text.secondary, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr><td colSpan={12} style={{ padding: 48, textAlign: 'center', color: colors.text.disabled, fontSize: 14 }}>No se encontraron productos</td></tr>
            ) : productos.map((p, i) => <ProductoRow key={p.id} producto={p} rank={i + 1} onClick={onSelect} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductoRow({ producto: p, rank, onClick }: { producto: Producto; rank: number; onClick: (p: Producto) => void }) {
  const [hov, setHov] = React.useState(false);
  const sparkData = p.ventasMensuales.slice(-6).map(v => v.ventas);
  const sparkColor = p.crecimiento >= 0 ? '#10B981' : '#EF4444';
  const convColor  = p.tasaConversion >= 6 ? '#10B981' : p.tasaConversion >= 4 ? '#F59E0B' : '#EF4444';
  const devolColor = p.tasaDevolucion > 8 ? '#EF4444' : p.tasaDevolucion > 4 ? '#F59E0B' : '#10B981';

  return (
    <tr onClick={() => onClick(p)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', backgroundColor: hov ? colors.bg.alt : colors.bg.secondary, transition: 'background .12s', borderBottom: `1px solid ${colors.border}` }}>

      {/* Rank */}
      <td style={{ padding: '12px 13px' }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: rank <= 3 ? '#F59E0B' : colors.text.disabled, display: 'inline-block', width: 22, textAlign: 'center' }}>#{rank}</span>
      </td>

      {/* Nombre */}
      <td style={{ padding: '12px 13px', minWidth: 200 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text.primary, lineHeight: 1.3 }}>{p.nombre}</p>
        <div style={{ marginTop: 3 }}><CategoriaBadge cat={p.categoria} /></div>
      </td>

      {/* Empresa */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: p.empresaColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {p.empresa.slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontSize: 12, color: colors.text.secondary, fontWeight: 500 }}>{p.empresa}</span>
        </div>
      </td>

      {/* Ventas */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: colors.text.primary }}>{p.totalVentas.toLocaleString()}</p>
        <CrecimientoBadge valor={p.crecimiento} />
      </td>

      {/* Ingresos */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#10B981' }}>
          RD$ {p.totalIngresos >= 1000000 ? `${(p.totalIngresos / 1000000).toFixed(1)}M` : `${(p.totalIngresos / 1000).toFixed(0)}k`}
        </p>
      </td>

      {/* Sparkline */}
      <td style={{ padding: '12px 13px' }}>
        <MiniSparkline data={sparkData} color={sparkColor} />
      </td>

      {/* Precio */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: colors.text.primary }}>RD$ {p.precio.toLocaleString()}</span>
      </td>

      {/* Stock */}
      <td style={{ padding: '12px 13px' }}>
        <StockIndicator stock={p.stock} />
      </td>

      {/* Calificación */}
      <td style={{ padding: '12px 13px' }}>
        <StarRating valor={p.calificacion} small />
        <p style={{ margin: '1px 0 0', fontSize: 10, color: colors.text.disabled }}>{p.totalResenas.toLocaleString()} reseñas</p>
      </td>

      {/* Conversión */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: convColor }}>{p.tasaConversion}%</span>
      </td>

      {/* Devolución */}
      <td style={{ padding: '12px 13px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: devolColor }}>{p.tasaDevolucion}%</span>
      </td>

      {/* Estado */}
      <td style={{ padding: '12px 13px' }}>
        <EstadoBadge estado={p.estado} />
      </td>
    </tr>
  );
}