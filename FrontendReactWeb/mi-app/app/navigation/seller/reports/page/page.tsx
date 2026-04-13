import { Metadata } from 'next';
import { ReportesPage } from "@/features/seller/reports";

export const metadata: Metadata ={
  title: 'Reportes',
  description: 'Visualiza tus reportes de ventas y rendimiento en tu panel de vendedor.',
}
export default function Page() {
  return <ReportesPage />;
}
