// app/registro-empresa/page.tsx
import { Metadata } from 'next';
import CompanyRegisterPage from '@/features/seller/company_register/CompanyRegisterPage';

export const metadata: Metadata = {
  title: 'Registro de Empresa',
  description: 'Registra tu empresa en nuestra plataforma'
};

export default function Page() {
  return <CompanyRegisterPage />;
}