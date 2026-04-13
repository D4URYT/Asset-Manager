import { LayoutDashboard, Users, type LucideIcon } from "lucide-react";

export interface AdminNavItemData {
  id: string;
  Icon: LucideIcon;
  label: string;
  href: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItemData[] = [
  {
    id: "dashboard",
    Icon: LayoutDashboard,
    label: "Dashboard",
    href: "/navigation/admin/dashboard/page",
  },
  {
    id: "usuarios",
    Icon: Users,
    label: "Usuarios",
    href: "/navigation/admin/users/page",
  },
];
