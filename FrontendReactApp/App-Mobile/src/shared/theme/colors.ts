export const colors = {
  // Brand - Azul Profesional
  brand: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    400: '#3B82F6',
    500: '#2563EB',
    600: '#1E3A8A',
    700: '#1A2F73',
    900: '#0F1F4D',
  },

  // Fondos
  background: {
    primary:   '#F8FAFC',
    secondary: '#FFFFFF',
    alternate: '#F1F5F9',
  },

  // Tipografía
  text: {
    primary:   '#1F2937',
    secondary: '#4B5563',
    tertiary:  '#64748B',
    disabled:  '#9CA3AF',
    inverse:   '#FFFFFF',
  },

  // Estados
  success: {
    default: '#10B981',
    soft:    '#D1FAE5',
  },
  error: {
    default: '#EF4444',
    soft:    '#FEE2E2',
  },
  warning: {
    default: '#F59E0B',
    soft:    '#FEF3C7',
  },

  // Dashboard
  chart: {
    sales:    '#3B82F6',
    payments: '#10B981',
    pending:  '#F59E0B',
    overdue:  '#EF4444',
  },

  // Borders
  border: {
    light:  '#E2E8F0',
    medium: '#CBD5E1',
  },
} as const;