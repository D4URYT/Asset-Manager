"use client";


import React from 'react';
import { FiltrosReporte, EstadoReporte, CategoriaReporte, PrioridadReporte } from '../types/reportes.types';
import { colors, estadoConfig, categoriaConfig, prioridadConfig } from '../theme/reportes.theme';

interface ReportesFiltersProps {
  filtros: FiltrosReporte;
  onChange: (filtros: Partial<FiltrosReporte>) => void;
  totalResultados: number;
}

const inputStyle: React.CSSProperties = {
  height: 38,
  padding: '0 12px',
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  fontSize: 13,
  color: colors.text.primary,
  backgroundColor: colors.background.secondary,
  outline: 'none',
  fontFamily: 'inherit',
};

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke={colors.text.disabled}
    strokeWidth={2}
    style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
  >
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);

export function ReportesFilters({ filtros, onChange, totalResultados }: ReportesFiltersProps) {
  return (
    <div
      style={{
        backgroundColor: colors.background.secondary,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        boxShadow: `0 1px 4px ${colors.shadow}`,
      }}
    >
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar por código, título o usuario..."
            value={filtros.busqueda}
            onChange={(e) => onChange({ busqueda: e.target.value })}
            style={{ ...inputStyle, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }}
          />
        </div>

        {/* Estado */}
        <select
          value={filtros.estado}
          onChange={(e) => onChange({ estado: e.target.value as EstadoReporte | 'todos' })}
          style={{ ...inputStyle, paddingRight: 28, minWidth: 140, cursor: 'pointer' }}
        >
          <option value="todos">Todos los estados</option>
          {(Object.keys(estadoConfig) as EstadoReporte[]).map((key) => (
            <option key={key} value={key}>
              {estadoConfig[key].label}
            </option>
          ))}
        </select>

        {/* Categoría */}
        <select
          value={filtros.categoria}
          onChange={(e) => onChange({ categoria: e.target.value as CategoriaReporte | 'todos' })}
          style={{ ...inputStyle, paddingRight: 28, minWidth: 170, cursor: 'pointer' }}
        >
          <option value="todos">Todas las categorías</option>
          {(Object.keys(categoriaConfig) as CategoriaReporte[]).map((key) => (
            <option key={key} value={key}>
              {categoriaConfig[key].label}
            </option>
          ))}
        </select>

        {/* Prioridad */}
        <select
          value={filtros.prioridad}
          onChange={(e) => onChange({ prioridad: e.target.value as PrioridadReporte | 'todos' })}
          style={{ ...inputStyle, paddingRight: 28, minWidth: 140, cursor: 'pointer' }}
        >
          <option value="todos">Toda prioridad</option>
          {(Object.keys(prioridadConfig) as PrioridadReporte[]).map((key) => (
            <option key={key} value={key}>
              {prioridadConfig[key].label}
            </option>
          ))}
        </select>

        {/* Result count */}
        <span
          style={{
            fontSize: 12,
            color: colors.text.secondary,
            marginLeft: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {totalResultados} resultado{totalResultados !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}