// ─────────────────────────────────────────────────────────────────────────────
// 🏢 Companies Feature — Barrel Export
// Always import from "@/features/companies", never from internal paths.
// Example: import { CompaniesPage } from "@/features/companies"
// ─────────────────────────────────────────────────────────────────────────────

export { default as CompaniesPage } from "./page/CompaniesPage";

export type {
  Company,
  CompanyStatus,
  CompanyType,
  StatusFilter,
} from "./types/companies.types";