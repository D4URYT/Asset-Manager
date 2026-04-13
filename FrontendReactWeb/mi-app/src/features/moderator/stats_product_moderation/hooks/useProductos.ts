"use client";

import { useState, useMemo, useCallback } from 'react';
import { Producto, FiltrosProductos, EstadisticasGlobales } from '../types/productos.types';
import { productosMock, estadisticasGlobalesMock } from '../data/productos.mock';

interface UseProductosReturn {
  productos: Producto[];
  productoSeleccionado: Producto | null;
  filtros: FiltrosProductos;
  globales: EstadisticasGlobales;
  modalAbierto: boolean;
  top3: Producto[];
  setFiltros: (f: Partial<FiltrosProductos>) => void;
  seleccionarProducto: (p: Producto) => void;
  cerrarModal: () => void;
}

const filtrosIniciales: FiltrosProductos = {
  busqueda: '', categoria: 'todos', estado: 'todos',
  ordenarPor: 'ventas', periodo: '30d',
};

export function useProductos(): UseProductosReturn {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [filtros, setFiltrosState] = useState<FiltrosProductos>(filtrosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);

  const productosFiltrados = useMemo(() => {
    const q = filtros.busqueda.toLowerCase();
    let list = productosMock.filter(p => {
      const mq = !q || p.nombre.toLowerCase().includes(q) || p.empresa.toLowerCase().includes(q);
      const mc = filtros.categoria === 'todos' || p.categoria === filtros.categoria;
      const me = filtros.estado === 'todos' || p.estado === filtros.estado;
      return mq && mc && me;
    });
    return [...list].sort((a, b) => {
      switch (filtros.ordenarPor) {
        case 'ventas':      return b.totalVentas - a.totalVentas;
        case 'ingresos':    return b.totalIngresos - a.totalIngresos;
        case 'calificacion':return b.calificacion - a.calificacion;
        case 'crecimiento': return b.crecimiento - a.crecimiento;
        case 'vistas':      return b.totalVistas - a.totalVistas;
        case 'devolucion':  return b.tasaDevolucion - a.tasaDevolucion;
        default: return 0;
      }
    });
  }, [filtros]);

  const top3 = useMemo(() =>
    [...productosMock].sort((a, b) => b.totalVentas - a.totalVentas).slice(0, 3), []);

  const setFiltros = useCallback((f: Partial<FiltrosProductos>) =>
    setFiltrosState(prev => ({ ...prev, ...f })), []);

  const seleccionarProducto = useCallback((p: Producto) => {
    setProductoSeleccionado(p);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  }, []);

  return {
    productos: productosFiltrados, productoSeleccionado, filtros,
    globales: estadisticasGlobalesMock, modalAbierto, top3,
    setFiltros, seleccionarProducto, cerrarModal,
  };
}