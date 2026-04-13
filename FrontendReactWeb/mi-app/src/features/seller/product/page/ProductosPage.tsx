"use client";

import React from "react";
import { useProductos } from "../hooks/useProductos";
import { productosTheme as t, globalStyles } from "../theme/productos.theme";
import { PRODUCTOS_DATA } from "../data/productos.data";
import { Toast } from "../ui/ProductoCard";
import { ProductosHeaderSection } from "../sections/ProductosHeaderSection";
import { ProductosStatsSection } from "../sections/ProductosStatsSection";
import { ProductosTableSection } from "../sections/ProductosTableSection";

// Reutilizamos el Sidebar y los nav items del dashboard
import { Sidebar } from "../../dashboard/dashboards";
import { NAV_ITEMS } from "../../dashboard/data/chart.data";

export default function ProductosPage() {
  const {
    search,
    categoriaActiva,
    vistaMode,
    ordenCampo,
    ordenDir,
    toastVisible,
    toastMsg,
    productosFiltrados,
    setSearch,
    setCategoriaActiva,
    setVistaMode,
    toggleOrden,
    showToast,
  } = useProductos();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: t.bgMain,
        color: t.textPrimary,
      }}
    >
      <style>{globalStyles(t)}</style>

      {/* Sidebar compartido — pathname detecta automáticamente que estamos en /productos */}
      <Sidebar navItems={NAV_ITEMS} />

      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        <ProductosHeaderSection
          totalFiltrados={productosFiltrados.length}
          onAgregar={() => showToast("Nuevo producto agregado")}
          onExportar={() => showToast("Exportando productos...")}
        />
        <ProductosStatsSection />
        <ProductosTableSection
          productos={productosFiltrados}
          search={search}
          categoriaActiva={categoriaActiva}
          vistaMode={vistaMode}
          ordenCampo={ordenCampo}
          ordenDir={ordenDir}
          totalCount={PRODUCTOS_DATA.length}
          onSearchChange={setSearch}
          onCategoriaChange={setCategoriaActiva}
          onVistaModeChange={setVistaMode}
          onToggleOrden={toggleOrden}
          onAction={showToast}
        />
      </main>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
