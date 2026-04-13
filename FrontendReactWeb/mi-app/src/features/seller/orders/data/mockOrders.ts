// src/feature/orders/data/mockOrders.ts

import { Order } from "../types/order.types";

const mockOrders: Order[] = [
  { id: "ORD-1042", client: "Ana Martínez",   product: "Zapatillas Runner Pro",  qty: 2, total: 4800, date: "14 mar 2025", status: "pending",   address: "Calle Duarte #45, SDQ", phone: "809-555-0101" },
  { id: "ORD-1041", client: "Carlos Ruiz",    product: "Camiseta Dry-Fit x3",    qty: 3, total: 2550, date: "13 mar 2025", status: "sent",      address: "Av. 27 de Febrero #12", phone: "809-555-0102" },
  { id: "ORD-1040", client: "Lucía Gómez",    product: "Pantalón Cargo",         qty: 1, total: 1350, date: "12 mar 2025", status: "delivered", address: "Los Prados, Blq 4",     phone: "809-555-0103" },
  { id: "ORD-1039", client: "Pedro Santos",   product: "Gorra Deportiva",        qty: 4, total: 1600, date: "11 mar 2025", status: "cancelled", address: "Ensanche Naco #88",     phone: "809-555-0104" },
  { id: "ORD-1038", client: "María López",    product: "Sudadera Hoodie Premium", qty: 1, total: 1650, date: "10 mar 2025", status: "pending",   address: "Gazcue, Santiago #21",  phone: "809-555-0105" },
  { id: "ORD-1037", client: "Juan Torres",    product: "Medias Compresión x6",   qty: 2, total: 1200, date: "09 mar 2025", status: "sent",      address: "Bella Vista #77",       phone: "809-555-0106" },
  { id: "ORD-1036", client: "Sofía Reyes",    product: "Bolso Gym XL",           qty: 1, total:  980, date: "08 mar 2025", status: "delivered", address: "Arroyo Hondo Viejo",    phone: "809-555-0107" },
  { id: "ORD-1035", client: "Andrés Mora",    product: "Zapatillas Runner Pro",  qty: 1, total: 2400, date: "07 mar 2025", status: "pending",   address: "Los Cacicazgos #5",     phone: "809-555-0108" },
  { id: "ORD-1034", client: "Valentina Cruz", product: "Leggins Mujer Pro",      qty: 2, total: 1760, date: "06 mar 2025", status: "sent",      address: "Piantini, Torre B",     phone: "809-555-0109" },
  { id: "ORD-1033", client: "Roberto Díaz",   product: "Guantes Box Pro",        qty: 1, total:  890, date: "05 mar 2025", status: "cancelled", address: "Cristo Rey #202",        phone: "809-555-0110" },
];

export default mockOrders;