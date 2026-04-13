import { CSSProperties } from 'react';

export const C = {
  brand600:      '#1E3A8A',
  brand700:      '#1A2F73',
  brand400:      '#3B82F6',
  brand100:      '#DBEAFE',
  bgPrimary:     '#F8FAFC',
  bgSecondary:   '#FFFFFF',
  bgAlt:         '#F1F5F9',
  textPrimary:   '#1F2937',
  textSecondary: '#4B5563',
  textDisabled:  '#9CA3AF',
  borderDefault: '#E2E8F0',
  success:       '#10B981',
  successBg:     '#D1FAE5',
  error:         '#EF4444',
  errorBg:       '#FEE2E2',
  warning:       '#F59E0B',
  warningBg:     '#FEF3C7',
  white:         '#FFFFFF',
} as const;

export const S = {
  // Layout
  pageWrap: {
    minHeight: '100vh',
    backgroundColor: C.bgPrimary,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  } as CSSProperties,

  centerFull: {
    minHeight: '100vh',
    backgroundColor: C.bgPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  } as CSSProperties,

  // Header
  header: {
    backgroundColor: C.bgSecondary,
    borderBottom: `1px solid ${C.borderDefault}`,
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,

  // Card
  card: {
    backgroundColor: C.bgSecondary,
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(30,58,138,0.08)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '520px',
    margin: '0 auto',
  } as CSSProperties,

  // Form body
  formBody: {
    padding: '32px',
  } as CSSProperties,

  // Input
  inputWrap: {
    marginBottom: '16px',
  } as CSSProperties,

  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: C.textPrimary,
    marginBottom: '6px',
  } as CSSProperties,

  // Button primary
  btnPrimary: {
    height: '52px',
    backgroundColor: C.brand600,
    color: C.white,
    fontWeight: 700,
    fontSize: '15px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 5px 16px rgba(30,58,138,0.28)',
    transition: 'background 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  } as CSSProperties,

  btnSecondary: {
    height: '52px',
    backgroundColor: 'transparent',
    color: C.textSecondary,
    fontWeight: 600,
    fontSize: '15px',
    border: `1.5px solid ${C.borderDefault}`,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background 0.15s',
  } as CSSProperties,

  // Section header
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '28px',
  },

  h2: {
    fontSize: '20px',
    fontWeight: 600,
    color: C.textPrimary,
    margin: '0 0 4px 0',
  } as CSSProperties,

  subText: {
    fontSize: '14px',
    color: C.textSecondary,
    margin: 0,
  } as CSSProperties,

  // Footer nav
  footerNav: {
    display: 'flex',
    gap: '12px',
    padding: '0 32px 32px',
  } as CSSProperties,
};