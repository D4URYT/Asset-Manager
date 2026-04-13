import { Metadata } from 'next';
import { FacturasPage } from "@/features/seller/bill";

export const metadata: Metadata = {
  title: "Facturas",
  description: "Gestiona tus facturas y realiza el seguimiento de tus pagos."
}
export default function Page() {
  return <FacturasPage />;
}
