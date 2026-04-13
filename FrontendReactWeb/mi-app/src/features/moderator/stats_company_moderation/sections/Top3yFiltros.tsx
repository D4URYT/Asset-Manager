"use client";

import React from 'react';
import { Empresa, FiltrosEmpresas, CategoriaEmpresa, EstadoEmpresa, OrdenPor, PeriodoFiltro } from '../types/estadisticas.types';
import { colors, categoriaConfig, ordenConfig, periodoConfig } from '../theme/estadisticas.theme';
import { EmpresaAvatar, StarRating, CrecimientoBadge, RankBadge } from '../ui/EmpresaUI';

// ─── Top 3 Podio ──────────────────────────────────────────────────────────────
export function Top3Podio({ empresas, onClick }: { empresas: Empresa[]; onClick: (e: Empresa) => void }) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 14, padding: '20px 22px', marginBottom: 14, boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: colors.text.primary }}>Top 3 — Empresas con más ventas</h2>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {empresas.map((e, i) => (
          <div key={e.id} onClick={() => onClick(e)} style={{ flex: 1, minWidth: 200, background: i === 0 ? `linear-gradient(135deg, ${colors.brand[100]} 0%, #EDE9FE 100%)` : colors.bg.alt, border: `2px solid ${i === 0 ? colors.brand[400] : colors.border}`, borderRadius: 12, padding: '16px 18px', cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
            onMouseEnter={ev => { (ev.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(30,58,138,.13)'; }}
            onMouseLeave={ev => { (ev.currentTarget as HTMLDivElement).style.transform = 'none'; (ev.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <RankBadge rank={i + 1} />
              <CrecimientoBadge valor={e.crecimiento} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <EmpresaAvatar iniciales={e.iniciales} color={e.colorAvatar} size={40} />
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text.primary }}>{e.nombre}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: colors.text.secondary }}>{categoriaConfig[e.categoria].label}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.brand[600] }}>{e.totalVentas.toLocaleString()}</p>
                <p style={{ margin: '1px 0 0', fontSize: 10.5, color: colors.text.secondary }}>Ventas totales</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#10B981' }}>RD$ {(e.totalIngresos / 1000000).toFixed(2)}M</p>
                <p style={{ margin: '1px 0 0', fontSize: 10.5, color: colors.text.secondary }}>Ingresos</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────
const base: React.CSSProperties = {
  height: 36, border: `1px solid ${colors.border}`, borderRadius: 8,
  fontSize: 12.5, color: colors.text.primary, background: colors.bg.secondary,
  fontFamily: 'inherit', outline: 'none', padding: '0 11px',
};

const SearchSVG = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
);

export function EmpresasFilters({ filtros, onChange, total }: {
  filtros: FiltrosEmpresas;
  onChange: (f: Partial<FiltrosEmpresas>) => void;
  total: number;
}) {
  return (
    <div style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '13px 15px', marginBottom: 14, display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center', boxShadow: `0 1px 4px ${colors.shadow}` }}>
      <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
        <SearchSVG />
        <input type="text" placeholder="Buscar empresa..." value={filtros.busqueda} onChange={e => onChange({ busqueda: e.target.value })} style={{ ...base, width: '100%', paddingLeft: 31, boxSizing: 'border-box' }} />
      </div>
      <select value={filtros.categoria} onChange={e => onChange({ categoria: e.target.value as CategoriaEmpresa | 'todos' })} style={{ ...base, minWidth: 145, cursor: 'pointer' }}>
        <option value="todos">Todas las categorías</option>
        {(Object.keys(categoriaConfig) as CategoriaEmpresa[]).map(k => <option key={k} value={k}>{categoriaConfig[k].label}</option>)}
      </select>
      <select value={filtros.estado} onChange={e => onChange({ estado: e.target.value as EstadoEmpresa | 'todos' })} style={{ ...base, minWidth: 130, cursor: 'pointer' }}>
        <option value="todos">Todos los estados</option>
        <option value="activa">Activa</option>
        <option value="inactiva">Inactiva</option>
        <option value="suspendida">Suspendida</option>
      </select>
      <select value={filtros.ordenarPor} onChange={e => onChange({ ordenarPor: e.target.value as OrdenPor })} style={{ ...base, minWidth: 138, cursor: 'pointer' }}>
        {(Object.keys(ordenConfig) as OrdenPor[]).map(k => <option key={k} value={k}>Ordenar: {ordenConfig[k]}</option>)}
      </select>
      <select value={filtros.periodo} onChange={e => onChange({ periodo: e.target.value as PeriodoFiltro })} style={{ ...base, minWidth: 148, cursor: 'pointer' }}>
        {(Object.keys(periodoConfig) as PeriodoFiltro[]).map(k => <option key={k} value={k}>{periodoConfig[k]}</option>)}
      </select>
      <span style={{ fontSize: 11.5, color: colors.text.secondary, marginLeft: 'auto', whiteSpace: 'nowrap' }}>{total} empresa{total !== 1 ? 's' : ''}</span>
    </div>
  );
}