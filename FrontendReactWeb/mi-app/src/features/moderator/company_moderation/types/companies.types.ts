import { type LucideIcon } from "lucide-react";

export type CompanyStatus = "pending" | "approved" | "rejected";

export type CompanyType =
  | "Technology"
  | "Retail"
  | "Manufacturing"
  | "Services"
  | "Logistics"
  | "Healthcare"
  | "Education";

export interface Document {
  name: string;
  type: "Tax ID" | "Incorporation" | "Chamber" | "Other";
  uploaded: boolean;
}

export interface Company {
  id: string;
  name: string;
  taxId: string;
  type: CompanyType;
  country: string;
  city: string;
  representative: string;
  email: string;
  phone: string;
  website: string;
  employees: string;
  description: string;
  registeredAt: string;
  status: CompanyStatus;
  rejectionReason?: string;
  avatarColor: string;
  documents: Document[];
}

export interface CompanyStatCard {
  label: string;
  value: string;
  Icon: LucideIcon;
  delta: string;
  color: string;
  bg: string;
}

export type StatusFilter = "all" | "pending" | "approved" | "rejected";