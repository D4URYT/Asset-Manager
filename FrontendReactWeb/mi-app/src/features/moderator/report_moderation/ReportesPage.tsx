"use client";
 

import React from 'react';
import { colors } from './theme/reportes.theme';
import { Sidebar } from '../../seller/dashboard/dashboards';
import { dashboardTheme as t, globalStyles } from '../../seller/dashboard/theme/dashboard.theme';
import { MODERATOR_NAV_ITEMS } from '../moderationNav';
import { useReportes } from './hooks/useReportes';
import { ReportesHeader } from './sections/ReportesHeader';
import { ReportesFilters } from './sections/ReportesFilters';
import { ReportesTable } from './sections/ReportesTable';
import { ReporteDetailModal } from './sections/ReporteDetailModal';

export function ReportesPage() {
  const {
    reportes,
    reporteSeleccionado,
    filtros,
    estadisticas,
    isLoading,
    modalAbierto,
    setFiltros,
    seleccionarReporte,
    cerrarModal,
    cambiarEstado,
    guardarNota,
  } = useReportes();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily:
          "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: colors.background.primary,
      }}
    >
      <style>{globalStyles(t)}</style>

      <Sidebar navItems={MODERATOR_NAV_ITEMS} />

      <main style={{ flex: 1, overflow: 'auto', padding: '32px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ReportesHeader estadisticas={estadisticas} />
          <ReportesFilters
            filtros={filtros}
            onChange={setFiltros}
            totalResultados={reportes.length}
          />
          <ReportesTable
            reportes={reportes}
            isLoading={isLoading}
            onSelectReporte={seleccionarReporte}
          />
        </div>
      </main>

      <ReporteDetailModal
        reporte={reporteSeleccionado}
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onCambiarEstado={cambiarEstado}
        onGuardarNota={guardarNota}
      />
    </div>
  );
}
