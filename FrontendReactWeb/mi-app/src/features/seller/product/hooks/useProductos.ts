"use client";

import { useState, useCallback, useMemo } from "react";
import { PRODUCTOS_DATA } from "../data/productos.data";
import { Producto, VistaMode, OrdenCampo, OrdenDir } from "../types/productos.types";

interface UseProductosReturn {
  // State
  search: string;
  categoriaActiva: string;
  vistaMode: VistaMode;
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  toastVisible: boolean;
  toastMsg: string;
  productoSeleccionado: Producto | null;

  // Computed
  productosFiltrados: Producto[];

  // Actions
  setSearch: (v: string) => void;
  setCategoriaActiva: (v: string) => void;
  setVistaMode: (v: VistaMode) => void;
  toggleOrden: (campo: OrdenCampo) => void;
  showToast: (msg: string) => void;
  seleccionarProducto: (p: Producto | null) => void;
}

export function useProductos(): UseProductosReturn {
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [vistaMode, setVistaMode] = useState<VistaMode>("tabla");
  const [ordenCampo, setOrdenCampo] = useState<OrdenCampo>("nombre");
  const [ordenDir, setOrdenDir] = useState<OrdenDir>("asc");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const toggleOrden = useCallback((campo: OrdenCampo) => {
    if (ordenCampo === campo) {
      setOrdenDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setOrdenCampo(campo);
      setOrdenDir("asc");
    }
  }, [ordenCampo]);

  const productosFiltrados = useMemo(() => {
    let lista = [...PRODUCTOS_DATA];

    // Filtro por búsqueda
    if (search) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.proveedor.toLowerCase().includes(q)
      );
    }

    // Filtro por categoría
    if (categoriaActiva !== "Todas") {
      lista = lista.filter((p) => p.categoria === categoriaActiva);
    }

    // Ordenamiento
    lista.sort((a, b) => {
      let valA: string | number = a[ordenCampo];
      let valB: string | number = b[ordenCampo];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return ordenDir === "asc" ? -1 : 1;
      if (valA > valB) return ordenDir === "asc" ? 1 : -1;
      return 0;
    });

    return lista;
  }, [search, categoriaActiva, ordenCampo, ordenDir]);

  return {
    search,
    categoriaActiva,
    vistaMode,
    ordenCampo,
    ordenDir,
    toastVisible,
    toastMsg,
    productoSeleccionado,
    productosFiltrados,
    setSearch,
    setCategoriaActiva,
    setVistaMode,
    toggleOrden,
    showToast,
    seleccionarProducto: setProductoSeleccionado,
  };
}