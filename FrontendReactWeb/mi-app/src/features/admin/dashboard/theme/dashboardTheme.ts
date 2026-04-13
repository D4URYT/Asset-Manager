export const theme = {
  colors: {
    primary:       '#1E3A8A',
    primaryHover:  '#1A2F73',
    primaryLight:  '#3B82F6',
    primarySoft:   '#DBEAFE',

    bgMain:   '#F8FAFC',
    bgCard:   '#FFFFFF',
    bgAlt:    '#F1F5F9',

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

    chartSales:       '#3B82F6',
    chartCollections: '#10B981',
    chartPending:     '#F59E0B',
    chartOverdue:     '#EF4444',
  },
} as const;

/** Global CSS variables injected once in _app or layout */
export const cssVariables = `
  :root {
    --color-primary:        ${theme.colors.primary};
    --color-primary-hover:  ${theme.colors.primaryHover};
    --color-primary-light:  ${theme.colors.primaryLight};
    --color-primary-soft:   ${theme.colors.primarySoft};

    --color-bg-main:  ${theme.colors.bgMain};
    --color-bg-card:  ${theme.colors.bgCard};
    --color-bg-alt:   ${theme.colors.bgAlt};

    --color-text-primary:   ${theme.colors.textPrimary};
    --color-text-secondary: ${theme.colors.textSecondary};
    --color-text-disabled:  ${theme.colors.textDisabled};

    --color-success:      ${theme.colors.success};
    --color-success-soft: ${theme.colors.successSoft};
    --color-error:        ${theme.colors.error};
    --color-error-soft:   ${theme.colors.errorSoft};
    --color-warning:      ${theme.colors.warning};
    --color-warning-soft: ${theme.colors.warningSoft};

    --color-border:       ${theme.colors.border};
    --color-border-light: ${theme.colors.borderLight};

    --color-chart-sales:       ${theme.colors.chartSales};
    --color-chart-collections: ${theme.colors.chartCollections};
    --color-chart-pending:     ${theme.colors.chartPending};
    --color-chart-overdue:     ${theme.colors.chartOverdue};

    --font-sans: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
    --radius-sm:  6px;
    --radius-md:  10px;
    --radius-lg:  14px;
    --radius-xl:  20px;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 4px rgba(30,58,138,.06);
    --shadow-md: 0 4px 12px rgba(30,58,138,.08);
    --shadow-lg: 0 8px 24px rgba(30,58,138,.12);
  }
`;
