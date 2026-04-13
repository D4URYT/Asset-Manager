import {
  KpiGlobal,
  ActividadReciente,
  VentaDia,
  EmpresaTop,
  ProductoTop,
  ReporteReciente,
  DistribucionCategoria,
  DashboardData,
} from '../types/dashboard.types';

const prng = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const kpiMock: KpiGlobal = {
  totalEmpresas: 8,
  empresasActivas: 6,
  totalProductos: 12,
  totalVentas: 28930,
  totalIngresos: 963107000,
  totalUsuarios: 14820,
  usuariosNuevosMes: 1240,
  totalReportes: 5,
  reportesPendientes: 2,
  reportesEnProceso: 1,
  reportesSolucionados: 1,
  crecimientoVentas: 21.4,
  crecimientoIngresos: 18.7,
  promedioCalificacion: 4.44,
  totalVistas: 479500,
};

export const ventasSemana: VentaDia[] = [
  { dia: 'Lun', ventas: 1240, ingresos: 3720000 },
  { dia: 'Mar', ventas: 980, ingresos: 2940000 },
  { dia: 'Mie', ventas: 1580, ingresos: 4740000 },
  { dia: 'Jue', ventas: 1120, ingresos: 3360000 },
  { dia: 'Vie', ventas: 1890, ingresos: 5670000 },
  { dia: 'Sab', ventas: 2140, ingresos: 6420000 },
  { dia: 'Hoy', ventas: 1630, ingresos: 4890000 },
];

export const ventasMes: VentaDia[] = Array.from({ length: 30 }, (_, i) => ({
  dia: String(i + 1),
  ventas: Math.round(800 + prng(i * 11) * 1400),
  ingresos: Math.round(2400000 + prng(i * 17) * 4200000),
}));

export const empresasTopMock: EmpresaTop[] = [
  { id: '1', nombre: 'TechZone RD', iniciales: 'TZ', color: '#1E3A8A', ventas: 14820, ingresos: 8450000, crecimiento: 34.5 },
  { id: '2', nombre: 'Moda Elite', iniciales: 'ME', color: '#7C3AED', ventas: 11340, ingresos: 4920000, crecimiento: 22.1 },
  { id: '3', nombre: 'HogarPlus', iniciales: 'HP', color: '#10B981', ventas: 9870, ingresos: 3210000, crecimiento: 18.7 },
  { id: '4', nombre: 'SportMax', iniciales: 'SM', color: '#F59E0B', ventas: 8230, ingresos: 2780000, crecimiento: 12.4 },
  { id: '5', nombre: 'SaludVital', iniciales: 'SV', color: '#EC4899', ventas: 6540, ingresos: 1960000, crecimiento: 28.9 },
];

export const productosTopMock: ProductoTop[] = [
  { id: '1', nombre: 'iPhone 15 Pro Max 256GB', empresa: 'TechZone RD', ventas: 3240, ingresos: 275400000, calificacion: 4.9 },
  { id: '3', nombre: 'AirPods Pro 2da Gen', empresa: 'TechZone RD', ventas: 4810, ingresos: 60125000, calificacion: 4.7 },
  { id: '6', nombre: 'Samsung Galaxy S24 Ultra', empresa: 'TechZone RD', ventas: 2100, ingresos: 163800000, calificacion: 4.7 },
  { id: '4', nombre: 'Bolso Premium Cuero Italiano', empresa: 'Moda Elite', ventas: 2890, ingresos: 53465000, calificacion: 4.6 },
  { id: '2', nombre: 'MacBook Air M3 15\"', empresa: 'TechZone RD', ventas: 1580, ingresos: 252800000, calificacion: 4.8 },
];

export const reportesRecientesMock: ReporteReciente[] = [
  { id: '4', codigo: 'RPT-2025-004', titulo: 'Cobro duplicado en el mismo pedido', usuario: 'Ana Vargas', estado: 'pendiente', prioridad: 'urgente', fecha: '2025-03-11T08:00:00Z' },
  { id: '2', codigo: 'RPT-2025-002', titulo: 'Recibi el producto equivocado', usuario: 'Maria Gonzalez', estado: 'pendiente', prioridad: 'media', fecha: '2025-03-08T09:15:00Z' },
  { id: '1', codigo: 'RPT-2025-001', titulo: 'Producto nunca llego a mi direccion', usuario: 'Carlos Mendez', estado: 'en_proceso', prioridad: 'alta', fecha: '2025-03-01T10:30:00Z' },
  { id: '3', codigo: 'RPT-2025-003', titulo: 'Tablet llego con la pantalla rota', usuario: 'Roberto Jimenez', estado: 'solucionado', prioridad: 'alta', fecha: '2025-02-25T16:45:00Z' },
];

export const actividadMock: ActividadReciente[] = [
  { id: 'a1', tipo: 'reporte', titulo: 'Nuevo reporte urgente', descripcion: 'Ana Vargas reporto cobro duplicado', tiempo: 'Hace 2 min', estado: 'Urgente', estadoColor: '#7C3AED' },
  { id: 'a2', tipo: 'empresa', titulo: 'TechZone RD - record de ventas', descripcion: '2,140 ventas solo el sabado pasado', tiempo: 'Hace 1 hora', estado: '+34.5%', estadoColor: '#10B981' },
  { id: 'a3', tipo: 'usuario', titulo: '1,240 nuevos usuarios este mes', descripcion: 'Crecimiento del 8.4% respecto al mes anterior', tiempo: 'Hace 3 horas', estado: '+8.4%', estadoColor: '#10B981' },
  { id: 'a4', tipo: 'producto', titulo: 'Nike Air Max 2025 - agotado', descripcion: '3,120 unidades vendidas en total', tiempo: 'Hace 5 horas', estado: 'Agotado', estadoColor: '#F59E0B' },
  { id: 'a5', tipo: 'reporte', titulo: 'Reporte solucionado', descripcion: 'RPT-2025-003 marcado como solucionado', tiempo: 'Hace 1 dia', estado: 'Solucionado', estadoColor: '#10B981' },
  { id: 'a6', tipo: 'empresa', titulo: 'ModaUrbana suspendida', descripcion: 'Tasa de devolucion 14.3% - accion requerida', tiempo: 'Hace 2 dias', estado: 'Suspendida', estadoColor: '#EF4444' },
];

export const distribucionCatMock: DistribucionCategoria[] = [
  { categoria: 'Electronica', color: '#1E3A8A', ventas: 11730, porcentaje: 40.6 },
  { categoria: 'Moda', color: '#7C3AED', ventas: 6010, porcentaje: 20.8 },
  { categoria: 'Hogar', color: '#10B981', ventas: 2210, porcentaje: 7.6 },
  { categoria: 'Deportes', color: '#F59E0B', ventas: 890, porcentaje: 3.1 },
  { categoria: 'Salud', color: '#EC4899', ventas: 1650, porcentaje: 5.7 },
  { categoria: 'Alimentos', color: '#EF4444', ventas: 5640, porcentaje: 19.5 },
  { categoria: 'Tecnologia', color: '#0EA5E9', ventas: 800, porcentaje: 2.7 },
];

export const dashboardMock: DashboardData = {
  kpis: kpiMock,
  actividadReciente: actividadMock,
  reportesRecientes: reportesRecientesMock,
  empresasTop: empresasTopMock,
  productosTop: productosTopMock,
  ventasSemana,
  ventasPorCategoria: distribucionCatMock,
  alertas: [],
};
