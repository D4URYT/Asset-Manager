"use client";

import { useState, useMemo, useCallback } from 'react';
import { Empresa, FiltrosEmpresas, EstadisticasGlobales } from '../types/estadisticas.types';
import { empresasMock, estadisticasGlobalesMock } from '../data/estadisticas.mock';

interface UseEstadisticasReturn {
  empresas: Empresa[];
  empresaSeleccionada: Empresa | null;
  filtros: FiltrosEmpresas;
  globales: EstadisticasGlobales;
  modalAbierto: boolean;
  setFiltros: (f: Partial<FiltrosEmpresas>) => void;
  seleccionarEmpresa: (e: Empresa) => void;
  cerrarModal: () => void;
  top3: Empresa[];
}

const filtrosIniciales: FiltrosEmpresas = {
  busqueda: '', categoria: 'todos', estado: 'todos',
  ordenarPor: 'ventas', periodo: '30d',
};

export function useEstadisticas(): UseEstadisticasReturn {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);
  const [filtros, setFiltrosState] = useState<FiltrosEmpresas>(filtrosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);

  const empresasFiltradas = useMemo(() => {
    const q = filtros.busqueda.toLowerCase();
    let list = empresasMock.filter(e => {
      const mq = !q || e.nombre.toLowerCase().includes(q);
      const mc = filtros.categoria === 'todos' || e.categoria === filtros.categoria;
      const me = filtros.estado === 'todos' || e.estado === filtros.estado;
      return mq && mc && me;
    });
    list = [...list].sort((a, b) => {
      switch (filtros.ordenarPor) {
        case 'ventas':       return b.totalVentas - a.totalVentas;
        case 'ingresos':     return b.totalIngresos - a.totalIngresos;
        case 'calificacion': return b.calificacion - a.calificacion;
        case 'crecimiento':  return b.crecimiento - a.crecimiento;
        case 'clientes':     return b.clientesUnicos - a.clientesUnicos;
        default: return 0;
      }
    });
    return list;
  }, [filtros]);

  const top3 = useMemo(() =>
    [...empresasMock].sort((a, b) => b.totalVentas - a.totalVentas).slice(0, 3),
    []
  );

  const setFiltros = useCallback((f: Partial<FiltrosEmpresas>) =>
    setFiltrosState(prev => ({ ...prev, ...f })), []);

  const seleccionarEmpresa = useCallback((e: Empresa) => {
    setEmpresaSeleccionada(e);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setEmpresaSeleccionada(null);
  }, []);

  return {
    empresas: empresasFiltradas, empresaSeleccionada, filtros,
    globales: estadisticasGlobalesMock, modalAbierto,
    setFiltros, seleccionarEmpresa, cerrarModal, top3,
  };
}