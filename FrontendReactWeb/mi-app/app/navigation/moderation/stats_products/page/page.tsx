import { Metadata } from "next";
import { EstadisticasProductosPage } from "../../../../../src/features/moderator/stats_product_moderation/EstadisticasProductosPage";

export const metadata: Metadata = {
  title: "Estadísticas de Productos",
  description: "Visualiza y analiza las estadísticas de los productos moderados, incluyendo ventas, ingresos, calificaciones y más. Filtra por categoría, estado y periodo para obtener insights detallados.",
}

export default function Page() {
    return <EstadisticasProductosPage />;
}