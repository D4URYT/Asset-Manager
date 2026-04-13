// src/feature/company/types/company.types.ts

export type EmployeeStatus = "active" | "disabled";

export type EmployeeRole =
  | "Administrador"
  | "Vendedor"
  | "Almacén"
  | "Contabilidad"
  | "Soporte";

export interface Employee {
  id:     string;
  name:   string;
  email:  string;
  role:   EmployeeRole;
  phone:  string;
  status: EmployeeStatus;
}

export interface MonthlySale {
  month: string;   // "Ene", "Feb", ...
  sales: number;   // total RD$
  orders: number;  // cantidad de pedidos
}

export interface Company {
  id:          string;
  name:        string;
  legalName:   string;
  rnc:         string;
  email:       string;
  phone:       string;
  address:     string;
  city:        string;
  country:     string;
  logoInitials: string;
  foundedYear: number;
  employees:   Employee[];
  salesHistory: MonthlySale[];
}