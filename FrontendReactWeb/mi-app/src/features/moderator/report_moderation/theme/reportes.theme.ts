import { EstadoReporte, PrioridadReporte, CategoriaReporte } from '../types/reportes.types';

// ─── Brand ───────────────────────────────────────────────────────────────────
export const colors = {
  brand: {
    600: '#1E3A8A',
    700: '#1A2F73',
    400: '#3B82F6',
    100: '#DBEAFE',
  },
  background: {
    primary: '#F8FAFC',
    secondary: '#FFFFFF',
    alt: '#F1F5F9',
  },
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    disabled: '#9CA3AF',
  },
  estado: {
    success: { main: '#10B981', bg: '#D1FAE5', text: '#065F46' },
    error: { main: '#EF4444', bg: '#FEE2E2', text: '#991B1B' },
    warning: { main: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
    info: { main: '#3B82F6', bg: '#DBEAFE', text: '#1E40AF' },
    neutral: { main: '#9CA3AF', bg: '#F3F4F6', text: '#374151' },
  },
  border: '#E2E8F0',
  borderFocus: '#1E3A8A',
  shadow: 'rgba(30, 58, 138, 0.08)',
} as const;

// ─── Estado del Reporte ───────────────────────────────────────────────────────
type EstadoColor = (typeof colors.estado)[keyof typeof colors.estado];

export const estadoConfig: Record<EstadoReporte, { label: string; color: EstadoColor }> = {
  pendiente: { label: 'Pendiente', color: colors.estado.warning },
  en_proceso: { label: 'En Proceso', color: colors.estado.info },
  solucionado: { label: 'Solucionado', color: colors.estado.success },
  rechazado: { label: 'Rechazado', color: colors.estado.error },
  cerrado: { label: 'Cerrado', color: colors.estado.neutral },
};

// ─── Prioridad ────────────────────────────────────────────────────────────────
export const prioridadConfig: Record<
  PrioridadReporte,
  { label: string; color: string; bg: string }
> = {
  baja: { label: 'Baja', color: '#10B981', bg: '#D1FAE5' },
  media: { label: 'Media', color: '#F59E0B', bg: '#FEF3C7' },
  alta: { label: 'Alta', color: '#EF4444', bg: '#FEE2E2' },
  urgente: { label: 'Urgente', color: '#7C3AED', bg: '#EDE9FE' },
};

// ─── Categorías ───────────────────────────────────────────────────────────────
export const categoriaConfig: Record<CategoriaReporte, { label: string; icon: string }> = {
  producto_no_llegó: { label: 'Producto no llegó', icon: '📦' },
  producto_dañado: { label: 'Producto dañado', icon: '⚠️' },
  producto_incorrecto: { label: 'Producto incorrecto', icon: '🔄' },
  retraso_entrega: { label: 'Retraso en entrega', icon: '🕐' },
  cobro_incorrecto: { label: 'Cobro incorrecto', icon: '💳' },
  otro: { label: 'Otro', icon: '📋' },
};

// ─── Tipografía ───────────────────────────────────────────────────────────────
export const typography = {
  h1: { fontSize: 26, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '600' },
  subtitle: { fontSize: 16, fontWeight: '500' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
} as const;

// ─── Espaciado ────────────────────────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 9999,
} as const;
