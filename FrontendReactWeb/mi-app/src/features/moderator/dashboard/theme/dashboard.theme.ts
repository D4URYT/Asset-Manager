export const colors = {
  brand:  { 600: '#1E3A8A', 700: '#1A2F73', 400: '#3B82F6', 100: '#DBEAFE' },
  bg:     { primary: '#F8FAFC', secondary: '#FFFFFF', alt: '#F1F5F9' },
  text:   { primary: '#1F2937', secondary: '#4B5563', disabled: '#9CA3AF' },
  estado: {
    success: { main: '#10B981', bg: '#D1FAE5', text: '#065F46' },
    error:   { main: '#EF4444', bg: '#FEE2E2', text: '#991B1B' },
    warning: { main: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
    info:    { main: '#3B82F6', bg: '#DBEAFE', text: '#1E40AF' },
    neutral: { main: '#9CA3AF', bg: '#F3F4F6', text: '#374151' },
    purple:  { main: '#7C3AED', bg: '#EDE9FE', text: '#5B21B6' },
  },
  chart:  ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#7C3AED', '#EC4899', '#0EA5E9', '#F97316'],
  border: '#E2E8F0',
  shadow: 'rgba(30, 58, 138, 0.08)',
} as const;

export const reporteEstadoCfg = {
  pendiente:   { label: 'Pendiente',   dot: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
  en_proceso:  { label: 'En Proceso',  dot: '#3B82F6', bg: '#DBEAFE', text: '#1E40AF' },
  solucionado: { label: 'Solucionado', dot: '#10B981', bg: '#D1FAE5', text: '#065F46' },
  rechazado:   { label: 'Rechazado',   dot: '#EF4444', bg: '#FEE2E2', text: '#991B1B' },
} as const;

export const prioridadCfg = {
  baja:    { label: 'Baja',    color: '#10B981', bg: '#D1FAE5' },
  media:   { label: 'Media',   color: '#F59E0B', bg: '#FEF3C7' },
  alta:    { label: 'Alta',    color: '#EF4444', bg: '#FEE2E2' },
  urgente: { label: 'Urgente', color: '#7C3AED', bg: '#EDE9FE' },
} as const;