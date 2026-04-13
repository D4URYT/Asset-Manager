export const cartTheme = {
  colors: {
    primary:      '#1E3A8A',
    primaryHover: '#1A2F73',
    primaryLight: '#3B82F6',
    primarySoft:  '#DBEAFE',

    bgMain:  '#F8FAFC',
    bgCard:  '#FFFFFF',
    bgAlt:   '#F1F5F9',

    textPrimary:   '#1F2937',
    textSecondary: '#4B5563',
    textDisabled:  '#9CA3AF',

    success:     '#10B981',
    successSoft: '#D1FAE5',
    error:       '#EF4444',
    errorSoft:   '#FEE2E2',
    warning:     '#F59E0B',
    warningSoft: '#FEF3C7',

    border:      '#E2E8F0',
    borderLight: '#F1F5F9',
    white:       '#FFFFFF',
  },

  spacing: {
    xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32,
  },

  radius: {
    sm: 8, md: 12, lg: 16, xl: 20, full: 999,
  },

  font: {
    xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 24, xxxl: 28,
  },

  shadow: {
    card: {
      shadowColor: '#1E3A8A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    button: {
      shadowColor: '#1E3A8A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 6,
    },
  },
} as const;