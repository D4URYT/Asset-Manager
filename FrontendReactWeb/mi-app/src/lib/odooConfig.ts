// src/lib/odooConfig.ts
// Configuración global de la conexión con Odoo.
// Importar desde cualquier feature: import odooConfig from "@/lib/odooConfig"

const odooConfig = {
  baseUrl: process.env.NEXT_PUBLIC_ODOO_URL ?? "http://localhost:8079",
} as const;

export default odooConfig;