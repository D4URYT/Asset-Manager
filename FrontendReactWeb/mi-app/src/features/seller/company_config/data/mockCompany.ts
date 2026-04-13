// src/feature/company/data/mockCompany.ts

import { Company } from "../types/company.types";

const mockCompany: Company = {
  id:           "COMP-001",
  name:         "SportZone RD",
  legalName:    "SportZone República Dominicana S.R.L.",
  rnc:          "1-31-12345-6",
  email:        "ventas@sportzonerd.com",
  phone:        "809-555-9000",
  address:      "Av. Winston Churchill #45, Torre Empresarial Piso 3",
  city:         "Santo Domingo",
  country:      "República Dominicana",
  logoInitials: "SZ",
  foundedYear:  2019,

  employees: [
    { id: "EMP-001", name: "Carlos Méndez",    email: "carlos@sportzonerd.com",   role: "Administrador", phone: "809-555-0001", status: "active"   },
    { id: "EMP-002", name: "Laura Jiménez",    email: "laura@sportzonerd.com",    role: "Vendedor",      phone: "809-555-0002", status: "active"   },
    { id: "EMP-003", name: "Miguel Ángel Ruiz",email: "miguel@sportzonerd.com",   role: "Almacén",       phone: "809-555-0003", status: "active"   },
    { id: "EMP-004", name: "Patricia Soto",    email: "patricia@sportzonerd.com", role: "Contabilidad",  phone: "809-555-0004", status: "active"   },
    { id: "EMP-005", name: "Andrés Castillo",  email: "andres@sportzonerd.com",   role: "Vendedor",      phone: "809-555-0005", status: "disabled" },
    { id: "EMP-006", name: "Valeria Núñez",    email: "valeria@sportzonerd.com",  role: "Soporte",       phone: "809-555-0006", status: "active"   },
  ],

  salesHistory: [
    { month: "Oct", sales: 38000,  orders: 18 },
    { month: "Nov", sales: 52000,  orders: 24 },
    { month: "Dic", sales: 91000,  orders: 41 },
    { month: "Ene", sales: 47000,  orders: 22 },
    { month: "Feb", sales: 63000,  orders: 29 },
    { month: "Mar", sales: 78000,  orders: 35 },
  ],
};

export default mockCompany;