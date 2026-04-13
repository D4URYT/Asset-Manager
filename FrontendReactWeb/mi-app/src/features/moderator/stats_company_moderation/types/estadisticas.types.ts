export type CategoriaEmpresa =
  | 'tecnologia' | 'moda' | 'hogar' | 'alimentos'
  | 'deportes'   | 'electronica' | 'salud' | 'otro';

export type EstadoEmpresa = 'activa' | 'inactiva' | 'suspendida';

export type PeriodoFiltro = '7d' | '30d' | '90d' | '1y';

export type OrdenPor = 'ventas' | 'ingresos' | 'calificacion' | 'crecimiento' | 'clientes';

export interface VentaMensual {
  mes: string;
  ventas: number;
  ingresos: number;
}

export interface ProductoTop {
  id: string;
  nombre: string;
  unidades: number;
  ingresos: number;
}

export interface Empresa {
  id: string;
  nombre: string;
  iniciales: string;
  colorAvatar: string;
  categoria: CategoriaEmpresa;
  estado: EstadoEmpresa;
  totalVentas: number;
  totalIngresos: number;
  totalProductos: number;
  calificacion: number;
  totalResenas: number;
  clientesUnicos: number;
  tasaDevolucion: number;
  crecimiento: number;
  ventasMensuales: VentaMensual[];
  productosTop: ProductoTop[];
  fechaRegistro: string;
}

export interface EstadisticasGlobales {
  totalEmpresas: number;
  empresasActivas: number;
  totalVentas: number;
  totalIngresos: number;
  promedioCalificacion: number;
  crecimientoGeneral: number;
}

export interface FiltrosEmpresas {
  busqueda: string;
  categoria: CategoriaEmpresa | 'todos';
  estado: EstadoEmpresa | 'todos';
  ordenarPor: OrdenPor;
  periodo: PeriodoFiltro;
}