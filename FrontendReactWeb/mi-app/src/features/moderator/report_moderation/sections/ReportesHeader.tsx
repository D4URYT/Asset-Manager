"use client";


import React from 'react';
import { EstadisticasReportes } from '../types/reportes.types';
import { colors } from '../theme/reportes.theme';

interface ReportesHeaderProps {
  estadisticas: EstadisticasReportes;
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  bg: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, color, bg, icon }: StatCardProps) {
  return (
    <div
      style={{
        backgroundColor: colors.background.secondary,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flex: 1,
        minWidth: 160,
        boxShadow: `0 1px 4px ${colors.shadow}`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: colors.text.primary,
            lineHeight: 1,
          }}
        >
          {value}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: colors.text.secondary }}>
          {label}
        </p>
      </div>
    </div>
  );
}

// Simple SVG icons
const IconTotal = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const IconPendiente = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M12 6v6l4 2" />
  </svg>
);
const IconProceso = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const IconSolucionado = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconRechazado = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function ReportesHeader({ estadisticas }: ReportesHeaderProps) {
  return (
    <div>
      {/* Title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              color: colors.text.primary,
            }}
          >
            Reportes de Problemas
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: colors.text.secondary }}>
            Gestiona y da seguimiento a los reportes enviados por los usuarios
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <StatCard
          label="Total Reportes"
          value={estadisticas.total}
          color={colors.brand[600]}
          bg={colors.brand[100]}
          icon={<IconTotal />}
        />
        <StatCard
          label="Pendientes"
          value={estadisticas.pendientes}
          color="#F59E0B"
          bg="#FEF3C7"
          icon={<IconPendiente />}
        />
        <StatCard
          label="En Proceso"
          value={estadisticas.enProceso}
          color={colors.brand[400]}
          bg={colors.brand[100]}
          icon={<IconProceso />}
        />
        <StatCard
          label="Solucionados"
          value={estadisticas.solucionados}
          color="#10B981"
          bg="#D1FAE5"
          icon={<IconSolucionado />}
        />
        <StatCard
          label="Rechazados"
          value={estadisticas.rechazados}
          color="#EF4444"
          bg="#FEE2E2"
          icon={<IconRechazado />}
        />
      </div>
    </div>
  );
}