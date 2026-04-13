// src/styles/appTheme.ts

const T = {
  brand600: "#1E3A8A",
  brand700: "#1A2F73",
  brand400: "#3B82F6",
  brand100: "#DBEAFE",

  bgMain:  "#F8FAFC",
  bgCard:  "#FFFFFF",
  bgAlt:   "#F1F5F9",

  text1: "#1F2937",
  text2: "#4B5563",
  text3: "#9CA3AF",

  success:   "#10B981",
  successBg: "#D1FAE5",
  error:     "#EF4444",
  errorBg:   "#FEE2E2",
  warn:      "#F59E0B",
  warnBg:    "#FEF3C7",

  border:   "#E2E8F0",
  borderMd: "#CBD5E1",

  chart: {
    sales:   "#3B82F6",
    income:  "#10B981",
    pending: "#F59E0B",
    overdue: "#EF4444",
  },
} as const;

export default T;