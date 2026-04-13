import { LayoutDashboard, Users, type LucideIcon } from "lucide-react";

export interface NavItemData {
  id: string;
  Icon: LucideIcon;
  label: string;
  href: string;
}

export const USERS_NAV_ITEMS: NavItemData[] = [
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
