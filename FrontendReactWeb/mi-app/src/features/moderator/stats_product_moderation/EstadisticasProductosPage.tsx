"use client";

import React from 'react';
import { Sidebar } from '../../seller/dashboard/dashboards';
import { dashboardTheme as t, globalStyles } from '../../seller/dashboard/theme/dashboard.theme';
import { MODERATOR_NAV_ITEMS } from '../moderationNav';
import { colors } from './theme/productos.theme';
import { useProductos } from './hooks/useProductos';
import { ProductosHeader } from './sections/ProductosHeader';
import { Top3Podio, ProductosFilters } from './sections/Top3yFiltros';
import { ProductosTable } from './sections/ProductosTable';
import { ProductoDetailModal } from './sections/ProductoDetailModal';

export function EstadisticasProductosPage() {
  const {
    productos, productoSeleccionado, filtros, globales,
    modalAbierto, top3,
    setFiltros, seleccionarProducto, cerrarModal,
  } = useProductos();

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: colors.bg.primary,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <style>{globalStyles(t)}</style>

      <Sidebar navItems={MODERATOR_NAV_ITEMS} />

      <main style={{ flex: 1, overflow: 'auto', padding: '32px 28px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ProductosHeader globales={globales} />
          <Top3Podio productos={top3} onClick={seleccionarProducto} />
          <ProductosFilters filtros={filtros} onChange={setFiltros} total={productos.length} />
          <ProductosTable productos={productos} onSelect={seleccionarProducto} />
        </div>
      </main>

      <ProductoDetailModal producto={productoSeleccionado} isOpen={modalAbierto} onClose={cerrarModal} />
    </div>
  );
}
