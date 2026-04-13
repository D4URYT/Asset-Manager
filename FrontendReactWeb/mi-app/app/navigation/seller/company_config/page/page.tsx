// src/app/company/page.tsx
// Server Component — sin "use client"

import { Metadata } from "next";
import CompanyClient from "@/features/seller/company_config/CompanyClient";

export const metadata: Metadata = {
  title:       "Mi Empresa | SportZone",
  description: "Configura la información de tu empresa",
};

export default function CompanyPage() {
  return <CompanyClient />;
}