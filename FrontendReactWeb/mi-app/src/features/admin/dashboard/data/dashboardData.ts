import type { DashboardData } from '../types/dashboard.types';

export const mockDashboardData: DashboardData = {
  totalUsers: 3_847,
  totalModerators: 12,
  systemHealth: 98.4,

  stats: [
    { id: '1', label: 'Total Usuarios',      value: '3,847',   change: 12.4,  changeLabel: 'vs mes anterior', type: 'users' },
    { id: '2', label: 'Ingresos del Mes',    value: '$128,450', change: 8.2,  changeLabel: 'vs mes anterior', type: 'revenue' },
    { id: '3', label: 'Facturas Emitidas',   value: '2,310',   change: 5.7,  changeLabel: 'vs mes anterior', type: 'invoices' },
    { id: '4', label: 'Cobros Pendientes',   value: '$34,200', change: -3.1, changeLabel: 'vs mes anterior', type: 'pending' },
    { id: '5', label: 'Moderadores Activos', value: '12',      change: 0,    changeLabel: 'sin cambios',     type: 'moderators' },
    { id: '6', label: 'Facturas Vencidas',   value: '47',      change: -18.3, changeLabel: 'vs mes anterior', type: 'overdue' },
  ],

  recentUsers: [
    { id: '1', name: 'Carlos Mendoza',   email: 'cmendoza@empresa.com',  role: 'moderator', status: 'active',    joinedAt: 'Hace 2h' },
    { id: '2', name: 'Laura Ramírez',    email: 'lramirez@gmail.com',    role: 'user',      status: 'active',    joinedAt: 'Hace 5h' },
    { id: '3', name: 'Pedro Alcántara',  email: 'pedro.alc@corp.do',     role: 'user',      status: 'inactive',  joinedAt: 'Hace 1d' },
    { id: '4', name: 'María Jiménez',    email: 'mjimenez@outlook.com',  role: 'user',      status: 'active',    joinedAt: 'Hace 1d' },
    { id: '5', name: 'Ramón Castillo',   email: 'rcastillo@biz.com',     role: 'moderator', status: 'suspended', joinedAt: 'Hace 2d' },
  ],

  recentActivity: [
    { id: '1', type: 'invoice_paid',    description: 'Factura #INV-2024-0891 pagada',  user: 'Laura Ramírez',  timestamp: 'Hace 12 min' },
    { id: '2', type: 'user_created',    description: 'Nuevo usuario registrado',        user: 'Carlos Mendoza', timestamp: 'Hace 45 min' },
    { id: '3', type: 'invoice_overdue', description: 'Factura #INV-2024-0744 vencida', user: 'Pedro Alcántara', timestamp: 'Hace 2h' },
    { id: '4', type: 'moderator_added', description: 'Nuevo moderador asignado',        user: 'Admin Sistema',  timestamp: 'Hace 3h' },
    { id: '5', type: 'report_flagged',  description: 'Reporte marcado para revisión',  user: 'María Jiménez',  timestamp: 'Hace 5h' },
  ],

  chartData: [
    { label: 'Ene', sales: 42000,  collections: 38000, pending: 8000 },
    { label: 'Feb', sales: 51000,  collections: 44000, pending: 9500 },
    { label: 'Mar', sales: 47000,  collections: 42000, pending: 7200 },
    { label: 'Abr', sales: 63000,  collections: 55000, pending: 11000 },
    { label: 'May', sales: 58000,  collections: 50000, pending: 9800 },
    { label: 'Jun', sales: 72000,  collections: 64000, pending: 12400 },
    { label: 'Jul', sales: 128450, collections: 94250, pending: 34200 },
  ],
};
