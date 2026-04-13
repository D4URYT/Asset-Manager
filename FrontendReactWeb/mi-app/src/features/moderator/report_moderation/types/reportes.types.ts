export type EstadoReporte =
  | 'pendiente'
  | 'en_proceso'
  | 'solucionado'
  | 'rechazado'
  | 'cerrado';

export type CategoriaReporte =
  | 'producto_no_llegó'
  | 'producto_dañado'
  | 'producto_incorrecto'
  | 'retraso_entrega'
  | 'cobro_incorrecto'
  | 'otro';

export type PrioridadReporte = 'baja' | 'media' | 'alta' | 'urgente';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  telefono?: string;
}

export interface Producto {
  id: string;
  nombre: string;
  sku: string;
  imagen?: string;
  precio: number;
}

export interface Pedido {
  id: string;
  numero: string;
  fecha: string;
  productos: Producto[];
  total: number;
}

export interface HistorialCambio {
  id: string;
  fecha: string;
  estadoAnterior: EstadoReporte;
  estadoNuevo: EstadoReporte;
  moderador: string;
  nota?: string;
}

export interface Reporte {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaReporte;
  estado: EstadoReporte;
  prioridad: PrioridadReporte;
  usuario: Usuario;
  pedido?: Pedido;
  fechaCreacion: string;
  fechaActualizacion: string;
  imagenes?: string[];
  notasModerador?: string;
  historial: HistorialCambio[];
}

export interface FiltrosReporte {
  busqueda: string;
  estado: EstadoReporte | 'todos';
  categoria: CategoriaReporte | 'todos';
  prioridad: PrioridadReporte | 'todos';
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface EstadisticasReportes {
  total: number;
  pendientes: number;
  enProceso: number;
  solucionados: number;
  rechazados: number;
}