"use client";

import { useState, useCallback, useMemo } from "react";
import { PRODUCTOS_PENDIENTES } from "../data/moderation.data";
import {
  ProductoPendiente,
  ProductoStatus,
  FiltroStatus,
  AccionModeration,
} from "../types/moderation.types";

interface UseModerationReturn {
  // State
  productos: ProductoPendiente[];
  search: string;
  filtroActivo: FiltroStatus;
  productoDetalle: ProductoPendiente | null;
  modalRechazarVisible: boolean;
  productoARechazar: ProductoPendiente | null;
  motivoRechazo: string;
  toastVisible: boolean;
  toastMsg: string;
  toastTipo: "success" | "error";

  // Computed
  productosFiltrados: ProductoPendiente[];
  contadores: Record<ProductoStatus | "todos", number>;

  // Actions
  setSearch: (v: string) => void;
  setFiltroActivo: (v: FiltroStatus) => void;
  setMotivoRechazo: (v: string) => void;
  verDetalle: (p: ProductoPendiente | null) => void;
  aprobar: (id: string) => void;
  abrirModalRechazar: (p: ProductoPendiente) => void;
  cerrarModalRechazar: () => void;
  confirmarRechazo: () => void;
}

export function useModeration(): UseModerationReturn {
  const [productos, setProductos] = useState<ProductoPendiente[]>(PRODUCTOS_PENDIENTES);
  const [search, setSearch] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<FiltroStatus>("todos");
  const [productoDetalle, setProductoDetalle] = useState<ProductoPendiente | null>(null);
  const [modalRechazarVisible, setModalRechazarVisible] = useState(false);
  const [productoARechazar, setProductoARechazar] = useState<ProductoPendiente | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastTipo, setToastTipo] = useState<"success" | "error">("success");

  const showToast = useCallback((msg: string, tipo: "success" | "error" = "success") => {
    setToastMsg(msg);
    setToastTipo(tipo);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }, []);

  const cambiarStatus = useCallback((accion: AccionModeration) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === accion.productoId
          ? { ...p, status: accion.status, motivoRechazo: accion.motivo }
          : p
      )
    );
  }, []);

  const aprobar = useCallback((id: string) => {
    cambiarStatus({ productoId: id, status: "approved" });
    // Si el detalle está abierto, actualizarlo
    setProductoDetalle((prev) =>
      prev?.id === id ? { ...prev, status: "approved" } : prev
    );
    showToast("Producto aprobado y publicado correctamente", "success");
  }, [cambiarStatus, showToast]);

  const abrirModalRechazar = useCallback((p: ProductoPendiente) => {
    setProductoARechazar(p);
    setMotivoRechazo("");
    setModalRechazarVisible(true);
  }, []);

  const cerrarModalRechazar = useCallback(() => {
    setModalRechazarVisible(false);
    setProductoARechazar(null);
    setMotivoRechazo("");
  }, []);

  const confirmarRechazo = useCallback(() => {
    if (!productoARechazar) return;
    cambiarStatus({
      productoId: productoARechazar.id,
      status: "rejected",
      motivo: motivoRechazo || "Sin motivo especificado",
    });
    setProductoDetalle((prev) =>
      prev?.id === productoARechazar.id
        ? { ...prev, status: "rejected", motivoRechazo: motivoRechazo || "Sin motivo especificado" }
        : prev
    );
    cerrarModalRechazar();
    showToast("Producto rechazado. El vendedor será notificado.", "error");
  }, [productoARechazar, motivoRechazo, cambiarStatus, cerrarModalRechazar, showToast]);

  const contadores = useMemo(() => ({
    todos:    productos.length,
    pending:  productos.filter((p) => p.status === "pending").length,
    approved: productos.filter((p) => p.status === "approved").length,
    rejected: productos.filter((p) => p.status === "rejected").length,
  }), [productos]);

  const productosFiltrados = useMemo(() => {
    let lista = [...productos];
    if (filtroActivo !== "todos") {
      lista = lista.filter((p) => p.status === filtroActivo);
    }
    if (search) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.vendedor.toLowerCase().includes(q)
      );
    }
    // Pendientes primero
    lista.sort((a, b) => {
      const orden: Record<ProductoStatus, number> = { pending: 0, approved: 1, rejected: 2 };
      return orden[a.status] - orden[b.status];
    });
    return lista;
  }, [productos, filtroActivo, search]);

  return {
    productos,
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
    verDetalle: setProductoDetalle,
    aprobar,
    abrirModalRechazar,
    cerrarModalRechazar,
    confirmarRechazo,
  };
}