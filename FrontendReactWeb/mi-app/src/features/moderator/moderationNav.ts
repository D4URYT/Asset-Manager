import { BarChart2, Building2, FileText, LineChart, LayoutDashboard, Package } from "lucide-react";
import type { NavItemData } from "../seller/dashboard/data/chart.data";

export const MODERATOR_NAV_ITEMS: NavItemData[] = [
  {
    id: "dashboard",
    Icon: LayoutDashboard,
    label: "Dashboard",
    href: "/navigation/moderation/dashboard/page",
  },
  {
    id: "companies",
    Icon: Building2,
    label: "Empresas",
    href: "/navigation/moderation/companies/page",
  },
  {
    id: "stats_companies",
    Icon: BarChart2,
    label: "Estadisticas Emp.",
    href: "/navigation/moderation/stats_companies/page",
  },
  {
    id: "stats_products",
    Icon: LineChart,
    label: "Estadisticas Prod.",
    href: "/navigation/moderation/stats_products/page",
  },
  {
    id: "products",
    Icon: Package,
    label: "Productos",
    href: "/navigation/moderation/products/page",
  },
  {
    id: "reports",
    Icon: FileText,
    label: "Reportes",
    href: "/navigation/moderation/reports/page",
  },
];
