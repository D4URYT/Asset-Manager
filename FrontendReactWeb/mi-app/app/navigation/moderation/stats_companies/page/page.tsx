import { Metadata } from "next";
import { EstadisticasEmpresasPage } from "../../../../../src/features/moderator/stats_company_moderation/EstadisticasEmpresaPage";

export const metadata: Metadata = {
  title: "Estadísticas de Empresas",
  description: "Visualiza y analiza las estadísticas de las empresas moderadas, incluyendo ventas, ingresos, calificaciones y más. Filtra por categoría, estado y periodo para obtener insights detallados.",
}

export default function Page() {
  return <EstadisticasEmpresasPage />;
}