"use client";

import { useState, useMemo, useCallback } from 'react';
import {
  Reporte,
  EstadoReporte,
  FiltrosReporte,
  EstadisticasReportes,
  HistorialCambio,
} from '../types/reportes.types';
import { reportesMock } from '../data/reportes.mock';

interface UseReportesReturn {
  reportes: Reporte[];
  reporteSeleccionado: Reporte | null;
  filtros: FiltrosReporte;
  estadisticas: EstadisticasReportes;
  isLoading: boolean;
  modalAbierto: boolean;
  setFiltros: (filtros: Partial<FiltrosReporte>) => void;
  seleccionarReporte: (reporte: Reporte) => void;
  cerrarModal: () => void;
  cambiarEstado: (reporteId: string, nuevoEstado: EstadoReporte, nota: string) => void;
  guardarNota: (reporteId: string, nota: string) => void;
}

const filtrosIniciales: FiltrosReporte = {
  busqueda: '',
  estado: 'todos',
  categoria: 'todos',
  prioridad: 'todos',
};

export function useReportes(): UseReportesReturn {
  const [reportes, setReportes] = useState<Reporte[]>(reportesMock);
  const [reporteSeleccionado, setReporteSeleccionado] = useState<Reporte | null>(null);
  const [filtros, setFiltrosState] = useState<FiltrosReporte>(filtrosIniciales);
  const [isLoading] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const estadisticas = useMemo<EstadisticasReportes>(() => {
    return {
      total: reportes.length,
      pendientes: reportes.filter((r) => r.estado === 'pendiente').length,
      enProceso: reportes.filter((r) => r.estado === 'en_proceso').length,
      solucionados: reportes.filter((r) => r.estado === 'solucionado').length,
      rechazados: reportes.filter((r) => r.estado === 'rechazado').length,
    };
  }, [reportes]);

  const reportesFiltrados = useMemo(() => {
    return reportes.filter((reporte) => {
      const matchBusqueda =
        !filtros.busqueda ||
        reporte.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        reporte.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        reporte.usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());

      const matchEstado =
        filtros.estado === 'todos' || reporte.estado === filtros.estado;

      const matchCategoria =
        filtros.categoria === 'todos' || reporte.categoria === filtros.categoria;

      const matchPrioridad =
        filtros.prioridad === 'todos' || reporte.prioridad === filtros.prioridad;

      return matchBusqueda && matchEstado && matchCategoria && matchPrioridad;
    });
  }, [reportes, filtros]);

  const setFiltros = useCallback((nuevosFiltros: Partial<FiltrosReporte>) => {
    setFiltrosState((prev) => ({ ...prev, ...nuevosFiltros }));
  }, []);

  const seleccionarReporte = useCallback((reporte: Reporte) => {
    setReporteSeleccionado(reporte);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setReporteSeleccionado(null);
  }, []);

  const cambiarEstado = useCallback(
    (reporteId: string, nuevoEstado: EstadoReporte, nota: string) => {
      setReportes((prev) =>
        prev.map((r) => {
          if (r.id !== reporteId) return r;
          const cambio: HistorialCambio = {
            id: `h${Date.now()}`,
            fecha: new Date().toISOString(),
            estadoAnterior: r.estado,
            estadoNuevo: nuevoEstado,
            moderador: 'Moderador Actual',
            nota: nota || undefined,
          };
          return {
            ...r,
            estado: nuevoEstado,
            fechaActualizacion: new Date().toISOString(),
            historial: [cambio, ...r.historial],
          };
        })
      );
      // Sync selected report
      setReporteSeleccionado((prev) => {
        if (!prev || prev.id !== reporteId) return prev;
        const cambio: HistorialCambio = {
          id: `h${Date.now()}`,
          fecha: new Date().toISOString(),
          estadoAnterior: prev.estado,
          estadoNuevo: nuevoEstado,
          moderador: 'Moderador Actual',
          nota: nota || undefined,
        };
        return {
          ...prev,
          estado: nuevoEstado,
          fechaActualizacion: new Date().toISOString(),
          historial: [cambio, ...prev.historial],
        };
      });
    },
    []
  );

  const guardarNota = useCallback((reporteId: string, nota: string) => {
    setReportes((prev) =>
      prev.map((r) =>
        r.id === reporteId
          ? { ...r, notasModerador: nota, fechaActualizacion: new Date().toISOString() }
          : r
      )
    );
    setReporteSeleccionado((prev) =>
      prev && prev.id === reporteId ? { ...prev, notasModerador: nota } : prev
    );
  }, []);

  return {
    reportes: reportesFiltrados,
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
  };
}
