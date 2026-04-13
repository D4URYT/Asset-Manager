import { Metadata } from 'next';
import  CompaniesPage  from "../../../../../src/features/moderator/company_moderation/page/CompaniesPage";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Gestiona las empresas registradas en la plataforma, revisa su información y toma decisiones de moderación."
}

export default function Page() { return <CompaniesPage />; }