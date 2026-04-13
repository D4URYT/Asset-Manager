"use client";

import React from "react";
import { useModeration } from "../hooks/useModeration";
import { moderationTheme as t, globalStyles } from "../theme/moderation.theme";
import { Toast, ModalRechazar } from "../ui/ModerationUI";
import { ModerationHeaderSection } from "../sections/ModerationHeaderSection";
import { ModerationListaSection } from "../sections/ModerationListSection";
import { ModerationDetallePanel } from "../sections/ModerationDetailPanel";
import { Sidebar } from "../../../seller/dashboard/dashboards";
import { MODERATOR_NAV_ITEMS } from "../../moderationNav";

export default function ModerationPage() {
  const {
    search,
    filtroActivo,
    productoDetalle,
    modalRechazarVisible,
    productoARechazar,
    motivoRechazo,
    toastVisible,
    toastMsg,
    toastTipo,
    productosFiltrados,
    contadores,
    setSearch,
    setFiltroActivo,
    setMotivoRechazo,
    verDetalle,
    aprobar,
    abrirModalRechazar,
    cerrarModalRechazar,
    confirmarRechazo,
  } = useModeration();

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

      <Sidebar navItems={MODERATOR_NAV_ITEMS} />

      {/* Main — se encoge cuando el panel detalle está abierto */}
      <main
        style={{
          flex: 1,
          overflow: "auto",
          padding: "32px",
          marginRight: productoDetalle ? 420 : 0,
          transition: "margin-right 0.25s ease",
        }}
      >
        <ModerationHeaderSection />

        <ModerationListaSection
          productos={productosFiltrados}
          search={search}
          filtroActivo={filtroActivo}
          contadores={contadores}
          onSearchChange={setSearch}
          onFiltroChange={setFiltroActivo}
          onVerDetalle={verDetalle}
          onAprobar={aprobar}
          onRechazar={abrirModalRechazar}
        />
      </main>

      {/* Panel detalle lateral */}
      {productoDetalle && (
        <ModerationDetallePanel
          producto={productoDetalle}
          onCerrar={() => verDetalle(null)}
          onAprobar={(id) => {
            aprobar(id);
          }}
          onRechazar={abrirModalRechazar}
        />
      )}

      {/* Modal de rechazo */}
      {modalRechazarVisible && productoARechazar && (
        <ModalRechazar
          nombreProducto={productoARechazar.nombre}
          motivo={motivoRechazo}
          onMotivoChange={setMotivoRechazo}
          onConfirmar={confirmarRechazo}
          onCancelar={cerrarModalRechazar}
        />
      )}

      <Toast message={toastMsg} visible={toastVisible} tipo={toastTipo} />
    </div>
  );
}
