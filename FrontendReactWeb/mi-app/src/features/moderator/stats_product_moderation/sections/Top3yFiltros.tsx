"use client";

import React from 'react';
import { Producto, FiltrosProductos, CategoriaProducto, EstadoProducto, OrdenPor, PeriodoFiltro } from '../types/productos.types';
import { colors, categoriaConfig, ordenConfig, periodoConfig } from '../theme/productos.theme';
import { RankMedal, CrecimientoBadge, StarRating, CategoriaBadge } from '../ui/ProductoUI';

export function Top3Podio({ productos, onClick }: { productos: Producto[]; onClick: (p: Producto) => void }) {
  const gradients = [
    { bg: 'linear-gradient(135deg,#DBEAFE 0%,#EDE9FE 100%)', border: '#3B82F6' },
    { bg: '#F1F5F9', border: '#E2E8F0' },
    { bg: '#F1F5F9', border: '#E2E8F0' },
  ];
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '18px 20px', marginBottom: 13, boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        <h2 style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: colors.text.primary }}>Top 3 — Productos más vendidos</h2>
      </div>
      <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
        {productos.map((p, i) => (
          <div key={p.id} onClick={() => onClick(p)}
            style={{ flex: 1, minWidth: 195, background: gradients[i].bg, border: `2px solid ${gradients[i].border}`, borderRadius: 12, padding: '15px 17px', cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(30,58,138,.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <RankMedal rank={i + 1} />
              <CrecimientoBadge valor={p.crecimiento} />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 13.5, fontWeight: 700, color: colors.text.primary, lineHeight: 1.3 }}>{p.nombre}</p>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: colors.text.secondary }}>{p.empresa}</p>
            <div style={{ display: 'flex', gap: 14 }}>
              <div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: colors.brand[600] }}>{p.totalVentas.toLocaleString()}</p>
                <p style={{ margin: '1px 0 0', fontSize: 10, color: colors.text.secondary }}>unidades</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#10B981' }}>RD$ {(p.precio).toLocaleString()}</p>
                <p style={{ margin: '1px 0 0', fontSize: 10, color: colors.text.secondary }}>precio unit.</p>
              </div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <StarRating valor={p.calificacion} small />
              <span style={{ fontSize: 10.5, color: colors.text.disabled }}>{p.totalResenas.toLocaleString()} reseñas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const base: React.CSSProperties = {
  height: 36, border: `1px solid ${colors.border}`, borderRadius: 8,
  fontSize: 12.5, color: colors.text.primary, background: colors.bg.secondary,
  fontFamily: 'inherit', outline: 'none', padding: '0 11px',
};

const SearchIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2}
    style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

export function ProductosFilters({ filtros, onChange, total }: {
  filtros: FiltrosProductos;
  onChange: (f: Partial<FiltrosProductos>) => void;
  total: number;
}) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '13px 15px', marginBottom: 13, display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center', boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
        <SearchIcon />
        <input type="text" placeholder="Buscar producto o empresa..." value={filtros.busqueda}
          onChange={e => onChange({ busqueda: e.target.value })}
          style={{ ...base, width: '100%', paddingLeft: 31, boxSizing: 'border-box' }} />
      </div>
      <select value={filtros.categoria} onChange={e => onChange({ categoria: e.target.value as CategoriaProducto | 'todos' })} style={{ ...base, minWidth: 148, cursor: 'pointer' }}>
        <option value="todos">Todas las categorías</option>
        {(Object.keys(categoriaConfig) as CategoriaProducto[]).map(k => <option key={k} value={k}>{categoriaConfig[k].label}</option>)}
      </select>
      <select value={filtros.estado} onChange={e => onChange({ estado: e.target.value as EstadoProducto | 'todos' })} style={{ ...base, minWidth: 130, cursor: 'pointer' }}>
        <option value="todos">Todos los estados</option>
        <option value="activo">Activo</option>
        <option value="agotado">Agotado</option>
        <option value="suspendido">Suspendido</option>
        <option value="borrador">Borrador</option>
      </select>
      <select value={filtros.ordenarPor} onChange={e => onChange({ ordenarPor: e.target.value as OrdenPor })} style={{ ...base, minWidth: 148, cursor: 'pointer' }}>
        {(Object.keys(ordenConfig) as OrdenPor[]).map(k => <option key={k} value={k}>Ordenar: {ordenConfig[k]}</option>)}
      </select>
      <select value={filtros.periodo} onChange={e => onChange({ periodo: e.target.value as PeriodoFiltro })} style={{ ...base, minWidth: 148, cursor: 'pointer' }}>
        {(Object.keys(periodoConfig) as PeriodoFiltro[]).map(k => <option key={k} value={k}>{periodoConfig[k]}</option>)}
      </select>
      <span style={{ fontSize: 11.5, color: colors.text.secondary, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
        {total} producto{total !== 1 ? 's' : ''}
      </span>
    </div>
  );
}