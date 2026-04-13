import { Metadata } from "next";
import DashboardPage from "../../../../../src/features/admin/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard Administrador",
  description: "Panel de control para administrar tu aplicación.",
}

export default function Page() {
    return <DashboardPage />
}
