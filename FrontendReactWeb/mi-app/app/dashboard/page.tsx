import type { Metadata } from "next";
import { DashboardPage } from "@/features/dashboard/index"; // ✅ limpio, sin rutas internas

export const metadata: Metadata = {
  title: "Dashboard vendedor",
};

export default function Page() {
  return <DashboardPage />;
}
