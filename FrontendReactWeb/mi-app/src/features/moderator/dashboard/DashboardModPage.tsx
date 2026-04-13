"use client";

import React from 'react';
import { Sidebar } from '../../seller/dashboard/dashboards';
import { dashboardTheme as t, globalStyles } from '../../seller/dashboard/theme/dashboard.theme';
import { MODERATOR_NAV_ITEMS } from '../moderationNav';
import { colors } from './theme/dashboard.theme';
import { useDashboard } from './hooks/useDashboard';
import { DashboardTopBar } from './sections/DashboardTopBar';
import { KPIGrid } from './sections/KPIGrid';
import { VentasChart } from './sections/VentasChart';
import { DonutCategorias } from './sections/DonutCategorias';
import { TopEmpresasCard } from './sections/TopEmpresasCard';
import { TopProductosCard } from './sections/TopProductosCard';
import { ReportesCard } from './sections/ReportesCard';
import { ActividadCard } from './sections/ActividadCard';
import { EstadoReportesCard } from './sections/EstadoReportesCard';
import { SaludPlataformaCard } from './sections/SaludPlataformaCard';

export function DashboardModPage() {
  const { data, isLoading, periodo, setPeriodo, ahora } = useDashboard();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: colors.bg.primary }}>
        <p style={{ color: colors.text.secondary, fontSize: 14 }}>Cargando panel...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg.primary, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{globalStyles(t)}</style>
      <Sidebar navItems={MODERATOR_NAV_ITEMS} />
      <main style={{ flex: 1, padding: '24px 22px', overflow: 'auto' }}>
        <DashboardTopBar ahora={ahora} periodo={periodo} onPeriodo={setPeriodo} />
        <KPIGrid kpis={data.kpis} />

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 14 }}>
          <VentasChart data={data.ventasSemana} />
          <DonutCategorias data={data.ventasPorCategoria} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <TopEmpresasCard empresas={data.empresasTop} />
          <TopProductosCard productos={data.productosTop} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <ReportesCard reportes={data.reportesRecientes} />
          <ActividadCard actividad={data.actividadReciente} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <EstadoReportesCard reportes={data.reportesRecientes} />
          <SaludPlataformaCard />
        </div>
      </main>
    </div>
  );
}
