export interface KpiGlobal {
  totalEmpresas: number;
  empresasActivas: number;
  totalProductos: number;
  totalVentas: number;
  totalIngresos: number;
  totalUsuarios: number;
  usuariosNuevosMes: number;
  totalReportes: number;
  reportesPendientes: number;
  reportesEnProceso: number;
  reportesSolucionados: number;
  crecimientoVentas: number;
  crecimientoIngresos: number;
  promedioCalificacion: number;
  totalVistas: number;
}

export interface ActividadReciente {
  id: string;
  tipo: 'reporte' | 'empresa' | 'producto' | 'usuario';
  titulo: string;
  descripcion: string;
  tiempo: string;
  estado?: string;
  estadoColor?: string;
}

export interface VentaDia {
  dia: string;
  ventas: number;
  ingresos: number;
}

export interface EmpresaTop {
  id: string;
  nombre: string;
  iniciales: string;
  color: string;
  ventas: number;
  ingresos: number;
  crecimiento: number;
}

export interface ProductoTop {
  id: string;
  nombre: string;
  empresa: string;
  ventas: number;
  ingresos: number;
  calificacion: number;
}

export interface ReporteReciente {
  id: string;
  codigo: string;
  titulo: string;
  usuario: string;
  estado: 'pendiente' | 'en_proceso' | 'solucionado' | 'rechazado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  fecha: string;
}

export interface DistribucionCategoria {
  categoria: string;
  color: string;
  ventas: number;
  porcentaje: number;
}

export interface AlertaMod {
  id: string;
  titulo: string;
  detalle: string;
  nivel: 'info' | 'warning' | 'error' | 'success';
}

export interface DashboardData {
  kpis: KpiGlobal;
  actividadReciente: ActividadReciente[];
  reportesRecientes: ReporteReciente[];
  empresasTop: EmpresaTop[];
  productosTop: ProductoTop[];
  ventasSemana: VentaDia[];
  ventasPorCategoria: DistribucionCategoria[];
  alertas: AlertaMod[];
}
